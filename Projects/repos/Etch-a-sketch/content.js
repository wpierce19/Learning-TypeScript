
const screen = document.querySelector(".container");

function makeGrids(size){
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');

    for (let i=0;i<size;i++){
        const row = document.createElement('div');
        row.classList.add('grid-row');

        for (let j = 0;j< size; j++){
            const widthAndHeight = 960 / size;
            const gridBox = document.createElement('div');
            gridBox.classList.add('grid-box');
            gridBox.style.width = '${widthAndHeight}px';
            gridBox.style.height = '${widthAndHeight}px';
            gridBox.addEventListener("mouseover", () => {
                gridBox.style.backgroundColor = "black";
            });
            row.appendChild(gridBox);
        }

        wrapper.appendChild(row);
    }
    screen.appendChild(wrapper);
}

makeGrids(16);


const btn = document.querySelector(".btn-size");
btn.addEventListener("click", () => {
    console.log("Button received.");
    let userChoice = Number(prompt("Please enter how many boxes per side: "));
    if (userChoice < 100){
        const wrapper = document.querySelector('.wrapper');
        wrapper.remove();
        makeGrids(userChoice);
    }
    else{
        alert("Number too large.");
    }
});