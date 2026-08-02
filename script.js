const beginBtn = document.getElementById("beginBtn");

const opening = document.getElementById("opening");

const typingName = document.getElementById("typingName");

const heroName = document.getElementById("heroName");

const finalName = document.getElementById("finalName");

const bgVideo = document.getElementById("bgVideo");

const giftBtn = document.getElementById("giftBtn");

const letterSection = document.getElementById("letterSection");

const envelope = document.getElementById("envelope");

const letterText = document.getElementById("letterText");

const gallerySection = document.getElementById("gallery");

const storySection = document.querySelector(".story-section");

const finalSection = document.querySelector(".final-section");

const letterNext =
document.getElementById("letterNext");

const galleryNext =
document.getElementById("galleryNext");

const storyNextBtn = document.getElementById("storyNextBtn");

const thankBtn = document.getElementById("thankBtn");


// =============================
// Personal Data
// =============================


const name = "Your Beautiful Name❤️";


const message = `
Happy Birthday❤️

I wish your life is always filled
with happiness, success and beautiful moments.

Thank you for being such a special person.

Keep smiling and always shine✨

Enjoy your special day🎂
`;



// =============================
// Typing Effect
// =============================


let nameIndex = 0;


function typeName(){


if(nameIndex < name.length){


typingName.innerHTML += 
name.charAt(nameIndex);


nameIndex++;


setTimeout(
typeName,
            120
        );


    }


}



typeName();



// =============================
// Begin Button
// =============================


beginBtn.addEventListener(
"click",
()=>{


opening.classList.add("hide");


setTimeout(()=>{


opening.style.display="none";


    },1000);



heroName.innerHTML = name;


bgVideo.play();

bgVideo.onended = () => {

bgVideo.loop = true;

bgVideo.play();

};



});




// =============================
// Open Gift
// =============================


giftBtn.addEventListener(
"click",
()=>{


letterSection.classList.remove(
        "hidden"
    );



setTimeout(()=>{


letterSection.scrollIntoView({

behavior:"smooth"

        });



    },300);



typeLetter();


});






// =============================
// Letter Typing
// =============================


let letterIndex = 0;



function typeLetter(){

if(letterIndex<message.length){

letterText.innerHTML +=
message.charAt(letterIndex);

letterIndex++;

setTimeout(typeLetter,40);

}

else{

letterNext.classList.remove("hidden");

}

}




// =============================
// Envelope Open
// =============================


envelope.addEventListener(
"click",
()=>{


envelope.classList.toggle(
        "open"
    );


});

// =============================
// Countdown
// =============================


const birthdayDate = new Date(
    "October 12, 2026 00:00:00"
).getTime();



const timer = document.getElementById("timer");



setInterval(()=>{


const now = new Date().getTime();


const distance = birthdayDate - now;



if(distance <= 0){


timer.innerHTML =
        "Happy Birthday❤️";


return;


    }




const days = Math.floor(
distance /
        (1000 * 60 * 60 * 24)
    );



const hours = Math.floor(
        (distance %
        (1000 * 60 * 60 * 24))
        /
        (1000 * 60 * 60)
    );



const minutes = Math.floor(
        (distance %
        (1000 * 60 * 60))
        /
        (1000 * 60)
    );



const seconds = Math.floor(
        (distance %
        (1000 * 60))
        /
        1000
    );




timer.innerHTML = `

<div class="time-box">
<span>${days}</span>
<small>Days</small>
</div>

<div class="time-box">
<span>${hours}</span>
<small>Hours</small>
</div>

<div class="time-box">
<span>${minutes}</span>
<small>Minutes</small>
</div>

<div class="time-box">
<span>${seconds}</span>
<small>Seconds</small>
</div>

`;



},1000);






// =============================
// Gallery Slider
// =============================



const images = [

"images/photo1.jpg",

"images/photo2.jpg",

"images/photo3.jpg",

"images/photo4.jpg"

];



let currentImage = 0;



const galleryImage =
document.getElementById(
    "galleryImage"
);



const nextBtn =
document.getElementById(
    "nextBtn"
);



const prevBtn =
document.getElementById(
    "prevBtn"
);




function changeImage(){


galleryImage.style.opacity = 0;



setTimeout(()=>{


galleryImage.src =
images[currentImage];



galleryImage.style.opacity = 1;



    },400);



}




nextBtn.addEventListener(
"click",
()=>{


currentImage++;


if(currentImage >= images.length){


currentImage = 0;


    }


changeImage();



});





prevBtn.addEventListener(
"click",
()=>{


currentImage--;


if(currentImage < 0){


currentImage =
images.length - 1;


    }



changeImage();



});





setInterval(()=>{


currentImage++;


if(currentImage >= images.length){


currentImage = 0;


    }


changeImage();



},5000);








// =============================
// Hearts
// =============================



const heartsContainer =
document.querySelector(
    ".hearts"
);



function createHeart(){



const heart =
document.createElement(
        "span"
    );



heart.innerHTML="❤️";



heart.style.left =
Math.random()*100+"vw";



heart.style.fontSize =
Math.random()*20+15+"px";



heartsContainer.appendChild(
heart
    );



setTimeout(()=>{


heart.remove();


    },6000);



}



setInterval(

createHeart,

1500

);






const shootingContainer =
document.querySelector(".shooting-stars");

function createStar(){

const star =
document.createElement("span");

star.style.top =
Math.random()*40+"%";

star.style.left =
    (80+Math.random()*20)+"%";

shootingContainer.appendChild(star);

setTimeout(()=>{
star.remove();
    },2000);

}

setInterval(createStar,4500);





// =============================
// Confetti
// =============================



function createConfetti(){



for(let i=0;i<30;i++){



const item =
document.createElement(
            "div"
        );



item.innerHTML="🎉";



item.style.position="fixed";

item.style.top="-20px";


item.style.left =
Math.random()*100+"vw";


item.style.fontSize =
Math.random()*25+15+"px";


item.style.animation =
        "fall 4s linear";



document.body.appendChild(
item
        );



setTimeout(()=>{


item.remove();


        },4000);



    }



}







// =============================
// Final Surprise
// =============================



const surpriseBtn =
document.getElementById(
    "surpriseBtn"
);


const popup =
document.getElementById(
    "popup"
);



surpriseBtn.addEventListener(
"click",
()=>{


finalName.innerHTML =
name;



popup.classList.remove(
        "hidden"
    );


createConfetti();


startFireworks();


});








// =============================
// Calm Fireworks
// =============================



const canvas =
document.getElementById(
    "fireworks"
);


const ctx =
canvas.getContext(
    "2d"
);



canvas.width =
window.innerWidth;


canvas.height =
window.innerHeight;




window.addEventListener(
"resize",
()=>{


canvas.width =
window.innerWidth;


canvas.height =
window.innerHeight;


});




let particles=[];




function firework(){



const x =
Math.random()*canvas.width;



const y =
Math.random()*
    (canvas.height/2);



for(let i=0;i<35;i++){



particles.push({


x:x,

y:y,


dx:
(Math.random()-.5)*5,


dy:
(Math.random()-.5)*5,


life:80


        });



    }


}






function animate(){


ctx.clearRect(
        0,
        0,
canvas.width,
canvas.height
    );



particles.forEach(
    (p,index)=>{


p.x += p.dx;

p.y += p.dy;


p.life--;



ctx.beginPath();


ctx.arc(
p.x,
p.y,
            3,
            0,
Math.PI*2
        );



ctx.fillStyle="white";


ctx.fill();



if(p.life<=0){


particles.splice(
index,
                1
            );


        }


    });



requestAnimationFrame(
animate
    );



}



animate();




setInterval(()=>{

firework();

},3500);





function startFireworks(){



let count = 0;



const show =
setInterval(()=>{


firework();


count++;



if(count>=8){


clearInterval(show);


        }



    },700);



}


letterNext.addEventListener("click",()=>{

gallerySection.classList.remove("hidden");

gallerySection.scrollIntoView({

behavior:"smooth"

});

setTimeout(()=>{

galleryNext.classList.remove("hidden");

},700);

letterNext.style.display="none";

});




galleryNext.addEventListener("click",()=>{

storySection.classList.remove("hidden");

storySection.scrollIntoView({

behavior:"smooth"

});

galleryNext.style.display="none";

});




storyNextBtn.addEventListener("click",()=>{

finalSection.classList.remove("hidden");

setTimeout(()=>{

finalSection.scrollIntoView({

behavior:"smooth"

});

},200);

});



thankBtn.addEventListener("click",()=>{

popup.classList.add("hidden");

document.querySelector(".hero").scrollIntoView({
behavior:"smooth"
    });

});
