const modalAddFeature = document.querySelector('.modal-add-feature')
const btnOpenModal = document.querySelector('#btn-open-modal-features')
const btnExportJSON = document.querySelector('#btn-export-features')
const btnImportJSON = document.querySelector('#btn-import-features')
const valuePerHour = document.querySelector('#main-input-value-per-hour')
const featuresTableBody = document.querySelector('#main-list-features-table-body')
const featuresTableRows = document.querySelectorAll('#main-list-features-table-body td')
const form = document.querySelector('#modal-feature-form')
let features = []

/* Provisional measure, I will be changing
totDev receive all devHours sum in features 
totDev receive all testHours sum in features 
*/
let totDev = 0
let totTest = 0
let counter = 0

const refreshWithData = (file) => {
  if (file) {
    file = JSON.parse(file)
    for (feature of file) {
      totDev += feature.devHours
      totTest += feature.testHours
      featuresTableBody.insertAdjacentHTML('beforeend', createRowTable(feature))
    }
    features.push(...file)
  }
  document.querySelector('#total-features').innerHTML = features.length
  document.querySelector('#total-dev').innerHTML = totDev
  document.querySelector('#total-test').innerHTML = totTest
  document.querySelector('#total-sum-value').innerHTML = `R$${calcFeature(totDev, totTest)}`
}

const calcFeature = (devHours, testHours) => {
  let valuePerHourText = valuePerHour.value
  valuePerHourText = valuePerHourText.replace(',', '.')

  return eval(valuePerHourText * (parseInt(devHours) + parseInt(testHours))).toFixed(2)
}

const createRowTable = (data) => {
  counter += 1
  return `
  <tr draggable="true" feature_id=${counter - 1}>
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
    feature[key] = parseInt(value) ? parseInt(value) : value // insert inside feature, key = atribbuto name in html and values = user input.
  })
  features.push(feature) // add the feature.
  totDev += feature.devHours
  totTest += feature.testHours

  refreshWithData()
  featuresTableBody.insertAdjacentHTML('beforeend', createRowTable(feature))
})


// Listening drag event
let dragged;
document.querySelector('tbody').addEventListener('dragstart', e => {
  dragged = e.target
  console.log(dragged)
})



document.addEventListener('dragend', e => {
  e.target.style.opacity = "";
})

document.addEventListener('dragover', e => {
  // prevent default to allow drop
  e.preventDefault();
});

document.addEventListener('dragenter', e => {
  // highlight potential drop target when the draggable element enters it
  if (e.target.className == "dropzone") {
    e.target.style.background = "purple";
  }
});

document.addEventListener('dragleave', e => {
  if (e.target.className == "dropzone") {
    e.target.style.background = "";
  }
})

document.addEventListener('drop', e => {
  if (e.target.className == "dropzone") {
    features = features.filter((feature, index) => {
      return dragged.children[0].innerText !== feature['feature']
    })
    dragged.remove()
  }
})

// modal event when user click in add feature.
btnOpenModal.addEventListener('click', () => {
  modalAddFeature.style.display = 'block'
})

window.onclick = function (event) {
  if (event.target == modalAddFeature) {
    modalAddFeature.style.display = "none";
  }
}

// event change in input
valuePerHour.addEventListener('change', (event) => {
  document.querySelectorAll('tbody tr td:nth-of-type(4n)').forEach((element, index) => {
    element.innerHTML = `R$${calcFeature(features[index].devHours, features[index].testHours)}`
  })
  document.querySelector('#total-sum-value').innerHTML = `R$${calcFeature(totDev, totTest)}`
})

// btn events

btnExportJSON.addEventListener('click', e => {
  if (features.length === 0) {
    alert('Não adicionou nenhuma feature.')
    return
  }

  let data = JSON.stringify(features, null, 2)
  let url = 'data:application/json;charset=utf-8,' + encodeURIComponent(data)

  let link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', 'features.json')
  link.click()
})

btnImportJSON.addEventListener('click', e => {
  document.querySelector('#import-features').click()
})

const handleFiles = (file) => {
  let reader = new FileReader()
  let data;
  reader.readAsText(file[0])
  reader.onloadend = () => {
    data = reader.result
    let testHaveBracket = data.match(/^[[]/gm)
    let testObjectFeature = data.match(/{\s+"feature":\s".*"/gm)
    let testObjectNumber = data.match(/\s+"(devHours|testHours)":\s\d+/gm)
    let testObject = data.match(/{\s+"feature":.*\s+"devHours":.*\s+"testHours".+\s+}/gm)

    if (testHaveBracket && testObjectFeature && testObjectNumber && testObject) {
      refreshWithData(data)
    } else {
      alert('Esse arquivo não atende o padrão.')
      return
    }
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