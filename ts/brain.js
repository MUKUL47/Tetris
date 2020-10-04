var tetrisCanvas = document.querySelector('#tetris');
var tetrisConvasCtx = tetrisCanvas.getContext('2d');
initInstance();
const looper = () => {
    playGround.onKeyDown(key => activeBlock.move(getArrow(key)))
    activeBlock.move('D')
}
new Renderer(looper).draw()
function initInstance(){
    playGround = new Playground(PLAYGROUND_X, PLAYGROUND_Y, tetrisCanvas);
    activeBlock = new Block(random(1, 5))
    deactivatedBlocks = new Array();
    playGround.renderPlayGround()
    playGround.render()
}