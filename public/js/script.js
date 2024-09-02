import './style.css'

const wrapper = document.querySelector('#wrapper');
const carImage = document.querySelector('#carImage');

// 과거에 돌린 정도
let save = 0;
// 이번에 돌린 정도
let dragged = 0;
// 합계(save + drag)
let sum = 0;

const sensitivity = 40;

let clickedSrc = "";
let changeSrc = "";

carImage.addEventListener('mousedown', function(e){
    const x = e.clientX;

    clickedSrc = carImage.src;

    wrapper.addEventListener("mousemove", rotate);

    function rotate(e) {
        dragged = parseInt((e.clientX - x) / sensitivity);

        sum = save + dragged;

        if (sum < 1) {
            sum = 52 + (sum % 52);
        } else if (sum > 52) {
            sum = sum % 52;
        }

        changeSrc = clickedSrc.replace(/toy-\d+/, `toy-${sum}`);
        console.log(changeSrc);

        carImage.src = changeSrc;

        wrapper.style.cursor = "grabbing";
    }

    window.addEventListener("mouseup", function() {
        wrapper.removeEventListener("mousemove", rotate);

        wrapper.style.cursor = "default";

        save = sum;
        dragged = 0;
    });

});
