// Function to get multiple HTML elements 
const getEl = els => { 
  const htmlEls = []

  for (const el of els) htmlEls
  .push(document.querySelector(el))
  
  return htmlEls
}

// Declaring multiple constant html elements
const cssSelectors = ['form', '#listarCita', '#btnBuscar', '#busqueda' ]
const [ htmlEl, listarCita, buscar, busqueda ] = getEl(cssSelectors)

const citas = JSON.parse(localStorage.getItem('CITAS')) || []

// When submiting, scroll page to AGENDA, otherwise, scroll to top
window.onload = () => {
  if (!localStorage.getItem('submitted')
  ) return window.scrollTo(0, 0)

  window.location.href = '#link'
  localStorage.removeItem('submitted')
}

for (const cita of citas) { 
    // Create table data cells (td) and fill them out
    const { nombre, fecha, hora, sintoma } = cita
    const [ name, date, time, sign ] = 
        [ nombre, fecha, hora, sintoma ].map(value => {
            const td = document.createElement('td')
            td.innerText = value; return td
        })

  // Trash
  /** 
   *     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
   * Añadir esta línea al head del HTML 
   * para implementar botones de basura
  */
  const trash = document.createElement('td')
  trash.innerHTML = '<i class="fa fa-trash-o"></i>'      
  
  // Create a parent row (tr) and append the cells (td)
  const tr = document.createElement('tr')
  const children = [name, date, time, sign, trash]
  children.forEach(child => tr.appendChild(child))

  trash.onclick = () => deleteDate(tr, citas.indexOf(cita))

  // Append the parent row (tr) to the HTML tbody element
  listarCita.appendChild(tr)
}

htmlEl.onsubmit = () => capturarDatos()

function capturarDatos() {
    // Force page to scroll all the way down 
    localStorage.setItem('submitted', true)

    // Catch data
    const cssSelectors = [ '#nombre', '#fecha', '#hora', '#sintomas' ]
    const [ nombre, fecha, hora, sintoma ] = 
    getEl(cssSelectors).map(info => info.value)
    
    // Save data into browser's local storage
    let registro = { nombre, fecha, hora, sintoma }
    citas.unshift(registro)
    localStorage.setItem('CITAS', JSON.stringify(citas))
}

function deleteDate(tableRow, index) { 
  citas.splice(index, ++index)
  listarCita.removeChild(tableRow) 

  localStorage.setItem('CITAS', JSON.stringify(citas))
}

// Trying to toggle [AGREGAR CITAS] section
const [ agregarCitas, agenda ] = getEl(['.card-body h1', '#link'])

agregarCitas.onclick = () => toggleEl('form')
agenda.onclick = () => toggleEl('table')

function toggleEl(toggeable) {
  const htmlEl = document.querySelector(toggeable)
  const toggled = htmlEl.style.display == 'none'
  if (!toggled) return htmlEl.style.display = 'none'
  
  window.location.href = '#toggle'
  htmlEl.style.display = 'block'
}

// Hacer el evento submit al formulario para que me capture los datos
// Hacer que se me muestre la información almacenada en el localstorage
// por medio de un innerHTML y se me refleje en la sesión de Agendar