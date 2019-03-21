import 'phaser';
import { CaveScene } from './scenes/CaveScene'; 

const config = {
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: CaveScene
};


new Phaser.Game(config);

