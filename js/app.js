if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    const BaseURL = "https://montanari8.github.io/api-pwa/"
    navigator.serviceWorker
      .register(`BaseURL/sw.js`)
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err))
  })
}

// Fetch
const url = "https://retroflix.herokuapp.com/usuario" // URL API
const consultUser = document.querySelector("#consult-user") // Botão consulta usuário
const result = document.querySelector("#result")// div result imprimi resultados
async function getAllUsers() {
  const response = await fetch(url)
  const data = await response.json();
  console.log(data)
  result.innerHTML = "";// clear div
  data.map((user) => {
    const div = document.createElement("div")
    const tab = document.createElement("table")
    const tr = document.createElement("tr")
    const td01 = document.createElement("td")
    const td02 = document.createElement("td")

    td01.innerText = user.username
    td02.innerText = user.email

    tr.appendChild(td01)
    tr.appendChild(td02)
    tab.appendChild(tr)
    div.appendChild(tab)
    result.appendChild(div)
  })
}



consultUser.addEventListener("click", getAllUsers, false)
