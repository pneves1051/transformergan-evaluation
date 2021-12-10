const steps = Array.from(document.querySelectorAll('form .step'));
const nextBtn = document.querySelectorAll('form .botao-prox');
const prevBtn = document.querySelectorAll('form .botao-ant');

const startStep = Array.from(document.querySelectorAll('form .start'));
const startBtn = document.querySelectorAll('form .botao-inic');

const form = document.querySelectorAll('form');

const audios = document.querySelectorAll('audio');
console.log(audios);


/* CHANGE ID FOR EACH USER*/
var loc = window.location.pathname;
console.log(loc)
last_bar = loc.lastIndexOf('/')
/* Get only outermost parent folder */
var dir = loc.substring(loc.slice(0, last_bar).lastIndexOf('/')+1, last_bar)
var id = ''
console.log(dir)


let root_list =  ['../samples/generated_tr_checkpoint/generated_',
                  '../samples/generated_tr_checkpoint_pretrain_rnn/generated_',
                  '../samples/generated_emopia/generated_'];
/*Insert audio files*/
for (let i = 0; i < audios.length; i++) {
    if (i < 4){
        root = root_list[0];
    } else if (i >= 4 && i < 8) {
        root = root_list[1]; 
    } else {
        root = root_list[2];
    }
    
    new_src =  root + i.toString() +  '_' + id + '.mp3' 
    console.log(new_src)
    audios[i].setAttribute('src', new_src)
}


nextBtn.forEach(button=>{
    button.addEventListener('click', (e) => {
        changeStep('next');
    })
})


prevBtn.forEach(button=>{
    button.addEventListener('click', (e) => {
        changeStep('prev');
    })
})


startBtn.forEach(button=>{
    button.addEventListener('click', (e) => {
        changeStartStep();
    })
})

let array = [...Array(steps.length).keys()]
const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
}
shuffleArray(array);
console.log(array);

/* Turn last button into submit */
lastBtn = nextBtn[array[nextBtn.length-1]];
lastBtn.classList.remove('botao-prox');
lastBtn.classList.add('botao-submit');
lastBtn.setAttribute('type', 'submit');
lastBtn.innerText = 'Concluído';


/* Remove first button prox */
firstBtn = prevBtn[array[0]];
firstBtn.remove();


function changeStep(btn){
    let index = 0;
    let array_index = 0;
    /*The currently active fieldset*/
    const active = document.querySelector('form .step.active');
    /*Position of the active fieldset on the list of fieldsets*/
    index = steps.indexOf(active);
    /*Remove active tag from fieldset*/
    steps[index].classList.remove('active');
    /*Position of the previously
      active fieldset on the shuffled array*/
    array_index = array.indexOf(index);
    /* Stop audio if it is curently being played*/
    if (!audios[array[array_index]].paused){
        audios[array[array_index]].pause();
    }


    console.log(index);
    if(btn == 'next'){
        array_index ++;
    }else if(btn == 'prev'){
        array_index --;
    }
    steps[array[array_index]].classList.add('active');
}

function changeStartStep(){
    /*Remove active tag from fieldset*/
    startStep[0].classList.remove('active');
    /*Change to first step*/
    console.log(startStep);
    steps[array[0]].classList.add('active');
}



/*
function changeStep(btn){
    let index = 0;
    const active = document.querySelector('form .step.active');
    index = steps.indexOf(active);
    steps[index].classList.remove('active');
    if(btn == 'next'){
        index ++;
    }else if(btn == 'prev'){
        index --;
    }

    steps[index].classList.add('active');
}
*/