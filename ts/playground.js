class Playground{
    canvas;
    canvasContext;
    canvasActiveListener = false;
    keyTimer = null;
    constructor(width, height, canvas){
        this.width = width;
        this.height = height;
        this.canvas = canvas;
        this.canvasContext = canvas.getContext('2d');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        // this.initListeners();
    }

    initListeners(){
        // document.addEventListener('click', e => this.canvasActiveListener = this.canvas == e.target)
    }

    renderPlayGround(){
        for(let i = 0; i < Y_BLOCK; i++){
            for(let j = 0; j < X_BLOCK; j++){
                this.resetNode([j], [i])
            }
        }
    }

    render(){
        if(activeBlock.xCoordinatesLast){
            this.resetNode(activeBlock.xCoordinatesLast, activeBlock.yCoordinatesLast)
        }
        this.canvasContext.fillStyle = "#000";
        activeBlock.xCoordinates.forEach((v, i) => this.canvasContext.fillRect(v * X_BLOCK, activeBlock.yCoordinates[i] * X_BLOCK, X_BLOCK, X_BLOCK))
    }

    markPermanent(x, y, color){
        this.canvasContext.fillStyle = color? color : "teal";
        x.forEach((v, i) => this.canvasContext.fillRect(v * X_BLOCK, y[i] * X_BLOCK, X_BLOCK, X_BLOCK))
    }

    removePreRender(){
        this.canvasContext.fillStyle = "red";
        this.canvasContext.fillRect(this.x_ * X_BLOCK, this.y_ * X_BLOCK , X_BLOCK, X_BLOCK);
    }

    onKeyDown(cb){
        document.addEventListener('keydown', e => {
            // if(!this.canvasActiveListener) return;
            if([37,38,39,40].indexOf(e['keyCode']) > -1){
                if(!this.keyTimer){
                    this.keyTimer = setTimeout(() => {
                        cb(e['keyCode'])
                        this.keyTimer = null;
                    }, 50)
                }
            }
        })
    }

    resetNode(x, y,){
        x.forEach((xV, i) => {
            this.canvasContext.fillStyle = "#fff";
            this.canvasContext.fillRect(xV * X_BLOCK, y[i] * X_BLOCK, X_BLOCK, X_BLOCK);
            this.canvasContext.strokeStyle = "#000";
            this.canvasContext.stroke();
            this.canvasContext.rect(xV * X_BLOCK, y[i] * X_BLOCK, X_BLOCK, X_BLOCK);
        })
    }

    checkRowBlock(){
        for(let i = 0; i < Y_BLOCK; i++){
            const actives = [];
            const rowActive = Array(X_BLOCK).fill(1).filter((v, j) => {
                const s = deactivatedBlocks[`${j},${i}`]
                if(s){
                    actives.push(`${j},${i}`)
                    return true;
                }
            });
            if(rowActive.length  === X_BLOCK){
                actives.forEach(a => delete deactivatedBlocks[a])
                this.resetNode(Array(X_BLOCK).fill(1).map((_, i) => i), Array(i).fill(i))
                this.compactLooseNodes(i)
                score();
            }
        }
    }
    compactLooseNodes(startHeight){
        for(let y = startHeight-1; y > 0; y--){
            this.resetNode(Array(X_BLOCK).fill(1).map((_, i) => i), Array(y).fill(y))
            let newX = [];
            let newY = [];
            for(let x = 0; x < X_BLOCK; x++){
                if(deactivatedBlocks[`${x},${y}`]){
                    deactivatedBlocks[`${x},${y+1}`] = true;
                    newX.push(x)
                    newY.push(y+1)
                    delete deactivatedBlocks[`${x},${y}`];
                }
            }
            if(newX.length > 0){
                this.markPermanent(newX, newY)
            }
        }
    }
    
}