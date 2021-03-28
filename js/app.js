'use strict';

const names = ['bag','banana','bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','usb','water-can','wine-glass',];

function Item(name) {
  this.name = name;
  this.path = `./assets/${name}.jpg`;
  this.votes = 0;
  this.views = 0;
  Item.all.push(this);
}
Item.all = [];

for(let i =0;i<names.length;i++){
  new Item(names[i]);
}

const leftImage = document.getElementById('left-image');
const centerImage = document.getElementById('center-image');
const rightImage = document.getElementById('right-image');
const imagesSection = document.getElementById('images-section');


function render(){
  let leftIndex=randomNumber(0,Item.all.length-1);
  leftImage.src = Item.all[leftIndex].path;
  leftImage.alt = Item.all[leftIndex].name;
  leftImage.title = Item.all[leftIndex].name;
  Item.all[leftIndex].views++;

  let centerIndex=leftIndex-1;
  if(centerIndex<0){
    centerIndex=centerIndex+2;
  }
  centerImage.src = Item.all[centerIndex].path;
  centerImage.alt = Item.all[centerIndex].name;
  centerImage.title = Item.all[centerIndex].name;
  Item.all[centerIndex].views++;

  let rightIndex=centerIndex-1;
  if(rightIndex === 0 || rightIndex < 0){
    rightIndex=rightIndex+3;
  }

  rightImage.src = Item.all[rightIndex].path;
  rightImage.alt = Item.all[rightIndex].name;
  rightImage.title = Item.all[rightIndex].name;
  Item.all[rightIndex].views++;

}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


imagesSection.addEventListener('click',handelClick);
function handelClick(event){
  event.preventDefault();
  if(event.target.id !== 'images-section'){
    for(let i=0; i<Item.all.length; i++){
      if(Item.all[i].name === event.target.title){
        Item.all[i].votes++;
      }

    }
  }
  render();
}

console.log(Item.all);

render();


const result =document.getElementById('result');
const list =document.getElementById('list');
// console.log(result);
// console.log(list);
result.addEventListener('click',function(){
  for(let i=0; i<Item.all.length;i++){
    list.textContent= `${Item.all[i].name} had ${Item.all[i].votes} votes, and was seen ${Item.all[i].views} times.`;
  }
});


