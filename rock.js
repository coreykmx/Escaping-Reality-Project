class Rock{
    constructor(x,y,z){
        this.x = x
        this.y = y
        this.z = z

        this.obj = document.createElement("a-entity")
        let rock = document.createElement("a-box");
        rock.setAttribute("scale",{x:2,y:2,z:2})
        this.obj.append(rock)
        this.obj.setAttribute("position",{x:x,y:y,z:z})
        scene.append(this.obj)
    }

    mined(){
        if(this.obj.mined){
            this.obj.setAttribute("transparent","true");
        }
    }
}