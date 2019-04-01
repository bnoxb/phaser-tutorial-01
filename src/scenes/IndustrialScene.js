import 'phaser';
import Player from './Player';

export class IndustrialScene extends Phaser.Scene {
    constructor(){
        super();
    }

    preload(){
        this.load.spritesheet(
            "player",
            "../assets/0x72-industrial-player-32px-extruded.png",
            {
                frameWidth: 32,
                frameHeight: 32,
                margin: 1,
                spacing: 2
            }
        );
        this.load.image("spike", "../assets/0x72-industrial-spike.png")
        this.load.image("tiles", "../assets/0x72-industrial-tileset-32px-extruded.png");
        this.load.tilemapTiledJSON("map", "../assets/platformer.json");
    }

    create(){   
        this.isPlayerDead = false;
        const map = this.make.tilemap({ key: "map" });
        const tiles = map.addTilesetImage("0x72-industrial-tileset-32px-extruded", "tiles");

        map.createDynamicLayer("Background", tiles);
        this.groundLayer = map.createDynamicLayer("Ground", tiles);
        map.createDynamicLayer("Foreground", tiles);

        // Instantiate the player instance at the location of the Spawn Point object in the tiled map
        // instead of storing the player in a global variable we will store it in the scene
        const spawnPoint = map.findObject(
            "Objects",
            obj => obj.name === "Spawn Point"
        );
        this.player = new Player(this, spawnPoint.x, spawnPoint.y);

        // Collide the player against the ground layer = here we are grabbing the sprite property from
        // the player (since thePlayer class is not a Phaser.Sprite).
        this.groundLayer.setCollisionByProperty({ collides: true });
        this.physics.world.addCollider(this.player.sprite, this.groundLayer);
        
        // SPIKES >>>>>>>>>>>>>>>>>>
        this.spikeGroup = this.physics.add.staticGroup();
        this.groundLayer.forEachTile(tile => {
            if(tile.index === 77) {
                const x = tile.getCenterX();
                const y = tile.getCenterY();
                const spike = this.spikeGroup.create(x, y, "spike");
                // the map has the spike tiles that have bee rotated in Tiled ('z' key), so parse out that angle
                // to the corrent body placement
                spike.rotation = tile.rotation;
                if(spike.angle === 0) spike.body.setSize(32, 6).setOffset(0, 26);
                else if (spike.angle === -90) spike.body.setSize(6, 32).setOffset(26, 0);
                else if (spike.angle === 90) spike.body.setSize(6, 32).setOffset(0, 0);
                // and lastly remove the spike tile from the layer
                this.groundLayer.removeTileAt(tile.x, tile.y);
            }
            
        });

        this.shiftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        
        this.cameras.main.startFollow(this.player.sprite);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        this.add
            .text(16, 16, "Arrow Keys or WASD to move & jump\nLeft click to draw platforms", {
                font: "18px monospace",
                fill: "#000000",
                padding: { x: 20, y: 10 },
                backgroundColor: "#ffffff"
            })
            .setScrollFactor(0);
        // this is the graphic that will show which tile is being moused over.
        this.marker = this.add.graphics();
        this.marker.lineStyle(5, 0xffffff, 1);
        this.marker.strokeRect(0, 0, map.tileWidth, map.tileHeight);
        this.marker.lineStyle(3, 0xff4f78, 1);

        // put tile index 1 at tile grid location (20,30) within layer
        // this.groundLayer.putTileAt(1, 20, 10);

        //put tile index 2 at world pixel location (200, 50) within layer
         //(this uses the main camera's coordinate system by default)
        // this.groundLayer.putTileAtWorldXY(2, 200, 50);

    }

    update(time, delta){
        if (this.isPlayerDead) return;
        // tell the player class to respond to key presses and move itself
        this.player.update();

        const pointer = this.input.activePointer;
        // Convert the mouse position to world position within the camera
        const worldPoint = pointer.positionToCamera(this.cameras.main);
        // Place the marker in world space, but snap it to the tile grid. If we convert world -> tile and 
        // then tile -> world we end up with the position of the tile under the point
        const pointerTileXY = this.groundLayer.worldToTileXY(worldPoint.x, worldPoint.y);
        const snappedWorldPoint = this.groundLayer.tileToWorldXY(pointerTileXY.x, pointerTileXY.y)

        this.marker.setPosition(snappedWorldPoint.x, snappedWorldPoint.y);
        
        // Draw tiles (only within the groundLayer)
        if(pointer.isDown) {
            if (this.shiftKey.isDown){
                this.groundLayer.removeTileAtWorldXY(worldPoint.x, worldPoint.y);
            }else {
                const tile = this.groundLayer.putTileAtWorldXY(6, worldPoint.x, worldPoint.y);
                tile.setCollision(true);
            }
        }

        if (
            this.player.sprite.y > this.groundLayer.height ||
            this.physics.world.overlap(this.player.sprite, this.spikeGroup)
        ){
            // Flag that the playeris dead so that we can stop update from running in the future
            this.isPlayerDead = true;

            const cam = this.cameras.main;
            cam.shake(100, 0.05);
            cam.fade(250, 0, 0, 0);

            // freeze the player to leave them on screen while fading but remove the marker immediately
            this.player.freeze();
            this.marker.destroy();

            cam.once("camerafadeoutcomplete", () => {
                this.player.destroy();
                this.scene.restart();
            })
        }
    }
}