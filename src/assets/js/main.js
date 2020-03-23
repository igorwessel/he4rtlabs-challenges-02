const modalAddFeature = document.querySelector('.modal-add-feature')
const btnOpenModal = document.querySelector('#btn-open-modal-features')
const valuePerHour = document.querySelector('#main-input-value-per-hour')
const featuresTableBody = document.querySelector('#main-list-features-table-body')
const form = document.querySelector('#modal-feature-form')

let features = [
  {
    feature: "Authentication",
    devHours: 10,
    testHours: 2
  }
];

const calcFeature = (devHours, testHours) => {
  let valuePerHourText = valuePerHour.value
  valuePerHourText = valuePerHourText.replace(',', '.')

  return eval(valuePerHourText * (parseInt(devHours) + parseInt(testHours))).toFixed(2)
}

const createRowTable = (data) => {
  return `
  <tr>
    <td>${data.feature}</td>
    <td>${data.devHours}</td>
    <td>${data.testHours}</td>
    <td>R$${calcFeature(data.devHours, data.testHours)}</td>
  </tr>
  `
}

// Listening SUBMIT event in form add new feature .
form.addEventListener('submit', e => {
  e.preventDefault() // prevent page refresh when user submit form.
  let formData = new FormData(form) // create obj formData with keys = atribbute name in form
  let feature = {}
  formData.forEach((value, key) => {
    feature[key] = value // insert inside feature, key = atribbuto name in html and values = user input.
  })

  features.push(feature) // add the feature.
  featuresTableBody.insertAdjacentHTML('beforeend', createRowTable(feature))
})


btnOpenModal.addEventListener('click', () => {
  modalAddFeature.style.display = 'block'
})

window.onclick = function (event) {
  if (event.target == modalAddFeature) {
    modalAddFeature.style.display = "none";
  }
}

// utils functions
function isNumber(event) {
  let keycode = event.keyCode;
  const point = 46
  const comma = 44
  if (keycode == comma || keycode == point) {
    return true
  }
  if (keycode > 47 && keycode < 59 || keycode == point) {
    return true
  } else {
    return false
  }
}