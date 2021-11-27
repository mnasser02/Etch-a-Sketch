const grid = document.querySelector('.container');
var dimension = 16;
let currentMode = "rainbow";
initial(dimension);

//intialize with 16x16 grid
function initial(dimension){
    grid.style.gridTemplateColumns= `repeat(${dimension}, 1fr)`;
    grid.style.gridTemplateRows= `repeat(${dimension}, 1fr)`;
    for (let i = 0; i < dimension**2; i++)
    {    
        divs = document.createElement('div');
        grid.appendChild(divs);
    }
}

//generate random number between min and max
function randomBetween(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

//set all boxes to white
function clear(){
    let boxes = document.querySelectorAll('.container div');
    boxes.forEach( box => box.style.backgroundColor = "white");
 }

//used later for dispatching events manually
const clickEvent = new Event('click');
const inputEvent = new Event('input');

const buttonClear = document.querySelector('.clear');
buttonClear.addEventListener('click', clear);

const buttonColor = document.querySelector('.color');
buttonColor.addEventListener('input', color);

const rainbow = document.querySelector('.rainbow');
rainbow.addEventListener('click', createRainbow);

const eraser = document.querySelector('.eraser');
eraser.addEventListener('click', erase);

const sizeSlider = document.querySelector('.sizeSlider');
sizeSlider.addEventListener('input', size);


function color(color){
    currentMode = "color";

    let boxes = document.querySelectorAll('.container div');
    boxes.forEach( box => box.addEventListener('mouseover', e => e.target.style.backgroundColor = `${color.target.value}`));
}

function createRainbow(){
    currentMode = "rainbow";

        let boxes = document.querySelectorAll('.container div');
        boxes.forEach( box => {

            //generate random rgb color each event
            const r = randomBetween(0, 255);
            const g = randomBetween(0, 255);
            const b = randomBetween(0, 255);
            box.addEventListener('mouseover', e => e.target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`)
        });
}

function erase(){
    currentMode = "erase";
    let boxes = document.querySelectorAll('.container div');
    boxes.forEach( box => box.addEventListener('mouseover', e => e.target.style.backgroundColor = 'white'));
}

function size(e){
    dimension = e.target.value;

    //remove all boxes
    grid.innerHTML='';  
    grid.style.gridTemplateColumns= `repeat(${dimension}, 1fr)`;
    grid.style.gridTemplateRows= `repeat(${dimension}, 1fr)`;

    //add desired boxes
    for (let i = 0; i < dimension * dimension; i++)
    {
        const divs = document.createElement('div');
        grid.appendChild(divs);
    }

    const sizeValue = document.getElementById('sizeValue');
    sizeValue.innerHTML = `${dimension} x ${dimension}`;

    //resume previous coloring option
    if (currentMode == "color")
        buttonColor.dispatchEvent(inputEvent);
    else if (currentMode == "rainbow")
        rainbow.dispatchEvent(clickEvent);
    else
        eraser.dispatchEvent(clickEvent);

 }   


  