//global instances
let playGround;
let activeBlock;
let deactivatedBlocks;
let onKeyPressTime
//

//--
const PLAYGROUND_X = 400
const PLAYGROUND_Y = 600
const GLOBAL_TIMER = 700
const X_BLOCK = PLAYGROUND_X / 20
const Y_BLOCK = PLAYGROUND_Y / 20
//--

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