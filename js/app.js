'use stricts';

let clicksNumber=0;
let votes = [];
let views = [];
let indexes =[];

const names = ['bag','banana','bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','usb','water-can','wine-glass',];

function Item (name){
  this.name= name;
  this.path=`./assets/${name}.jpg`;
  this.votes=0;
  this.views=0;
  Item.all.push(this);
}
Item.all=[];

getItems();

for (let i=0; i<names.length;i++){
  new Item(names[i]);
}

// console.log(Item.all);

let leftImage=document.getElementById('left-image');
let centerImage=document.getElementById('center-image');
let rightImage=document.getElementById('right-image');

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function render(){
  let leftIndex=randomNumber(0,names.length-1);
  let centerIndex=randomNumber(0,names.length-1);
  let rightIndex=randomNumber(0,names.length-1);

  if (leftIndex !== centerIndex && leftIndex !== rightIndex && centerIndex !== rightIndex){

    if (indexes.includes(leftIndex) || indexes.includes(centerIndex) || indexes.includes(rightIndex)){
      render();
    }
    else{
      indexes =[];
      indexes.push(leftIndex);
      indexes.push(centerIndex);
      indexes.push(rightIndex);
      console.log(indexes);

      if (clicksNumber <= 25){
        leftImage.src=Item.all[leftIndex].path;
        leftImage.alt=Item.all[leftIndex].name;
        leftImage.title=Item.all[leftIndex].name;
        Item.all[leftIndex].views++;

        centerImage.src=Item.all[centerIndex].path;
        centerImage.alt=Item.all[centerIndex].name;
        centerImage.title=Item.all[centerIndex].name;
        Item.all[centerIndex].views++;


        rightImage.src=Item.all[rightIndex].path;
        rightImage.alt=Item.all[rightIndex].name;
        rightImage.title=Item.all[rightIndex].name;
        Item.all[rightIndex].views++;
      }
    }
  }
  else{
    render();
  }
}

render();




let section=document.getElementById('images-section');

section =document.addEventListener('click',afterClicking);
function afterClicking(event){
//   console.log(event.target.id);
  if (event.target.id !== 'images-section'){
    for (let i=0;i<Item.all.length;i++){
      if(Item.all[i].name === event.target.title && clicksNumber<=25){
        Item.all[i].votes++;
        clicksNumber=clicksNumber+1;
        if (clicksNumber===25) {
          showResult();
          reset();
        }
      }
    } render();
  }
  setItems();
}


const result = document.getElementById('result');

function showResult() {
  const button = document.createElement('button');
  result.appendChild(button);
  button.textContent='SHOW RESULT';
  button.addEventListener('click', buttonSittings);
  function buttonSittings(){
    const ulEl = document.createElement('ul');
    result.appendChild(ulEl);
    for (let i=0; i<names.length; i++){
      votes.push(Item.all[i].votes);
      views.push(Item.all[i].views);
      const liEl = document.createElement('li');
      ulEl.appendChild(liEl);
      liEl.textContent= `${Item.all[i].name} had ${Item.all[i].votes} votes, and was seen ${Item.all[i].views} times.`;
    }
    chartDisplay();
  }
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


function setItems(){
  let Items =JSON.stringify(Item.all);
  localStorage.setItem('photos',photosItems);
}


function getItems(){
  let product = localStorage.getItem('photos');
  if(product) {
    Item.all = JSON.parse(product);
  }
}