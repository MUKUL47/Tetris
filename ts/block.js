class Block{ 
    constructor(piece){
                this.permanent = false,
                this.active    = true   
                this.xCoordinatesLast = null;                        
                this.yCoordinatesLast = null;
        switch(piece){
            case 1:
                this.start        = random(3,X_BLOCK - 5);
                this.xCoordinates = [this.start, this.start-1, 
                                     this.start, this.start+1]  
                this.yCoordinates = [0,1,1,1]   
                this.centerX      = this.start
                this.centerY      = 1
                break

            case 2:
                this.start        = random(3,X_BLOCK - 5);
                this.xCoordinates = [this.start, this.start-1, 
                                     this.start, this.start+1]   
                this.yCoordinates = [0,0,1,1]
                this.centerX      = this.start
                this.centerY      = 1
                break
            case 3:
                this.start        = random(3,X_BLOCK - 5);
                this.xCoordinates = [this.start, this.start, 
                                     this.start+1, this.start+2]   
                this.yCoordinates = [0,1,1,1]
                this.centerX      = this.start
                this.centerY      = 1
                break

            case 4:
                this.start        = random(2,X_BLOCK - 5);
                this.xCoordinates = [this.start, this.start+1, 
                                     this.start+2, this.start+3, this.start+4, this.start+5, this.start+6, this.start+7, this.start+8, this.start+9]   
                this.yCoordinates = [0,0,0,0,0,0,0,0,0,0]
                this.centerX      = this.start+1
                this.centerY      = 1
                break   
        }
    }
    setPermanent()   { this.permanent = true  }

    deactivate()     { this.active = false }
    
    rotate(){
        const clonedX = [...this.xCoordinates]
        const clonedY = [...this.yCoordinates]
        for(var i = 0; i < this.xCoordinates.length; i++){
            var x1  = this.xCoordinates[i]-this.centerX;
            var y1  = this.yCoordinates[i]-this.centerY;
            var x11 = -y1
            var y11 = x1
            x1      = x11+this.centerX;
            y1      = y11+this.centerY;
            if(x1 < 0 || x1 > 19 || y1 < 0 || y1 > 29) {
                this.xCoordinates = clonedX;
                this.yCoordinates = clonedY;
                return;
            }
            this.xCoordinates[i] = x1
            this.yCoordinates[i] = y1
            }
    }

    move(key, cb){
        if(!rendererC.timer) return
        const moveK = this.getCoord(key);
        if(this.constrictMovement(key)) {
            if(key === 'D'){
                this.yCoordinates.forEach((v, i) => deactivatedBlocks[this.xCoordinates[i]+","+v] = true)
                playGround.markPermanent(this.xCoordinates, this.yCoordinates)
                console.log(deactivatedBlocks)
                // rendererC.stop()
                cb(true)
            }
            return
        }
        this.xCoordinatesLast = [...this.xCoordinates];
        this.yCoordinatesLast = [...this.yCoordinates];
        if(key === 'T'){
            this.rotate();
        }else{
            if(moveK.key == 'x'){
                this.xCoordinates = this.xCoordinates.map(v => v + moveK.v)
            }else{
                this.yCoordinates = this.yCoordinates.map(v => v + moveK.v)
            }
            this.centerX = this.xCoordinates[2]
            this.centerY = this.yCoordinates[2]
        }
        playGround.render()
    }

    constrictMovement(key){
        if(key === 'T') return false
        if(key === 'L' || key === 'R'){
            const coord = this.getCoord(key);
            const horizontalBlockActive = this.yCoordinates.find((v, i) => deactivatedBlocks[(this.xCoordinates[i] + coord.v)+","+v]);
            return key === 'L' ? Math.min(...this.xCoordinates) < 1 || horizontalBlockActive: Math.max(...this.xCoordinates) >= 19 || horizontalBlockActive
        }
        const reachedBottom = Math.max(...this.yCoordinates) >= 29;
        let deactivatedFound = this.yCoordinates.find((v, i) => deactivatedBlocks[this.xCoordinates[i]+","+(v+1)]);
        return reachedBottom || deactivatedFound
    }    

    getCoord(key){
        switch(key){
            case 'L' :  return { key : 'x', v : -1 }
            case 'T' :  return { key : 'y', v : -1 }
            case 'R' :  return { key : 'x', v : 1 }
            default :   return { key : 'y', v : 1 }
        }
    }
}