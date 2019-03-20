import Phaser from "phaser";

const config = {
    type: AUTO,
    width: 800,
    height: 600,
    scene: {
      preload: preLoad,
      create: create,
      update: update
    }
};

const ground;

const game = new Phaser.Game(config);

const preLoad = () => {
    this.load.spritesheet('background', 'assets/platformertiles.png', { frameWidth: 32, frameHeight: 32 });
    this.load.image('sky', '/assets/space-background-1.png');
}

const create = () => {
    this.add.image(400, 300, 'sky');

    ground = this.physics.add.staticGroup();
}

const update = () => {

}