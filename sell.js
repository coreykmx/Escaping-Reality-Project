class SellZone{
    constructor(x,y,z){
        this.x = x;
        this.y = y;
        this.z = z;
        this.sell = false;

        this.obj = document.createElement("a-box");
        this.obj.setAttribute("scale",{x:2,y:1,z:2})
        this.obj.setAttribute("color","green");

        let that = this;
        window.addEventListener("keydown", function(e) {
            if(e.key.toLowerCase() == "e" && distance(camera, that.obj) < 4){
                that.sell = true;
            }
        });

        this.obj.setAttribute("position",{x:this.x,y:this.y,z:this.z})
        scene.append(this.obj)
    }

    sellItems(){
        if(this.sell){
            money += rock_amount * 100;
            rock_amount = 0;

            money += copper_amount * 250;
            copper_amount = 0;
            this.sell = false;
        }
    }
}

