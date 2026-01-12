let rnd = (l,u) => Math.random() * (u-l) + l
let scene, pickaxe, rock;

window.addEventListener("DOMContentLoaded",function() {
    scene = document.querySelector("a-scene");
    pickaxe = new Pickaxe();
    rock = new Rock(0, 1, 0);
    rock.mined()
})
window.addEventListener("keydown",function(e){
  if(e.key == " " && distance(pickaxe.obj,rock.obj)<3){
    rock.mined = true;
  }
    
})
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