'use strict';

let clicksNumber=0;
let votes = [];
let views = [];
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
  if (clicksNumber <=25){
    let leftIndex=randomNumber(0,names.length-1);
    leftImage.src = Item.all[leftIndex].path;
    leftImage.alt = Item.all[leftIndex].name;
    leftImage.title = Item.all[leftIndex].name;
    Item.all[leftIndex].views++;

    let centerIndex=randomNumber(0,names.length-1);
    if (centerIndex === leftIndex || centerIndex === leftIndex){
      centerIndex=randomNumber(0,names.length-1);
    }
    centerImage.src = Item.all[centerIndex].path;
    centerImage.alt = Item.all[centerIndex].name;
    centerImage.title = Item.all[centerIndex].name;
    Item.all[centerIndex].views++;

    let rightIndex= randomNumber(0,names.length-1);
    if (rightIndex === centerIndex || rightIndex === leftIndex){
      rightIndex= randomNumber(0,names.length-1);
    }
    rightImage.src = Item.all[rightIndex].path;
    rightImage.alt = Item.all[rightIndex].name;
    rightImage.title = Item.all[rightIndex].name;
    Item.all[rightIndex].views++;
  }
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

imagesSection.addEventListener('click',handelClick);
function handelClick(event){
  event.preventDefault();
  if(event.target.id !== 'images-section'){
    for(let i=0; i<Item.all.length; i++){
      if(Item.all[i].name === event.target.title && clicksNumber <= 25){
        Item.all[i].votes++;
        clicksNumber=clicksNumber+1;
        if (clicksNumber ===25){
          resultButton();
          reset();
        }

      }
    }
  }
  render();
}

console.log(Item.all);

render();


const result =document.getElementById('result');


function resultButton(){
  const button = document.createElement('button');
  result.appendChild(button);
  button.textContent='VIEW RESULTS';
  button.addEventListener ('click', function() {
    const ul = document.createElement('ul');
    result.appendChild(ul);
    for(let i=0; i<names.length; i++){
      votes.push(Item.all[i].votes);
      views.push(Item.all[i].views);

      // const li = document.createElement('li');
      // ul.appendChild(li);
      // li.textContent= `${Item.all[i].name} had ${Item.all[i].votes} votes, and was seen ${Item.all[i].views} times.`;
    }
    console.log(votes);
    console.log(views);
    chartDisplay();


  });
}

function reset(){
  const button2 = document.createElement('button');
  result.appendChild(button2);
  button2.textContent='RESET';
  button2.addEventListener ('click', function() {
    window.location.reload('Refresh');
  });
}


function chartDisplay() {
  let ctx = document.getElementById('myChart').getContext('2d');
  // eslint-disable-next-line no-undef
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: names,
      datasets: [{
        label: '# of Votes',
        data: votes,
        backgroundColor: '#1F8AC0',
        borderColor: 'black',
      },
      {
        label: '# of Views',
        data: views,
        backgroundColor: '#EFC9AF',
        borderColor: 'black',

      }]
    },

  });

}
