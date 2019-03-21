import 'phaser';

export class CaveScene extends Phaser.Scene {
    constructor(){
        super();
        this.groundY    = 584;
        this.groundX    = 16;
    }


    preload() {
        this.load.multiatlas('hero', 'assets/gentleman-spy.json', 'assets');
        this.load.image('space', 'assets/space-background-1.png');
        this.load.spritesheet('ground', 'assets/platformertiles.png', { frameWidth: 32, frameHeight: 32 });
    }

    create() {
        // background >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        this.add.image(400, 300, 'space');

        // functions to call to setup the platforms
        this.createGround();
        this.createWallsRight(4, 4, this.groundX, this.groundY, 7, null, true);
        // this.createPlatform01();
    }

    update () {

    }

    createGround () {

        this.ground = this.physics.add.staticGroup();
        this.ground.create(this.groundX, this.groundY, 'ground').setFrame(0);

        let i = 0;
        while ( i < 11 ){
            this.groundX += 32;
            this.ground.create(this.groundX, this.groundY, 'ground').setFrame(1);
            i++;
        }
        this.ground.create(this.groundX, this.groundY, 'ground').setFrame(7);

    }

    createWall01 () {
        this.groundY -= 32;
        let i = 0;
        while ( i < 3){
            this.ground.create(this.groundX, this.groundY, 'ground').setFrame(8);
            this.groundY -= 32;
            i++;
        }
        const topCorner = this.ground.create(this.groundX, this.groundY, 'ground').setFrame(7);
        topCorner.flipY = true;
    }

    createPlatform01() {
        // since the platform will start to offshoot from the top of createWall01, Im going to make new properties for the platform.
        this.groundX -= 32;
        // then make the platform;
        let i = 0;
        while( i < 4){
            this.ground.create(this.groundX, this.groundY, 'ground').setFrame(17);
            this.groundX -= 32;
            i++;
        }
        this.ground.create(this.groundX, this.groundY, 'ground').setFrame(16);
    }

    createWallsRight(height, width, startX, startY, endFrameNum, endFrameFlipX, endFrameFlipY){
        let wallX = startX;
        let wallY = startY - 32;
        if(width > 0){

            for(let i = 0; i < height; i++){
                if(i === height - 1){
                    const endFrame = this.ground.create(wallX, wallY, 'ground').setFrame(endFrameNum);
                    endFrame.flipX = endFrameFlipX;
                    endFrame.flipY = endFrameFlipY;
                    let wallFillX = wallX +32;
                    let k = 1;
                    while(k < width + 1){
                        console.log('in the wide while loop');
                        if(endFrameNum === 0){
                            this.ground.create(wallFillX, wallY, 'ground').setFrame(1);
                        }else {
                            this.ground.create(wallFillX, wallY, 'ground').setFrame(9)
                        }
                        wallFillX += 32;
                        k++;
                    }
                    wallY -= 32;
                }else{
                    this.ground.create(wallX, wallY, 'ground').setFrame(8)
                    let wallFillX = wallX + 32;
                    let k = 1;
                    while(k < width + 1) {
                        console.log('in the wide while loop');
                        this.ground.create(wallFillX, wallY, 'ground').setFrame(9);
                        wallFillX += 32;
                        k++;
                    }
                    wallY -= 32;
                }
            }
        }else {
            let i = 0;
            while(i < height){
                console.log(`i is: ${i} and the height is: ${height}`)
                this.ground.create(wallX, wallY, 'ground').setFrame(12);
                console.log(`made the ground at: ${wallX} and ${wallY}`);
                wallY -= 32;
                i++;
            }
            this.ground.create(wallX, wallY, 'ground').setFrame(4);
        }
        const endCoords = {
            endX: wallX,
            endY: wallY
        }
        return endCoords;
    }
}