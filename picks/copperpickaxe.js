class CopperPickaxe{
        constructor(p){
        this.power = p
        this.mining = false;
        let camera = document.querySelector("a-camera");
        this.obj = document.querySelector("#pickaxeholder");
        this.obj.setAttribute("src","#cpickaxe")
        this.obj.addEventListener('model-loaded', () => {
            this.obj.setAttribute("animation-mixer", {
                clip: 'idle',
                loop: 'repeat',
            clampWhenFinished: true
            });
        });
        this.obj.addEventListener('animation-finished', (e) => {
            if (e.detail.action._clip.name === 'swing') {
                this.playAnim('idle', 'repeat');
            }
        });     
        this.obj.setAttribute("scale",{x:0.45,y:0.45,z:0.45})
        this.obj.setAttribute("position",{x:0,y:-2,z:0.5})
        this.obj.setAttribute("rotation",{x:0,y:0,z:0})
        window.addEventListener("click", () => this.swing());

        camera.append(this.obj)
    }

    playAnim(clipName, loopType) {
        this.obj.removeAttribute("animation-mixer");
        
        this.obj.setAttribute("animation-mixer", {
            clip: clipName,
            loop: loopType,
            clampWhenFinished: true
        });
    }

    swing() {
        if (this.cooldown) return;
        this.cooldown = true;
        
        this.playAnim('swing', 'once');

        setTimeout(() => {
            this.cooldown = false;
        }, 600); 
    }
}