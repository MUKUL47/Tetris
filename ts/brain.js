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
                activeBlock = new Block(random(1, 7))
                newBlockTimer = null;
            }, 100)
        }
    })
}
rendererC = new Renderer(looper)
rendererC.draw()
function initInstance(){
    playGround = new Playground(PLAYGROUND_X, PLAYGROUND_Y, tetrisCanvas);
    activeBlock = new Block(random(1, 7))
    deactivatedBlocks = {}
    playGround.renderPlayGround()
    playGround.render()
}

function score(){
    let score = document.querySelector('#score').innerHTML;
    score = Number(score.split(':')[1].trim());
    score += X_BLOCK;
    document.querySelector('#score').innerHTML = `Score : ${score}`
}

function restart(){
    document.querySelector('.pause').innerHTML = 'Pause'
    rendererC.stop()
    initInstance()
    rendererC.start()
}

function stop(){
    const pauseOrResume = document.querySelector('.pause').innerHTML;
    if(pauseOrResume === 'Pause'){
        rendererC.stop()
        document.querySelector('.pause').innerHTML = 'Resume'
        return;
    }
    rendererC.start()
    document.querySelector('.pause').innerHTML = 'Pause'
}