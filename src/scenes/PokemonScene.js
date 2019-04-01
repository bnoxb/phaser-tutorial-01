import 'phaser';

export class PokemonScene extends Phaser.Scene {
    constructor(){
        super();
        this.controls;
        this.player;
        this.cursors;
        this.showDebug = false;

    }
    preload(){
        this.load.image('tiles', '../assets/tuxmon-sample.png');
        this.load.tilemapTiledJSON('map', '../assets/practise-01.json');

        this.load.atlas("atlas", "https://www.mikewesthad.com/phaser-3-tilemap-blog-posts/post-1/assets/atlas/atlas.png", 'https://www.mikewesthad.com/phaser-3-tilemap-blog-posts/post-1/assets/atlas/atlas.json');
    }

    create(){
        const map = this.make.tilemap({ key: 'map'});
        const tileset = map.addTilesetImage('pokemon-practise', 'tiles');

        const belowLayer = map.createStaticLayer('ground', tileset, 0, 0);
        const worldLayer = map.createStaticLayer('world', tileset, 0, 0);
        const aboveLayer = map.createStaticLayer('above', tileset, 0, 0);

        // const camera = this.cameras.main;

        // // this part sets up the arrow keys as the controls

        // By default, everything gets depth sorted on the screen in the order we created things. Here, we
        // want the "Above Player" layer to sit on top of the player, so we explicitly give it a depth.
        // Higher depths will sit on top of lower depth objects.
        aboveLayer.setDepth(10);

        // Object layers in Tiled let you embed extra info into a map - like a spawn point or custom
        // collision shapes. In the tmx file, there's an object layer with a point named "Spawn Point"
        const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");

        this.player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "atlas", "misa-front").setSize(30,40).setOffset(0 , 24);

        this.physics.add.collider(this.player, worldLayer);

        // this.controls = new Phaser.Cameras.Controls.FixedKeyControl({
        //     camera: camera,
        //     left: cursors.left,
        //     right: cursors.right,
        //     up: cursors.up,
        //     down: cursors.down,
        //     speed:0.5
        // });

        // //this part constrains the camera so it wont move outside the width/height of the tilemap
        // camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        // //collisions
        worldLayer.setCollisionByProperty({ collides: true });

        // const debugGraphics = this.add.graphics().setAlpha(0.75);

        // worldLayer.renderDebug(debugGraphics, {
        //     tileColor: null,
        //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
        //     faceColor: new Phaser.Display.Color(40, 39, 37, 255)
        // });

        const anims = this.anims;
        anims.create({
            key: 'misa-left-walk',
            frames: anims.generateFrameNames('atlas', { prefix: 'misa-left-walk.', start: 0, end: 3, zeroPad: 3 }),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: 'misa-right-walk',
            frames: anims.generateFrameNames("atlas", {
                prefix: 'misa-right-walk.',
                start: 0,
                end: 3,
                zeroPad: 3
            }),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: 'misa-front-walk',
            frames: anims.generateFrameNames('atlas', {
                prefix: 'misa-front-walk.',
                start: 0,
                end: 3, 
                zeroPad: 3
            }),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: 'misa-back-walk',
            frames: anims.generateFrameNames('atlas', {
                prefix: 'misa-back-walk.',
                start: 0,
                end: 3,
                zeroPad: 3
            }),
            frameRate: 10,
            repeat: -1
        });

        const camera = this.cameras.main;
        camera.startFollow(this.player);
        camera.setBounds(0,0, map.widthInPixels, map.heightInPixels);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.add    
            .text(16, 16, 'Arrow keys to move\nPress "D to show hitboxes', {
                font: '18px monospace',
                fill: '#000000',
                padding: { x: 20, y: 10 },
                backgroundColor: '#ffffff'
            })
            .setScrollFactor(0)
            .setDepth(30)
        //Debug graphics
        this.input.keyboard.once('keydown_D', event => {
            // turn on physics deugging to show player's hitbox
            this.physics.world.createDebugGraphic();
        })

        // create worldLayer collision graphic above the player but below the help text
        const graphics = this.add
            .graphics()
            .setAlpha(0.75)
            .setDepth(20);
        worldLayer.renderDebug(graphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), //Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });
    }
    update(time, delta){
        const speed = 175;
        const prevVelocity = this.player.body.velocity.clone();

        // apply the controls to the camera each update tick of the game
        // this.controls.update(delta);
        
        // this stops any previous movement from the last frame
        this.player.body.setVelocity(0);

        // If we were moving, pick an idle frame to use
        // if (prevVelocity.x < 0) this.player.setTexture("atlas", "misa-left");
        // else if (prevVelocity.x > 0) this.player.setTexture("atlas", "misa-right");
        // else if (prevVelocity.y < 0) this.player.setTexture("atlas", "misa-back");
        // else if (prevVelocity.y > 0) this.player.setTexture("atlas", "misa-front");


        //horizontal movement
        if(this.cursors.left.isDown){
            this.player.body.setVelocityX(-speed);
        }else if (this.cursors.right.isDown) {
            this.player.body.setVelocityX(speed);
        }

        // vertical movement

        if (this.cursors.up.isDown) {
            this.player.body.setVelocityY(-speed);
        }else if (this.cursors.down.isDown) {
            this.player.body.setVelocityY(speed);
        }

        // normalize and scale the velocity so that payer can't move faster along a diagonal
        this.player.body.velocity.normalize().scale(speed)

        // update the animation last and give left/right animations precedence over up/down animations
        if (this.cursors.left.isDown) {
            this.player.anims.play("misa-left-walk", true);
        } else if (this.cursors.right.isDown) {
            this.player.anims.play("misa-right-walk", true);
        } else if (this.cursors.up.isDown) {
            this.player.anims.play("misa-back-walk", true);
        } else if (this.cursors.down.isDown) {
            this.player.anims.play("misa-front-walk", true);
        } else {
            this.player.anims.stop();
        }
    } 
}

