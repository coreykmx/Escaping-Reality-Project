class Pickaxe{
    constructor(){
        let camera = document.querySelector("#maincamera");
        this.obj = document.createElement("a-box");
        this.obj.setAttribute("scale",{x:0.25,y:1.5,z:0.25})
        this.obj.setAttribute("position",{x:1.5,y:-0.3,z:-1})
        camera.append(this.obj)
    }

    mine(){

    }
}