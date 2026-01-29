class Copper{
    constructor(x,y,z,h){
        this.x = x;
        this.y = y;
        this.z = z;
        this.h = h;
        this.maxH = h;

        this.obj = document.createElement("a-box");
        this.obj.setAttribute("scale",{x:2,y:2,z:2})
        this.obj.setAttribute("color","brown");
        this.obj.mined = false;
        this.counted = false;

        this.healthBarContainer = document.createElement("a-entity");
        this.healthBarContainer.setAttribute("position",{x:0,y:0.75,z:0})
        this.obj.append(this.healthBarContainer);

        this.healthbarbg = document.createElement("a-box");
        this.healthbarbg.setAttribute("scale",{x:0.8,y:0.15,z:0.05})
        this.healthbarbg.setAttribute("color","red");
        this.healthbarbg.setAttribute("position",{x:0,y:0,z:0})
        this.healthBarContainer.append(this.healthbarbg);

        this.healthbar = document.createElement("a-box");
        this.healthbar.setAttribute("scale",{x:0.8,y:0.15,z:0.06})
        this.healthbar.setAttribute("color","#66FF00");
        this.healthbar.setAttribute("position",{x:0,y:0,z:0.025})
        this.healthBarContainer.append(this.healthbar);

        this.obj.setAttribute("clickable","");
        this.obj.addEventListener("click",()=>{
            if(distance(camera,this.obj)<4){
                this.h -= pickaxe_power;
            console.log("Health:", this.h);
            this.updateHealthBar();
            }

            if(this.h <= 0){
                this.obj.mined = true;
                console.log("C Mined");
                setTimeout(() => this.regenerate(), 30000);
            }
        })   

        this.obj.setAttribute("position",{x:this.x,y:this.y,z:this.z})
        scene.append(this.obj)
        this.updateHealthBar();
    }

    updateHealthBar(){
        let healthPercent = Math.max(0, this.h / this.maxH);
        let missingPercent = 1 - healthPercent;
        
        this.healthbar.setAttribute("scale",{x:0.8 * healthPercent,y:0.15,z:0.06})
        this.healthbar.setAttribute("position",{x:(healthPercent - 1) * 0.4,y:0,z:0.025})
        
        this.healthbarbg.setAttribute("scale",{x:0.8 * missingPercent,y:0.15,z:0.05})
        this.healthbarbg.setAttribute("position",{x:healthPercent * 0.4,y:0,z:0})
    }

    faceCamera(){
        let cameraPos = camera.object3D.position;
        this.healthBarContainer.object3D.lookAt(cameraPos);
    }

    dug(){
        if(this.obj.mined && !this.counted){
            this.obj.setAttribute("opacity",0)
            this.obj.setAttribute("position",{x:this.x,y:this.y-10,z:this.z})
            copper_amount++
            this.counted = true
        }
    }

    regenerate(){
        this.obj.setAttribute("opacity",1)
        this.obj.setAttribute("position",{x:this.x,y:this.y,z:this.z})
        this.h = 200;
        this.obj.mined = false;
        this.counted = false;
        this.updateHealthBar();
        console.log("C Regenerated");
    }
}