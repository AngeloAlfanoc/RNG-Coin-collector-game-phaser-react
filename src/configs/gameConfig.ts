import {
    preload,
    create,
    update
} from "../App"

export const gameConfig = {
    type: Phaser.AUTO,
    key:'main',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 300
            },
            debug: false
        }
    },
    scene: {
        preload: function () {
            preload(this as unknown as Phaser.Scene)
        },
        create: function () {
            create(this as unknown as Phaser.Scene)
        },
        update: update
    }
};