class CopperPickaxe{
    constructor(p){
        this.power = p
        let camera = document.querySelector("a-camera");
        this.obj = document.createElement("a-box");
        this.obj.setAttribute("color","brown");
        this.obj.setAttribute("scale",{x:0.25,y:1.5,z:0.25})
        this.obj.setAttribute("position",{x:1.5,y:-0.3,z:-1})
        camera.append(this.obj)
    }

}