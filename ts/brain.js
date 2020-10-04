var tetrisCanvas = document.querySelector('#tetris');
var tetrisConvasCtx = tetrisCanvas.getContext('2d');
initInstance();
const looper = () => {
    playGround.onKeyDown(key => blockMovement(getArrow(key)))
    blockMovement('D')
    playGround.checkRowBlock()
}
function blockMovement(key){
    activeBlock.move(key, e => {
        if(!newBlockTimer){
            newBlockTimer = setTimeout(() => {
                activeBlock = new Block(4)//random(1, 5));
                newBlockTimer = null;
            }, 100)
        }
    })
}
rendererC = new Renderer(looper)
rendererC.draw()
function initInstance(){
    playGround = new Playground(PLAYGROUND_X, PLAYGROUND_Y, tetrisCanvas);
    activeBlock = new Block(4)//random(1, 5))
    deactivatedBlocks = {}
    playGround.renderPlayGround()
    playGround.render()
}