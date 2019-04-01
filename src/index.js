import 'phaser';
import { MarioScene } from './scenes/MarioScene'; 
import { PokemonScene } from './scenes/PokemonScene';
import { IndustrialScene } from './scenes/IndustrialScene';

const config = {
    type: Phaser.Auto,
    width: 800,
    height: 600,
    zoom: 1,
    pixelArt: false,
    parent: "game-container",
    backgroundColor: '#1d212d',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 },
            
        }
    },
    scene: IndustrialScene
};


new Phaser.Game(config);

