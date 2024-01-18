document.addEventListener("keydown", toggleOnOff);
const power = document.querySelector('.power');
power.addEventListener('click', toggleOnOff);

let onOff = false;

function toggleOnOff(e) {
    console.log('hi')
    if (e.key === "p" || e.target.innerText === 'Pow') {
        onOff ? onOff = false : onOff = true;
        if (onOff == true) {
            activate();
        } else {
            console.log('hi')
            deactivate();
        }
    }
    
};

function activate() {
    document
    .querySelectorAll('.buttons-grid')
    .addEventListener('click', function(e) {
        
    })
};

// function handleClick(e) {
//     console.log(e.target.value);
// }
