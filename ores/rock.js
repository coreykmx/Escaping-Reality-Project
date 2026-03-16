class Rock {
    constructor(x, y, z, h) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.h = h;
        this.maxH = h;

        this.obj = document.createElement("a-gltf-model");
        this.obj.setAttribute("src", "#rock");
        this.obj.setAttribute("scale",{x:0.25,y:0.25,z:0.25});
        this.obj.mined = false;
        this.counted = false;

        this.healthBarContainer = document.createElement("a-entity");
        this.healthBarContainer.setAttribute("scale", { x: 6, y: 6, z: 6 });
        this.healthBarContainer.setAttribute("position", { x: 0, y: y+7, z: 0 });
        this.obj.append(this.healthBarContainer);

        this.healthbarbg = document.createElement("a-box");
        this.healthbarbg.setAttribute("scale", { x: 1.0, y: 0.2, z: 0.04 });
        this.healthbarbg.setAttribute("color", "red");
        this.healthbarbg.setAttribute("position", { x: 0, y: 0, z: -0.01 }); 
        this.healthBarContainer.append(this.healthbarbg);

        this.healthbar = document.createElement("a-box");
        this.healthbar.setAttribute("scale", { x: 1.0, y: 0.2, z: 0.05 });
        this.healthbar.setAttribute("color", "#66FF00");
        this.healthbar.setAttribute("position", { x: 0, y: 0, z: 0.01 }); 
        this.healthBarContainer.append(this.healthbar);

        this.obj.setAttribute("clickable", "");
        this.obj.addEventListener("click", () => {
            if (!cooldown && (stone || copper || iron || diamond) && distance(camera, this.obj) < 10) {
                cooldown = true;
                setTimeout(() => {
                    this.h -= pickaxe_power;
                    this.updateHealthBar();
                    
                    if (this.h <= 0 && !this.obj.mined) { 
                        this.obj.mined = true;
                        setTimeout(() => this.regenerate(), 30000);
                    }
                }, 1000);
                setTimeout(() => cooldown = false, 1000);
            }
        });  

        this.obj.setAttribute("position", { x: this.x, y: this.y, z: this.z });
        scene.append(this.obj);
        this.updateHealthBar();
    }

    updateHealthBar() {
        let healthPercent = Math.max(0, this.h / this.maxH);
        let scaleX = Math.max(0.001, 1.0 * healthPercent); 
        
        this.healthbar.setAttribute("scale", { x: scaleX, y: 0.2, z: 0.05 });
        this.healthbar.setAttribute("position", { x: (healthPercent - 1) * 0.5, y: 0, z: 0.01 });
        this.healthbar.setAttribute("visible", healthPercent > 0);
    }

    faceCamera() {
        let cameraPos = camera.object3D.position;
        this.healthBarContainer.object3D.lookAt(cameraPos);
    }

    dug() {
        if (this.obj.mined && !this.counted) {
            this.obj.setAttribute("opacity", 0);
            this.healthbarbg.setAttribute("visible", false);
            this.healthbar.setAttribute("visible", false);
            this.obj.setAttribute("position", { x: this.x, y: this.y - 10, z: this.z });
            rock_amount++;
            this.counted = true;
        }
    }

    regenerate() {
        this.obj.setAttribute("opacity", 1);
        this.healthbarbg.setAttribute("visible", true);
        this.healthbar.setAttribute("visible", true);
        this.obj.setAttribute("position", { x: this.x, y: this.y, z: this.z });
        this.h = this.maxH; 
        this.obj.mined = false;
        this.counted = false;
        this.updateHealthBar();
    }
}