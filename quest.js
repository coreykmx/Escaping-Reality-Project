class QuestGiver {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        
        this.currentQuest = null;
        this.generateNewQuest();

        this.obj = document.createElement("a-gltf-model");
        this.obj.setAttribute("scale", { x: 0.5, y: 0.5, z: 0.5 });
        this.obj.setAttribute("rotation", { x: 0, y: 90, z: 0 });
        this.obj.setAttribute("position", { x: this.x, y: this.y, z: this.z});
        this.obj.setAttribute("src", "#quest");
        this.obj.setAttribute("static-body","shape: box");
        let img = document.createElement("a-plane");
        img.setAttribute("src","quest.jpg");
        img.setAttribute("scale",{x:2.5,y:2.5,z:2.5})
        img.setAttribute("rotation",{x:0,y:90,z:0})
        img.setAttribute("position",{x:0.5,y:7.1,z:0})
        this.obj.append(img);  

        this.menu = document.createElement("div");
        this.menu.id = "questMenu";
        this.menu.style.display = "none";
        document.body.append(this.menu);

        window.addEventListener("keydown", (e) => {
            if (e.key.toLowerCase() === "e" && distance(camera, this.obj) < 4) {
                if (inventory) inventory.menu.style.display = "none";
                this.updateMenuUI();
                this.menu.style.display = "block";
            }
        });

        scene.append(this.obj);
    }

    generateNewQuest() {
        let types = ["rock", "copper"];
        this.type = types[Math.floor(Math.random() * types.length)];
        this.amountNeeded = Math.floor(rnd(5,15)); 

    }

    updateMenuUI() {
        this.menu.innerHTML = `
            <h2>Quest</h2>
            <p>I need <b>${this.amountNeeded} ${this.type}</b>.</p>
            <button id="completeQuestBtn">Hand Over Items</button>
            <button id="closeQuestBtn">Close</button>
        `;

        document.getElementById("closeQuestBtn").onclick = () => {
            this.menu.style.display = "none";
        };

        document.getElementById("completeQuestBtn").onclick = () => {
            this.checkCompletion();
        };
    }

    checkCompletion() {
        let msg = document.getElementById("questMessage");
        let playerAmount;

        if (this.type === "rock") {
            playerAmount = rock_amount;
        } else {
            playerAmount = copper_amount;
        }

        if (playerAmount >= this.amountNeeded) {
            if (this.type === "rock") {
                rock_amount -= this.amountNeeded;
                money += 150 * this.amountNeeded;
            } else if (this.type === "copper") {
                copper_amount -= this.amountNeeded;
                money += 300 * this.amountNeeded;
            }

            this.menu.style.display = "none";
            msg.innerHTML = "Quest Complete!";
            msg.style.display = "block";
            setTimeout(() => msg.style.display = "none", 3000);

            setTimeout(() => this.generateNewQuest(), 5000);
            this.updateMenuUI(); 
        
        } else if(playerAmount < this.amountNeeded){
            this.menu.style.display = "none";
            msg.innerHTML = `You need ${this.amountNeeded - playerAmount} more ${this.type}!`;
            msg.style.display = "block";
            setTimeout(() => msg.style.display = "none", 3000);
        }
        
    }
}