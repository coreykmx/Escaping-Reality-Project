class Shop{
    constructor(x,y,z){
        this.x = x;
        this.y = y;
        this.z = z;
        this.sell = false;

        this.obj = document.createElement("a-box");
        this.obj.setAttribute("scale",{x:2,y:1,z:2})
        this.obj.setAttribute("color","orange");

        this.menu = document.createElement("div");
        this.menu.id = "shopMenu";
        this.menu.innerHTML = `
            <h2>Pickaxes</h2>
            <button class="pickbutton" id="stoneBtn">Stone Pickaxe - Free</button><br><br>
            <button class="pickbutton" id="copperBtn">Copper Pickaxe - $50</button><br><br>
            <button class="pickbutton" id="ironBtn">Iron Pickaxe - $100</button><br><br>
            <button class="pickbutton" id="diamondBtn">Diamond Pickaxe - $1000</button><br><br>
            <button id="closeBtn">Close</button>
        `;
        document.body.append(this.menu);

        this.poor = document.getElementById("poor");

        this.updateMenuStyles();

        let that = this;
        document.getElementById("stoneBtn").addEventListener("click", function() {
            if(!owned_stone){
                pickaxe_power = 25;
                pickaxe = new StonePickaxe(pickaxe_power);
                owned_stone = true;
                stone = true;
                iron = false;
                copper = false;
                diamond = false;
            }
            that.menu.style.display = "none";
        });
        document.getElementById("copperBtn").addEventListener("click", function() {
            if(money >= 50 && !owned_copper){
                pickaxe_power = 50;
                money -= 50;
                pickaxe = new CopperPickaxe(pickaxe_power);
                owned_copper = true;
                copper = true;
                stone = false;
                iron = false;
                diamond = false;
                that.menu.style.display = "none";
            }else{
                that.menu.style.display = "none";
                that.poor.style.display = "block";
                setTimeout(() => { that.poor.style.display = "none"; }, 3000);
            }
        });
        document.getElementById("ironBtn").addEventListener("click", function() {
            if(money >= 100 && !owned_iron){
                pickaxe_power = 100;
                money -= 100;
                pickaxe = new IronPickaxe(pickaxe_power);
                owned_iron = true;
                iron = true;
                stone = false;
                copper = false;
                diamond = false;
                that.menu.style.display = "none";
            }else{
                that.menu.style.display = "none";
                that.poor.style.display = "block";
                setTimeout(() => { that.poor.style.display = "none"; }, 1000);
            }
        });
        document.getElementById("diamondBtn").addEventListener("click", function() {
            if(money >= 1000 && !owned_diamond){
                pickaxe_power = 200;
                money -= 1000;
                pickaxe = new DiamondPickaxe(pickaxe_power);
                owned_diamond = true;
                diamond = true;
                stone = false;
                copper = false;
                iron = false;
                that.menu.style.display = "none";
            }else{
                that.menu.style.display = "none";
                that.poor.style.display = "block";
                setTimeout(() => { that.poor.style.display = "none"; }, 1000);
            }
        });
        document.getElementById("closeBtn").addEventListener("click", function() {
            that.menu.style.display = "none";
        });

        let that2 = this;
        window.addEventListener("keydown", function(e) {
            if(e.key.toLowerCase() == "e" && distance(camera, that2.obj) < 4 && that2.poor.style.display !== "block"){
                if (inventory) inventory.menu.style.display = "none";
                that2.updateMenuStyles();
                that2.menu.style.display = "block";
            }
        });

        this.obj.setAttribute("position",{x:this.x,y:this.y,z:this.z})
        scene.append(this.obj)
    }

    updateMenuStyles() {
        let stoneBtn = document.getElementById("stoneBtn");
        let ironBtn = document.getElementById("ironBtn");
        let closeBtn = document.getElementById("closeBtn");

        if (owned_stone) {
            stoneBtn.disabled = true;
            stoneBtn.style.background = "#555";
            stoneBtn.style.color = "#999";
            stoneBtn.style.cursor = "not-allowed";
            stoneBtn.textContent = "Stone Pickaxe - Owned";
        } else {
            stoneBtn.disabled = false;
            stoneBtn.style.background = "#32CD32";
            stoneBtn.style.color = "white";
            stoneBtn.style.cursor = "pointer";
            stoneBtn.textContent = "Stone Pickaxe - Free";
        }
        if (owned_copper) {
            copperBtn.disabled = true;
            copperBtn.style.background = "#555";
            copperBtn.style.color = "#999";
            copperBtn.style.cursor = "not-allowed";
            copperBtn.textContent = "Copper Pickaxe - Owned";
        } else {
            copperBtn.disabled = false;
            copperBtn.style.background = "#32CD32";
            copperBtn.style.color = "white";
            copperBtn.style.cursor = "pointer";
            copperBtn.textContent = "Copper Pickaxe - $50";
        }
        if (owned_iron) {
            ironBtn.disabled = true;
            ironBtn.style.background = "#555";
            ironBtn.style.color = "#999";
            ironBtn.style.cursor = "not-allowed";
            ironBtn.textContent = "Iron Pickaxe - Owned";
        } else {
            ironBtn.disabled = false;
            ironBtn.style.background = "#32CD32";
            ironBtn.style.color = "white";
            ironBtn.style.cursor = "pointer";
            ironBtn.textContent = "Iron Pickaxe - $100";
        }
        if (owned_diamond) {
            diamondBtn.disabled = true;
            diamondBtn.style.background = "#555";
            diamondBtn.style.color = "#999";
            diamondBtn.style.cursor = "not-allowed";
            diamondBtn.textContent = "Diamond Pickaxe - Owned";
        } else {
            diamondBtn.disabled = false;
            diamondBtn.style.background = "#32CD32";
            diamondBtn.style.color = "white";
            diamondBtn.style.cursor = "pointer";
            diamondBtn.textContent = "Diamond Pickaxe - $1000";
        }
    }

}

