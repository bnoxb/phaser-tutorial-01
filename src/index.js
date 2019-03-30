import 'phaser';
import { MarioScene } from './scenes/MarioScene'; 

const config = {
    width: 171,
    height: 160,
    zoom: 3,
    pixelArt: true,
    parent: "game-container",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: MarioScene
};


new Phaser.Game(config);

