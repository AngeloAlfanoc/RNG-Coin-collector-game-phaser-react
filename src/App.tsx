import React, { useState } from 'react';
import Canvas from "./components/canvas"
import PlusMin from './components/plusMin';
import { getRandomInt } from './helpers/random';
import BooleanStore from './store/booleans';
import EarningsStore from "./store/earnings"


import StakeStore from './store/stake';


export const earningStore = new EarningsStore()
export const stakeStore = new StakeStore()
export const booleanStore = new BooleanStore();

let player: Phaser.Physics.Arcade.Sprite | undefined
let coins: Phaser.Physics.Arcade.Group | undefined;
let platforms: Phaser.Physics.Arcade.StaticGroup | undefined;
let cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
let gameOver = false;




// In the Phaser config below I actually pass `this` in as an argument
// so I can leverage intellisense
export function preload(scene: Phaser.Scene) {
    scene.load.image('sky', '/assets/sky.png');
    scene.load.image('ground', '/assets/platform.png');
    scene.load.image('coin', '/assets/coin.png');
    scene.load.spritesheet('char', '/assets/char.png', { frameWidth: 32, frameHeight: 29 });
}
export function create(scene: Phaser.Scene) {
    scene.lights.enable()
    scene.lights.addLight(300, 300, 300, 0xff0000, 1);
    scene.lights.addLight(400, 300, 300, 0x00ff00, 1);
    scene.lights.addLight(600, 500, 300, 0x0000ff, 1);
    //  A simple background for our game
    scene.add.image(400, 300, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = scene.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    // //  Now let's create some ledges
    platforms.create(400, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    // The player and its settings
    player = scene.physics.add.sprite(50, 450, 'char');

    //  Player physics properties. Give the little guy a slight bounce.
    player!.setBounce(0.2);
    player!.setCollideWorldBounds(true);

    //  Our player animations, turning, walking left and walking right.
    scene.anims.create({
        key: 'left',
        frames: scene.anims.generateFrameNumbers('char', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    scene.anims.create({
        key: 'turn',
        frames: [{ key: 'char', frame: 4 }],
        frameRate: 20
    });

    scene.anims.create({
        key: 'right',
        frames: scene.anims.generateFrameNumbers('char', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    //  Input Events
    cursors = scene.input.keyboard.createCursorKeys();

    //  Some coins to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    coins = scene.physics.add.group({
        key: 'coin',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    coins.children.iterate(function (child) {
        //  Give each coin a slightly different bounce
        (child as unknown as Phaser.Physics.Arcade.Body).setBounceY(Phaser.Math.FloatBetween(0.1, 0.4));

    });


    //  Collide the player and the coins with the platforms
    scene.physics.add.collider(player, platforms);
    scene.physics.add.collider(coins, platforms);


    //  Checks to see if the player overlaps with any of the coins, if he does call the collectcoin function
    scene.physics.add.overlap(player, coins, collectcoin, undefined, scene);
}
export function update(scene: Phaser.Scene) {
    if (gameOver) {
        return;
    }

    if (cursors!.left!.isDown) {
        player!.setVelocityX(-160);
        player!.anims.play('left', true);
    }
    else if (cursors!.right!.isDown) {
        player!.setVelocityX(160);
        player!.anims.play('right', true);
    }
    else {
        player!.setVelocityX(0);
        player!.anims.play('turn');
    }

    if (cursors!.up!.isDown && player!.body.touching.down) {
        player!.setVelocityY(-330);
    }

}

function collectcoin(player: any, coin: any) {
    coin.disableBody(true, true);
    let rng = getRandomInt(100)
    if (rng > 95) { 
        earningStore.earnings += stakeStore.stake 
    }
    //  Add and update the score *in the shared scoreStore*
    earningStore.earnings += Phaser.Math.RND.between(0, 10) / Phaser.Math.RND.between(stakeStore.stake * 5 * 10, stakeStore.stake * 10 * 10);
    if (coins!.countActive(true) === 0) {
        player.anims.play('turn');
        // booleanStore.pause = true;
       console.log(booleanStore.pause)
    }
}


function App() {
    const [menu, setMenu] = useState(booleanStore.pause)
    const handleClick = () => {
        console.log(booleanStore.pause, menu)
        setMenu(false)
        booleanStore.pause = false
        console.log(booleanStore.pause, menu)
    }
    return (
        <div className="App">
            {menu && <div className="menu" style={{
                left: 0
            }}><h1>ChouChou</h1>
                <PlusMin />
                <button onClick={() => handleClick()} className="start">Start</button>
            </div>}
            <Canvas />
        </div>
    );
}



export default App;