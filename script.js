let rnd = (l,u) => Math.random() * (u-l) + l
let scene, pickaxe, camera;
let pickaxe_power = 25;
let rocks=[], rock_amount = 0, rock_text;
let coppers=[], copper_amount = 0, copper_text;
let stone = false, copper = false, iron = false, diamond = false;
let owned_stone = false, owned_copper = false, owned_iron = false, owned_diamond = false;
let money = 0, money_text;  
let sellzone, shop, inventory;
let cooldown = false;

window.addEventListener("DOMContentLoaded",function() {
    scene = document.querySelector("a-scene");
    camera = document.querySelector("#maincamera");
    money_text = document.getElementById("money_bg");
    sellzone = new SellZone(0,1,-5);
    shop = new Shop(0,1,5);
    inventory = new Inventory();

    // Rocks
    for(let i=0;i<25; i++){
      let a = rnd(-25,25);
      let b = rnd(-25,25);
      let r = new Rock(a,1,b,100);
      rocks.push(r);
    } 

    // Copper
    for(let i=0;i<25; i++){
      let a = rnd(-25,25);
      let b = rnd(-25,25);
      let c = new Copper(a,1,b,200);
      coppers.push(c);
    }

  window.addEventListener("keydown", function(e){
    if(e.key.toLowerCase() == "shift"){
      camera.setAttribute("wasd-controls", {acceleration: 25});
    }
  });
  window.addEventListener("keyup", function(e){
    if(e.key.toLowerCase() == "shift"){
      camera.setAttribute('wasd-controls', {acceleration: 15});
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
  if(distance(shop.obj,camera)>5){
    shop.menu.style.display = "none";
  }

  money_text.textContent = `Money: $${money}`;
  sellzone.sellItems();
  shop.updateMenuStyles();
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

