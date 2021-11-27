let divs = [];
const container = document.querySelector('.container');

//generate random number between min and max
const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));

function create(dimension){
    for (i = 0; i < dimension**2; i++)
    {
        container.style.gridTemplateColumns= `repeat(${dimension}, 1fr)`;
        
        divs[i] = document.createElement('div');

        //generate random rgb color
        const r = randomBetween(0, 255);
        const g = randomBetween(0, 255);
        const b = randomBetween(0, 255);
        
        divs[i].addEventListener('mouseover', (e) => e.target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`);
        container.appendChild(divs[i]);
    }
}
create(16);


function clear(){
    let dimension = 0;
    let boxes = document.querySelectorAll('.container div');
    boxes.forEach( box => box.remove());
    do {
    dimension = parseInt(prompt("Please enter squares' number per side (max 100) ", "16"));
    } while (dimension < 1 || dimension > 100)
    create(dimension);
}

const button = document.querySelector('button');
button.addEventListener('click', clear);

