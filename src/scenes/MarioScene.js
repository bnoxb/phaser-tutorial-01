import 'phaser';

export class MarioScene extends Phaser.Scene {
    constructor(){
        super();

    }
    preload() {
  // Runs once, loads up assets like images and audio
        this.load.image("mario-tiles", "../../assets/super-mario-tiles.png");
    }

    create() {
  // Runs once, after all assets in preload are loaded
        const level = [
            [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
            [  0,   1,   2,   3,   0,   0,   0,   1,   2,   3,   0 ],
            [  0,   5,   6,   7,   0,   0,   0,   5,   6,   7,   0 ],
            [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
            [  0,   0,   0,  14,  13,  14,   0,   0,   0,   0,   0 ],
            [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
            [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
            [  0,   0,  14,  14,  14,  14,  14,   0,   0,   0,  15 ],
            [  0,   0,   0,   0,   0,   0,   0,   0,   0,  15,  15 ],
            [ 35,  36,  37,   0,   0,   0,   0,   0,  15,  15,  15 ],
            [ 39,  39,  39,  39,  39,  39,  39,  39,  39,  39,  39 ]
        ];

        // When loading from an array, make sure to specify the tileWidth and tileHeight
        const map = this.make.tilemap({ data: level, tileWidth: 16, tileHeight: 16 });
        const tiles = map.addTilesetImage('mario-tiles');
        const layer = map.createStaticLayer(0, tiles, 0, 0);
    }

    update(time, delta) {
    // Runs once per frame for the duration of the scene
    }
}