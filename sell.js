class SellZone{
    constructor(x,y,z){
        this.x = x;
        this.y = y;
        this.z = z;
        this.sell = false;

        this.obj = document.createElement("a-box");
        this.obj.setAttribute("scale",{x:2,y:1,z:2})
        this.obj.setAttribute("color","green");

        const that = this;
        window.addEventListener("keydown", function(e) {
            if(e.key.toLowerCase() == "e" && distance(camera, that.obj) < 4){
                that.sell = true;
            }
        });

        this.obj.setAttribute("position",{x:this.x,y:this.y,z:this.z})
        scene.append(this.obj)
    }

    faceCamera(){
        let cameraPos = camera.object3D.position;
        this.healthBarContainer.object3D.lookAt(cameraPos);
    }

    sellItems(){
        if(this.sell){
            money += rock_amount * 10;
            rock_amount = 0;

            // Sell copper: 25 dollars each
            money += copper_amount * 25;
            copper_amount = 0;
            this.sell = false;
        }
        // Sell rocks: 10 dollars each

    }
}

