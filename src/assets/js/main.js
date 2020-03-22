// Este será o objeto principal no qual você irá se basear para as funções do desafio!
// Caso haja dúvidas de como prosseguir, favor consultar a sala #js no nosso discord!
let features = [
  {
    feature: "Authentication",
    devHours: 10,
    testHours: 2
  }
];


// Dica: faça o layout e depois pense em como vai funcionar o script.


const modalAddFeature = document.querySelector('.modal-add-feature')
const btnOpenModal = document.querySelector('#btn-open-modal-features')

btnOpenModal.addEventListener('click', () => {
  modalAddFeature.style.display = 'block'
})

window.onclick = function(event) {
  if (event.target == modalAddFeature) {
    modalAddFeature.style.display = "none";
  }
}

// utils functions
function isNumber(event) {
  let keycode = event.keyCode;
  if (keycode > 47 && keycode < 59) {
      return true
  } else {
      return false
  }
}