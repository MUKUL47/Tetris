class Renderer{
    func;
    timer = null;
    constructor(func){
        this.func = func;
    }
    draw(){
        this.timer = setInterval(this.func, GLOBAL_TIMER)
    }

    stop(){
        if(!this.func || !this.timer ) return;
        clearInterval(this.timer);
    }
}