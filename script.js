

const giftBtn = document.getElementById("giftBtn");

const messageSection = document.getElementById("messageSection");

const gallery = document.querySelector(".gallery");

const finalSection = document.querySelector(".final");

const surpriseBtn = document.getElementById("surpriseBtn");

const popup = document.querySelector(".popup");

const heartsContainer = document.querySelector(".hearts");



// فتحالهدية

giftBtn.addEventListener("click", () => {


messageSection.classList.remove("hidden");


setTimeout(() => {

gallery.classList.remove("hidden");

    }, 1500);



setTimeout(() => {

finalSection.classList.remove("hidden");

    }, 3000);



createHearts();


});




// إنشاءالقلوب

function createHearts(){


setInterval(()=>{


const heart = document.createElement("div");


heart.innerHTML = "❤️";


heart.style.position = "fixed";

heart.style.left = Math.random()*100 + "vw";

heart.style.bottom = "-20px";

heart.style.fontSize =
Math.random()*25 + 15 + "px";


heart.style.animation =
        "float 5s linear";


heartsContainer.appendChild(heart);



setTimeout(()=>{

heart.remove();

        },5000);



    },300);


}




// إضافةحركةالقلوب

const style = document.createElement("style");


style.innerHTML = `


@keyframes float {


from {

transform:translateY(0)
rotate(0deg);

opacity:1;

}


to {


transform:translateY(-110vh)
rotate(360deg);

opacity:0;


}


}


`;

document.head.appendChild(style);




// الصورتتغير

const images = [

"images/photo1.jpg",

"images/photo2.jpg",

"images/photo3.jpg"

];


let index = 0;


setInterval(()=>{


const slider = document.getElementById("slider");


if(slider){


index++;


if(index >= images.length){

index=0;

}


slider.src = images[index];


}



},3000);






// المفاجأةالأخيرة


surpriseBtn.addEventListener("click",()=>{

finalSection.classList.add("hidden");

popup.classList.remove("hidden");


createConfetti();


});




// كونفيتي

function createConfetti(){


for(let i=0;i<80;i++){


const confetti =
document.createElement("div");


confetti.innerHTML="🎉";


confetti.style.position="fixed";


confetti.style.left=
Math.random()*100+"vw";


confetti.style.top="-20px";


confetti.style.fontSize=
Math.random()*25+15+"px";


confetti.style.animation=
"fall 4s linear";


document.body.appendChild(confetti);



setTimeout(()=>{


confetti.remove();


},4000);



}


}



const confettiStyle =
document.createElement("style");


confettiStyle.innerHTML=`


@keyframes fall{


from{

transform:translateY(0)
rotate(0deg);

}


to{


transform:translateY(110vh)
rotate(720deg);


}


}


`;


document.head.appendChild(confettiStyle);




const nameText = "Your Beautiful Name❤️";

const typingName = document.getElementById("typingName");

let charIndex = 0;


function typingEffect(){

if(charIndex<nameText.length){

typingName.innerHTML += nameText.charAt(charIndex);

charIndex++;

setTimeout(typingEffect,120);

    }

}


typingEffect();




const canvas = document.getElementById("fireworks");

const ctx = canvas.getContext("2d");


canvas.width = window.innerWidth;

canvas.height = window.innerHeight;



window.addEventListener("resize",()=>{

canvas.width = window.innerWidth;

canvas.height = window.innerHeight;

});



let particles = [];



function createFirework(){


const x = Math.random()*canvas.width;

const y = Math.random()*canvas.height/2;


for(let i=0;i<50;i++){


particles.push({

x:x,

y:y,

dx:(Math.random()-0.5)*8,

dy:(Math.random()-0.5)*8,

life:100

        });


    }


}



function animateFireworks() {


ctx.clearRect(0,0,canvas.width,canvas.height);



particles.forEach((p,index)=>{


p.x += p.dx;

p.y += p.dy;

p.life--;


ctx.beginPath();

ctx.arc(p.x,p.y,3,0,Math.PI*2);

ctx.fillStyle="white";

ctx.fill();



if(p.life<=0){

particles.splice(index,1);

        }


    });


requestAnimationFrame(animateFireworks);

}



animateFireworks();





setInterval(()=>{

createFirework();

},700);




const birthdayDate = new Date("Octuber 12, 2026 00:00:00").getTime();


setInterval(()=>{


const now = new Date().getTime();


const distance = birthdayDate - now;



const days = Math.floor(
distance/(1000*60*60*24)
);


const hours = Math.floor(
(distance%(1000*60*60*24))
/(1000*60*60)
);



const minutes = Math.floor(
(distance%(1000*60*60))
/(1000*60)
);



const seconds = Math.floor(
(distance%(1000*60))
/1000
);



document.getElementById("timer").innerHTML =

days+" Days : "+
hours+" Hours : "+
minutes+" Min : "+
seconds+" Sec";


},1000);


