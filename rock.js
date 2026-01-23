class Rock{
    constructor(x,y,z,h){
        this.x = x;
        this.y = y;
        this.z = z;
        this.h = h;

        this.obj = document.createElement("a-box");
        this.obj.setAttribute("scale",{x:2,y:2,z:2})
        this.obj.mined = false;
        this.counted = false;

        this.obj.setAttribute("clickable","");
        this.obj.addEventListener("click",()=>{
            if(distance(camera,this.obj)<5){
                this.h -= 25;
            console.log("Health:", this.h);
            }

            if(this.h <= 0){
                this.obj.mined = true;
                console.log("Mined");
                setTimeout(() => this.regenerate(), 60000);
            }
        })   

        this.obj.setAttribute("position",{x:this.x,y:this.y,z:this.z})
        scene.append(this.obj)
    }

    dug(){
        if(this.obj.mined && !this.counted){
            this.obj.setAttribute("opacity",0)
            this.obj.setAttribute("position",{x:this.x,y:this.y-10,z:this.z})
            rock_amount++
            this.counted = true
        }
    }

    regenerate(){
        this.obj.setAttribute("opacity",1)
        this.obj.setAttribute("position",{x:this.x,y:this.y,z:this.z})
        this.h = 100;
        this.obj.mined = false;
        this.counted = false;
        console.log("Regenerated");
    }
}