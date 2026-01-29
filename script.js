let rnd = (l,u) => Math.random() * (u-l) + l
let scene, pickaxe, camera;
let pickaxe_power = 25;
let rocks=[], rock_amount = 0, rock_text;
let coppers=[], copper_amount = 0, copper_text;
let stone = false, iron = false;
let money = 0, money_text;  
let sellzone;

window.addEventListener("DOMContentLoaded",function() {
    scene = document.querySelector("a-scene");
    camera = document.querySelector("#maincamera");
    rock_text = document.getElementById("rock_text");
    copper_text = document.getElementById("copper_text");
    money_text = document.getElementById("money_text");
    pickaxe = new StonePickaxe(pickaxe_power);
    sellzone = new SellZone(0,1,-5);

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

  loop();
})

function loop(){
  rock_text.setAttribute("value",`Rocks: ${rock_amount}`); 
  for(let rock of rocks){
    rock.dug();
    rock.faceCamera();
  }
  copper_text.setAttribute("value",`Copper: ${copper_amount}`); 
  for(let copper of coppers){
    copper.dug();
    copper.faceCamera();
  }

  if(money>=100 && !(iron)){
    pickaxe_power = 100;
    money -= 100;
    
    pickaxe = new IronPickaxe(pickaxe_power)
    iron = true;
  }


  money_text.setAttribute("value",`Money: $${money}`);
  sellzone.sellItems();

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

