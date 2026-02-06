class IronPickaxe{
    constructor(p){
        this.power = p
        let camera = document.querySelector("a-camera");
        this.obj = document.createElement("a-gltf-model");
        this.obj.setAttribute("src","#ipickaxe")
        this.obj.setAttribute("scale",{x:0.35,y:0.35,z:0.35})
        this.obj.setAttribute("position",{x:1,y:-1,z:-1})
        this.obj.setAttribute("rotation",{x:0,y:0,z:0})
        this.obj.setAttribute("animation-mixer","")
        camera.append(this.obj)
    }

}