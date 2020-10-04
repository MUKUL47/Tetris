//canvas
tetrisCanvas = document.querySelector('#tetris');
tetrisConvasCtx = tetrisCanvas.getContext('2d');
//

//incoming block
incomingTetrisCanvas = document.querySelector('#tetris-block');
incomingTetrisConvasCtx = incomingTetrisCanvas.getContext('2d');
//

//global instances
let playGround;
let activeBlock;
let deactivatedBlocks;
let rendererC;
let newBlockTimer;
//

//-- TETRIS
const PLAYGROUND_X = 400
const PLAYGROUND_Y = 600
const GLOBAL_TIMER = 350
const X_BLOCK = PLAYGROUND_X / 20
const Y_BLOCK = PLAYGROUND_Y / 20
//--

//INCOMING
const PLAYGROUND_X_INCOMING = 100
const PLAYGROUND_Y_INCOMING = 100
const X_BLOCK_INCOMING = PLAYGROUND_X_INCOMING / 20
const Y_BLOCK_INCOMING = PLAYGROUND_Y_INCOMING / 20
//

//utils
const random = (min, max) => Math.floor((Math.random() * (max- min) + min))
//

//maps
function getArrow(k){
    switch(k){
        case 37 :   return 'L'
        case 38 :   return 'T'
        case 39 :   return 'R'
        default :   return 'D';
    }
}
//