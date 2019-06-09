class Block{ 
    constructor(piece){
                this.permanent = false,
                this.active    = true                           
        switch(piece){
            case 1:
                this.start        = Math.floor(random(3,20));
                this.xCoordinates = [this.start, this.start-1, 
                                     this.start, this.start+1]  
                this.yCoordinates = [0,1,1,1]   
                this.centerX      = this.start
                this.centerY      = 1
                break

            case 2:
                this.start        = Math.floor(random(3,20));
                this.xCoordinates = [this.start, this.start-1, 
                                     this.start, this.start+1]   
                this.yCoordinates = [0,0,1,1]
                this.centerX      = this.start
                this.centerY      = 1
                break

            case 3:
                this.start        = Math.floor(random(3,20));
                this.xCoordinates = [this.start, this.start-1, 
                                     this.start+1, this.start+2]   
                this.yCoordinates = [0,0,1,1]
                this.centerX      = this.start+1
                this.centerY      = 1
                break   

            case 4:
                this.start        = Math.floor(random(3,20));
                this.xCoordinates = [this.start, this.start, 
                                     this.start+1, this.start+2]   
                this.yCoordinates = [0,1,1,1]
                this.centerX      = this.start
                this.centerY      = 1
                break

            case 5:
                this.start        = Math.floor(random(3,20));
                this.xCoordinates = [this.start, this.start+1, 
                                     this.start+2, this.start+1]   
                this.yCoordinates = [0,0,0,0]
                this.centerX      = this.start+1
                this.centerY      = 1
                break   
        }
    }
    setPermanent()   { this.permanent = true  }

    deactivate()     { this.active = false }
    
    rotate(){
        //https://www.youtube.com/watch?v=Atlr5vvdchY
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
}