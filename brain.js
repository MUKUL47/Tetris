var sizeX = 35,
    sizeY = 25,
    grid, node, blocks, activeBlock,
    key;
function setup(){
    frameRate(5)
    createCanvas(500,500) 
    grid  = new Grid(sizeX, sizeY) 
    node  = new Array()
    blocks = new Array()
    initNodes()
    addBlock()
    key = 'D'    
       
}
var inMotion = ()=>{
    movePeice(activeBlock.yCoordinates,1,'Y')
}
function draw(){    
    background(0)
    updateBlock()    
    grid.render(node)
    inMotion()
    
}
function initNodes(){
    for( var j = 0; j < sizeX; j++ ){
        node.push([])
    }
    for( var i = 0; i < sizeX; i++ ){
        for( var j = 0; j < sizeY; j++ ){
            node[i].push(new Node(i,j))
        }
    }     
}
function addBlock(){
    activeBlock = new Block(Math.floor(Math.random() * (6 - 1)))
    blocks.push(activeBlock)
}
function updateBlock(){
        for( var i = 0; i < activeBlock.xCoordinates.length; i++ ){
                node[activeBlock.yCoordinates[i]]
                [activeBlock.xCoordinates[i]].setRgb(0,0,0)
        }
}
function movePeice( coordinates, direction, center ){
    /**
     * set old coordinates RGB as default background (yellow)
     * increment/decrement coordinates according to direction
     */
    if( checkBarrier(coordinates, direction, center) ){        
        for( let i = 0; i < coordinates.length; i++ ){        
            node[activeBlock.yCoordinates[i]]
                [activeBlock.xCoordinates[i]].setRgb(255,255,0)
                coordinates[i] += direction
        }
        //update rotational reference vector
        if( center == 'X' ) activeBlock.centerX += direction
        else                {
            activeBlock.centerY += direction
            checkNewBlockRequirement(coordinates)
        }
    }
}
function checkBarrier(coordinates, direction, leftOrRight){
    //default playground borders 0 <= X,Y <= 24
    for( let i = 0; i < coordinates.length; i++ ){         
        if( (coordinates[i]+direction) < 0 || 
            (coordinates[i]+direction) > 24 ) 
            return false
    }

    //check adjacent block right or left
    if(leftOrRight == 'X'){
        for( let i = 0; i < coordinates.length; i++ ){         
            if(node[activeBlock.yCoordinates[i]]
                [activeBlock.xCoordinates[i]+direction]
                .getG() == 0)
                return false
        }
    }
    return true
}

function keyPressed(){
    switch( keyCode ){
        case UP_ARROW:
            for( let i = 0; i < activeBlock.yCoordinates.length; i++ ){        
            node[activeBlock.yCoordinates[i]]
                [activeBlock.xCoordinates[i]].setRgb(255,255,0)                
            } 
            activeBlock.rotate()          
            break

        case RIGHT_ARROW:
            movePeice(activeBlock.xCoordinates,1,'X')    
            break

        case LEFT_ARROW:
            movePeice(activeBlock.xCoordinates,-1,'X')
            break        
    }
}

var setRgbPermanent = ()=>{
    for( var i = 0; i < activeBlock.xCoordinates.length; i++ ){
        node[activeBlock.yCoordinates[i]]
        [activeBlock.xCoordinates[i]].setRgb(255,0,0)
}
}

function checkNewBlockRequirement(coordinates){

    //spawn new block if reached bottom
    if(Math.max(...coordinates) == 24){
        blocks[0].active = false
        setRgbPermanent()
        addBlock()
    }
    //spawn if active block is on top preexisting one 
    else{
        for( var i = 0; i < activeBlock.xCoordinates.length; i++ ){
            if(   node[activeBlock.yCoordinates[i]+1]
                      [activeBlock.xCoordinates[i]]
                      .getG() == 0 ){
                    setRgbPermanent()
                    addBlock()
                }     
        }
    }  
}