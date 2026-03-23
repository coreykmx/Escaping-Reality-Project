let rnd = (l,u) => Math.random() * (u-l) + l
let scene, pickaxe, camera;
let pickaxe_power = 25;
let rocks=[], rock_amount = 0, rock_text;
let coppers=[], copper_amount = 0, copper_text;
let irons=[], iron_amount = 0, iron_text;
let stone = false, copper = false, iron = false, diamond = false;
let owned_stone = false, owned_copper = false, owned_iron = false, owned_diamond = false;
let money = 0, money_text;  
let sellzone, shop, inventory, quest;
let cooldown = false;

window.addEventListener("DOMContentLoaded",function() {
    scene = document.querySelector("a-scene");
    camera = document.querySelector("#maincamera");
    money_text = document.getElementById("money_bg");
    sellzone = new SellZone(-10,0,30);
    shop = new Shop(0,0,30);
    inventory = new Inventory();
    quest = new QuestGiver(10,0,30);   

    for (let i = 0; i < 25; i++) {
      let x = rnd(-25,25)
      let z = rnd(-25,25)
      let r = new Rock(x, 0, z, 100)
      rocks.push(r)
    }

   for (let i = 0; i < 25; i++) {
      let x = rnd(-25,25)
      let z = rnd(-25,25)
      let c = new Copper(x, 0, z, 200)
      coppers.push(c)
    }

    for (let i = 0; i < 25; i++) {
      let x = rnd(-25,25)
      let z = rnd(-25,25)
      let i = new Iron(x, 0, z, 500)
      irons.push(i)
    }

  window.addEventListener("keydown", function(e){
    if(e.key.toLowerCase() == "shift" && player){
      player.setAttribute("movement-controls", "speed: 24; fly: false; constrainToNavMesh: false");
    }
  });
  window.addEventListener("keyup", function(e){
    if(e.key.toLowerCase() == "shift" && player){
      player.setAttribute('movement-controls', 'speed: 12; fly: false; constrainToNavMesh: false');
    }
  });

  loop();
})

function loop(){
  for(let rock of rocks){
    rock.dug();
    rock.faceCamera();
  }
  for(let copper of coppers){
    copper.dug();
    copper.faceCamera();
  }
  for(let iron of irons){
    iron.dug();
    iron.faceCamera();
  }
  if(distance(shop.obj,camera)>5){
    shop.menu.style.display = "none";
  }

  money_text.textContent = `Money: $${money}`;
  sellzone.sellItems();
  shop.updateMenuStyles();
  inventory.updateMenu()
  window.requestAnimationFrame( loop );
}

function distance(obj1,obj2){
  let x1 = obj1.object3D.position.x;
  let y1 = obj1.object3D.position.y;
  let z1 = obj1.object3D.position.z;
  let x2 = obj2.object3D.position.x;
  let y2 = obj2.object3D.position.y;
  let z2 = obj2.object3D.position.z;

  let d = Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2) + Math.pow(z1-z2,2));
  return d;
}

