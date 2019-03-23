import 'phaser';

export class CaveScene extends Phaser.Scene {
    constructor(){
        super();
        this.groundY    = 584;
        this.groundX    = 16;
        this.block      = 32;
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
        this.ground = this.physics.add.staticGroup();

        // edge case the first block
        this.ground.create(this.groundX, this.groundY, 'ground').setFrame(1);

        // the first platform
        this.ground.create(this.groundX, this.groundY - (this.block * 2), 'ground').setFrame(17);
        let platCoords = this.createWalls('ceilingRight', 8, 0, this.groundX, this.groundY - (this.block * 2), 17, 18);
        this.ground.create(platCoords.endX, platCoords.endY - this.block, 'ground').setFrame(2);
        platCoords = this.createWalls('floorLeft', 8, 0, platCoords.endX, platCoords.endY - this.block, 1, 5);
        platCoords = this.createWalls('leftWallUp', 3, 0, platCoords.endX, platCoords.endY, 10, 5, null, true);
        platCoords = this.createWalls('ceilingRight', 6, 0, platCoords.endX, platCoords.endY, 17, 18);
            //corner
        platCoords.endY = platCoords.endY - this.block;
        this.ground.create(platCoords.endX, platCoords.endY, 'ground').setFrame(2);
        platCoords = this.createWalls('floorLeft', 6, 0, platCoords.endX, platCoords.endY, 1, 1);

        // the next platform
        platCoords = this.createWalls('ceilingRight', 10, 0, platCoords.endX - this.block, platCoords.endY - (this.block * 2), 17, 18);
        platCoords = this.createWalls('leftWallUp', 1, 0, platCoords.endX, platCoords.endY, 2, 2);
        platCoords = this.createWalls('floorLeft', 9, 0, platCoords.endX, platCoords.endY, 1, 1);

        // the next one
        platCoords = this.createWalls('ceilingRight', 12, 0, platCoords.endX - this.block, platCoords.endY - (this.block * 5), 17, 18);
        platCoords = this.createWalls('leftWallUp', 1, 0, platCoords.endX, platCoords.endY, 2, 2);
        platCoords = this.createWalls('floorLeft', 11, 0, platCoords.endX, platCoords.endY, 1, 1);




        let newCoords = this.createWalls('floorRight', 10, 0, this.groundX, this.groundY, 1, 7);

        //edge case, random fill spots on the very bottom
        this.createWalls('floorRight', 3, 0, newCoords.endX, newCoords.endY, 9, 9);

        newCoords = this.createWalls('rightWallUp', 5, 4, newCoords.endX, newCoords.endY, 8, 7, null, true);

        newCoords = this.createWalls('ceilingLeft', 2, 0, newCoords.endX, newCoords.endY, 17, 16);
        newCoords = this.createWalls('rightWallUp', 2, 1, newCoords.endX, newCoords.endY, 8, 0);
        newCoords = this.createWalls('floorRight', 5, 1, newCoords.endX, newCoords.endY, 1, 7);
        newCoords = this.createWalls('rightWallUp', 5, 1, newCoords.endX, newCoords.endY, 8, 7, null, true);
        newCoords = this.createWalls('ceilingLeft', 10, 0, newCoords.endX, newCoords.endY, 17, 16);

        //edgeCase -- a corner next to a corner
        this.ground.create(newCoords.endX, newCoords.endY - this.block, 'ground').setFrame(0);
        newCoords = this.createWalls('floorRight', 10, 0, newCoords.endX, newCoords.endY - this.block, 1, 6);

        //The tower at the top
        this.createWalls('rightWallUp', 3, 0, newCoords.endX, newCoords.endY, 12, 4);
        
        // the right side
        newCoords = this.createWalls('floorRight', 2, 2, newCoords.endX, newCoords.endY, 1, 7);
        newCoords = this.createWalls('rightWallUp', 4, 0, newCoords.endX, newCoords.endY, 8, 0);

        //edgeCase the stairs
        newCoords.endX = newCoords.endX + this.block;
        this.ground.create(newCoords.endX, newCoords.endY, 'ground').setFrame(2);
        newCoords.endY = newCoords.endY + this.block;
        this.ground.create(newCoords.endX, newCoords.endY, 'ground').setFrame(5);
        newCoords.endX = newCoords.endX + this.block;
        this.ground.create(newCoords.endX, newCoords.endY, 'ground').setFrame(2);

        newCoords = this.createWalls('leftWallDown', 1, 1, newCoords.endX, newCoords.endY, 8, 5);
        //step down
        newCoords.endX = newCoords.endX + this.block;
        this.ground.create(newCoords.endX, newCoords.endY, 'ground').setFrame(2);

        newCoords = this.createWalls('leftWallDown', 1, 2, newCoords.endX, newCoords.endY, 8, 5);
          //step down
        newCoords.endX = newCoords.endX + this.block;
        this.ground.create(newCoords.endX, newCoords.endY, 'ground').setFrame(2);

        newCoords = this.createWalls('leftWallDown', 1, 3, newCoords.endX, newCoords.endY, 8, 5);
        //step down
        newCoords.endX = newCoords.endX + this.block;
        this.ground.create(newCoords.endX, newCoords.endY, 'ground').setFrame(2);

        //The hole
        newCoords = this.createWalls('leftWallDown', 2, 0, newCoords.endX, newCoords.endY, 10, 18);
        newCoords = this.createWalls('ceilingLeft', 5, 1, newCoords.endX, newCoords.endY, 17, 5, null, true);
        newCoords = this.createWalls('leftWallDown', 11, 1, newCoords.endX, newCoords.endY, 10, 5);
        newCoords = this.createWalls('floorRight', 10, 0, newCoords.endX, newCoords.endY, 1, 1);

        // this.createPlatform01();
        this.resolveFrames('leftWallUp');
    }

    update () {

    }

    createWalls(keyWord, length, width, startX, startY, frameNum, endFrameNum, endFrameFlipX, endFrameFlipY) {
        const wallData = this.resolveFrames(keyWord);
        let wallX = startX + wallData.wallX;
        let wallY = startY + wallData.wallY;
            for(let i = 0; i < length; i++){
                let wallFillX = wallX + wallData.wallFillX;
                let wallFillY = wallY + wallData.wallFillY;
                if(i === length - 1){
                    const endFrame = this.ground.create(wallX, wallY, 'ground').setFrame(endFrameNum);
                    endFrame.flipX = endFrameFlipX;
                    endFrame.flipY = endFrameFlipY;
                    let k = 0;
                    while(k < width){
                        if(endFrameNum === wallData.endFrameCheck){
                            this.ground.create(wallFillX, wallFillY, 'ground').setFrame(wallData.endFrameFill);
                        }else {
                            this.ground.create(wallFillX, wallFillY, 'ground').setFrame(9);
                        }
                        wallFillX += wallData.wallFillX;
                        wallFillY += wallData.wallFillY;
                        k++;
                    }
                }else{
                    this.ground.create(wallX, wallY, 'ground').setFrame(frameNum);
                    let k = 0;
                    while(k < width) {
                        this.ground.create(wallFillX, wallFillY, 'ground').setFrame(9);
                        wallFillY += wallData.wallFillY;
                        wallFillX += wallData.wallFillX;
                        k++;
                    }
                    wallX += wallData.wallX;
                    wallY += wallData.wallY;
                }
            }
        const endCoords = {
            endX: wallX,
            endY: wallY
        }
        return endCoords;
    }

    resolveFrames(keyWord){
        let wallData = {
            leftWallUp: {
                wallX: 0,
                wallY: -32,
                wallFillX: -32,
                wallFillY: 0,
                endFrameCheck: 2,
                endFrameFill: 1
            },
            leftWallDown: {
                wallX: 0,
                wallY: 32,
                wallFillX: -32,
                wallFillY: 0,
                endFrameCheck: 18,
                endFrameFill: 17
            },
            rightWallUp: {
                wallX: 0,
                wallY: -32,
                wallFillX: 32,
                wallFillY: 0,
                endFrameCheck: 0,
                endFrameFill: 1
            },
            rightWallDown: {
                wallX: 0,
                wallY: 32,
                wallFillX: 32,
                wallFillY: 0,
                endFrameCheck: 16,
                endFrameFill: 17
            },
            ceilingLeft: {
                wallX: -32,
                wallY: 0,
                wallFillX: 0,
                wallFillY: -32,
                endFrameCheck: 16,
                endFrameFill: 8
            },
            ceilingRight: {
                wallX: 32,
                wallY: 0,
                wallFillX: 0,
                wallFillY: -32,
                endFrameCheck: 18,
                endFrameFill: 10
            },
            floorLeft: {
                wallX: -32,
                wallY: 0,
                wallFillX: 0,
                wallFillY: 32,
                endFrameCheck: 0,
                endFrameFill: 8
            },
            floorRight: {
                wallX: 32,
                wallY: 0,
                wallFillX: 0,
                wallFillY: 32,
                endFrameCheck: 2,
                endFrameFill: 10
            }
        };
        if(keyWord in wallData){
            const data = wallData[keyWord];
            return data;
        }
    }
}