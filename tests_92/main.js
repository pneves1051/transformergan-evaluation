const steps = Array.from(document.querySelectorAll('form .step'));
var nextBtn = document.querySelectorAll('form .botao-prox');
const prevBtn = document.querySelectorAll('form .botao-ant');

const startStep = Array.from(document.querySelectorAll('form .start'));
const startBtn = document.querySelectorAll('form .botao-inic');

const form = document.querySelectorAll('form');

const audios = document.querySelectorAll('audio');


/* CHANGE ID FOR EACH USER*/
var loc = window.location.pathname;
last_bar = loc.lastIndexOf('/')
/* Get only outermost parent folder */
var dir = loc.substring(loc.slice(0, last_bar).lastIndexOf('/')+1, last_bar)
var id = dir.replace('tests', '')

let root_list =  ['./samples' + id + '/generated_cond_tr_checkpoint_audio/generated_',
                  './samples' + id + '/generated_cond_tr_checkpoint_pretrain_rnn_audio/generated_',
                  './samples' + id + '/generated_emopia_audio/generated_'];
/*Insert audio files*/
for (let i = 0; i < audios.length; i++) {
    if (i < 4){
        root = root_list[0];
    } else if (i >= 4 && i < 8) {
        root = root_list[1]; 
    } else {
        root = root_list[2];
    }
   
    new_src =  root + (i%4).toString() + id + '.mp3' 
    audios[i].setAttribute('src', new_src)
}


var array = [...Array(steps.length).keys()]
const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
}
shuffleArray(array);


/* Turn last button into submit */
lastBtn = nextBtn[array[nextBtn.length-1]];
lastBtn.classList.remove('botao-prox');
lastBtn.classList.add('botao-submit');
lastBtn.setAttribute('type', 'submit');
lastBtn.innerText = 'Concluído';
nextBtn = document.querySelectorAll('form .botao-prox');

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
    
    /* Check if fields are all valid (only if wanting to to to next step)*/
    var isvalid = true;
    if (btn == 'next') {
        isvalid = validateForm(index)
    }
    if (isvalid == true) {
        /*Remove active tag from fieldset*/
        steps[index].classList.remove('active');
        /*Position of the previously
        active fieldset on the shuffled array*/
        array_index = array.indexOf(index);
        /* Stop audio if it is curently being played*/
        if (!audios[index].paused){
        audios[index].pause();
        }
        if(btn == 'next'){
            array_index ++;
        }else if(btn == 'prev'){
            array_index --;
        }
        steps[array[array_index]].classList.add('active');

        window.scrollTo(0, 0);
    }
}

function changeStartStep(){
    /*Remove active tag from fieldset*/
    startStep[0].classList.remove('active');
    /*Change to first step*/
    steps[array[0]].classList.add('active');
}

let features = ['humanity', 'originality', 'quality', 'structure', 'arousal', 'valence']
function validateForm(idx) {
    /* For each feature in each sample*/
    for (i = 0; i < features.length; i++) {
        /* Get all options from radio button */
        const radio_name = "sample" + (idx+1).toString() + "_" + features[i];
        test_concat = `input[name="${radio_name}"]`;

        var radios  = document.querySelectorAll(test_concat)
        /* Check whether some of the options for that
            feature and that sample is checked */
        let isvalid = false;
        for (j = 0; j < radios.length; j++) {
            if (radios[j].checked){
                isvalid = true; 
                break;
            }
        }
        /* if none of the options are cheked, alert user */
        if (isvalid == false) {
            alert("Por favor, preencha todos os campos.")
            return isvalid
        }
    }
    /* if the function got to this point, isvalid is true*/
    var isvalid = true;
    return isvalid
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


var form2 = document.getElementById("form1");
    
async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("status");
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form2.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    status.innerHTML = "Obrigado pelo envio!";
    form2.reset()
    steps[array[array.length-1]].classList.remove('active');
  }).catch(error => {
    status.innerHTML = "Houve um problema com o envio de seu formulário."
  });
}
form2.addEventListener("submit", handleSubmit)