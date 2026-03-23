class SellZone{
    constructor(x,y,z){
        this.x = x;
        this.y = y;
        this.z = z;
        this.sell = false;

        this.obj = document.createElement("a-gltf-model");
        this.obj.setAttribute("src","#store2");
        this.obj.setAttribute("scale",{x:0.5,y:0.5,z:0.5})
        this.obj.setAttribute("rotation", { x: 0, y: 90, z: 0 });
        this.obj.setAttribute("color","green");
        this.obj.setAttribute("static-body","shape: box");

        let img = document.createElement("a-plane");
        img.setAttribute("src","money.jpg");
        img.setAttribute("scale",{x:2.5,y:2.5,z:2.5})
        img.setAttribute("rotation",{x:0,y:90,z:0})
        img.setAttribute("position",{x:0.5,y:7.1,z:0})
        this.obj.append(img);   

        window.addEventListener("hover", function(e) {
            if(e.key.toLowerCase() == "e" && distance(camera, that.obj) < 4){
                that.sell = true;
            }
        });

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

            money += iron_amount * 500;
            iron_amount = 0;
            this.sell = false;
        }
    }
}

