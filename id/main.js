var concBtn = document.querySelectorAll('form .botao-submit');

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
  
  }).catch(error => {
    status.innerHTML = "Houve um problema com o envio de seu formulário."
  });
}
form2.addEventListener("submit", handleSubmit)
