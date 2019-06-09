class Node{
    constructor(x, y){
        this.x         = x
        this.y         = y
        this.R         = 255
        this.G         = 255
        this.B         = 0
        this.permanent = false;
        this.active    = true;
    }
    setRgb(R, G, B){
        this.R = R
        this.G = G
        this.B = B
    }
    
    getR(){ return this.R }
    getG(){ return this.G }
    getB(){ return this.B }
}