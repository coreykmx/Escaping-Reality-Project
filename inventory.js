class Inventory {
    constructor() {
        this.menu = document.createElement("div");
        this.menu.id = "inventoryMenu";
        this.menu.innerHTML = `
            <h2>Inventory</h2>
            <div style="display: flex; gap: 40px; flex: 1; overflow: hidden;">
                <div id="resourcesSection">
                    <h3>Rocks</h3>
                    <div id="rockDisplay">Rocks: 0</div>
                    <div id="copperDisplay">Copper: 0</div>
                    <div id="ironDisplay">Iron: 0</div>
                </div>
                <div id="pickaxesSection">
                    <h3>Pickaxes</h3>
                    <div id="pickaxeEquipped">Equipped: None</div>
                    <div id="pickaxes"></div>
                </div>
            </div>
            <button id="closeInventoryBtn">Close</button>
        `;
        document.body.append(this.menu);

        let that = this;
        document.getElementById("closeInventoryBtn").addEventListener("click", function() {
            that.menu.style.display = "none";
        });

        window.addEventListener("keydown", function(e) {
            if(e.key.toLowerCase() == "tab"){
                e.preventDefault();
                if (shop){
                    shop.menu.style.display = "none";
                }
                that.updateMenu();
                if(that.menu.style.display == "block"){
                    that.menu.style.display = "none";
                }else{
                    that.menu.style.display = "block";
                }
            }
        });
    }

    updateMenu() {
        document.getElementById("rockDisplay").textContent = `Rocks: ${rock_amount}`;
        document.getElementById("copperDisplay").textContent = `Copper: ${copper_amount}`;
        document.getElementById("ironDisplay").textContent = `Iron: ${iron_amount}`;

        let equipped = "None";
        if (stone) equipped = "Stone";
        else if (copper) equipped = "Copper";
        else if (iron) equipped = "Iron";
        else if (diamond) equipped = "Diamond";

        document.getElementById("pickaxeEquipped").textContent = `Equipped: ${equipped}`;

        let pickaxesDiv = document.getElementById("pickaxes");
        pickaxesDiv.innerHTML = "";

        if (owned_stone) {
            let btn = document.createElement("button");
            btn.textContent = stone ? "Stone Pickaxe (Equipped)" : "Equip Stone Pickaxe";
            btn.disabled = stone;
            btn.addEventListener("click", () => {
                pickaxe_power = 25;
                pickaxe = new StonePickaxe(pickaxe_power);
                stone = true;
                iron = false;
                copper = false;
                diamond = false;
                this.menu.style.display = "none";
            });
            pickaxesDiv.append(btn);
            pickaxesDiv.append(document.createElement("br"));
            pickaxesDiv.append(document.createElement("br"));
        }
        if (owned_copper) {
            let btn = document.createElement("button");
            btn.textContent = copper ? "Copper Pickaxe (Equipped)" : "Equip Copper Pickaxe";
            btn.disabled = copper;
            btn.addEventListener("click", () => {
                pickaxe_power = 50;
                pickaxe = new CopperPickaxe(pickaxe_power);
                copper = true;
                stone = false;
                iron = false;
                diamond = false;
                this.menu.style.display = "none";
            });
            pickaxesDiv.append(btn);
            pickaxesDiv.append(document.createElement("br"));
            pickaxesDiv.append(document.createElement("br"));
        }
        if (owned_iron) {
            let btn = document.createElement("button");
            btn.textContent = iron ? "Iron Pickaxe (Equipped)" : "Equip Iron Pickaxe";
            btn.disabled = iron;
            btn.addEventListener("click", () => {
                pickaxe_power = 100;
                pickaxe = new IronPickaxe(pickaxe_power);
                iron = true;
                stone = false;
                copper = false;
                diamond = false;
                this.menu.style.display = "none";
            });
            pickaxesDiv.append(btn);
            pickaxesDiv.append(document.createElement("br"));
            pickaxesDiv.append(document.createElement("br"));
        }
        if (owned_diamond) {
            let btn = document.createElement("button");
            btn.textContent = diamond ? "Diamond Pickaxe (Equipped)" : "Equip Diamond Pickaxe";
            btn.disabled = diamond;
            btn.addEventListener("click", () => {
                pickaxe_power = 200;
                pickaxe = new DiamondPickaxe(pickaxe_power);
                diamond = true;
                stone = false;
                copper = false;
                iron = false;
                this.menu.style.display = "none";
            });
            pickaxesDiv.append(btn);
            pickaxesDiv.append(document.createElement("br"));
            pickaxesDiv.append(document.createElement("br"));
        }
    }
}