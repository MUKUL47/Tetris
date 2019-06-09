class Grid{
    constructor(width, height){
        this.width  = width
        this.height = height 
    }
    render(Nodes){
        for( var i = 0; i < this.width; i++){
            for( var j = 0; j < this.height; j++){ 
                fill(Nodes[i][j].getR(),Nodes[i][j].getG(),Nodes[i][j].getB());
                rect(j*20,i*20,20,20);
            }
        }
    }
}