let rnd = (l,u) => Math.random() * (u-l) + l
let scene, pickaxe, rocks=[], camera;
let rock_amount = 0,rock_text;

window.addEventListener("DOMContentLoaded",function() {
    scene = document.querySelector("a-scene");
    camera = document.querySelector("#maincamera");
    rock_text = document.getElementById("rock_text");
    pickaxe = new Pickaxe();

    for(let i=0;i<25; i++){
      let a = rnd(-25,25);
      let b = rnd(-25,25);
      let r = new Rock(a,1,b,100);
      rocks.push(r);
    }

  loop();
})

function loop(){
  rock_text.setAttribute("value",`Rocks: ${rock_amount}`); 
  for(let rock of rocks){
    rock.dug();
    rock.faceCamera();
  }

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