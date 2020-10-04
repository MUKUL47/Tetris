class IncomingBlock{
    canvas;
    canvasContext;
    keyTimer = null;
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.canvasContext = incomingTetrisConvasCtx
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    renderPlayGround(){
        for(let i = 0; i < X_BLOCK_INCOMING; i++){
            for(let j = 0; j < X_BLOCK_INCOMING; j++){
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

}