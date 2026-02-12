class StonePickaxe{
    constructor(p){
        this.power = p
        this.mining = false;
        let camera = document.querySelector("a-camera");
        this.obj = document.querySelector("#pickaxeholder");
        this.obj.setAttribute("src","#pickaxe")
        this.obj.setAttribute("scale",{x:0.35,y:0.35,z:0.35})
        this.obj.setAttribute("position",{x:1,y:-1.75,z:-1})
        this.obj.setAttribute("rotation",{x:0,y:0,z:0})

        window.addEventListener("click", ()=>{
            if (cooldown) return;
            this.mining = true;
            if (this.mining) {
                this.obj.removeAttribute("animation-mixer");
                setTimeout(() => {
                    this.obj.setAttribute("animation-mixer", "clip:ArmatureAction;loop:once");
                }, 1);
                this.mining = false;
                setTimeout(() => cooldown = true, 10);               
                setTimeout(() => cooldown = false, 1250);
            }            
        });

        camera.append(this.obj)
    }

}