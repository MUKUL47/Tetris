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
        this.timer = null;
    }

    start(){
        this.timer = setInterval(this.func, GLOBAL_TIMER)
    }
}