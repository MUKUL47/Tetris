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
                                     this.start+2, this.start+3]   
                this.yCoordinates = [0,0,0,0]
                this.centerX      = this.start+1
                this.centerY      = 1
                break   
        }
    }
    setPermanent()   { this.permanent = true  }

    deactivate()     { this.active = false }
    
    rotate(){
        for(var i = 0; i < this.xCoordinates.length; i++){
            var x1  = this.xCoordinates[i]-this.centerX;
            var y1  = this.yCoordinates[i]-this.centerY;
            var x11 = -y1
            var y11 = x1
            x1      = x11+this.centerX;
            y1      = y11+this.centerY;
            this.xCoordinates[i] = x1
            this.yCoordinates[i] = y1
            }
    }

    move(key){
        const moveK = this.getCoord(key);
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