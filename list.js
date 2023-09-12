let myList = []
let listLength = 0

let addButton = document.getElementById("add-btn")
let input = document.getElementById("input-el")
let listEl = document.getElementById("list-el")
let clearButton = document.getElementById("clear-btn")

// ___LOADING MEMORY___
let memory = JSON.parse(localStorage.getItem("myItems"))
let loadingMemory = true
if (memory != null) {
    for (let i = 0; i < memory.length; i++) {
        myList.push(memory[i])
        addItem(memory[i])
    }
}
loadingMemory = false


addButton.addEventListener("click", function() {
    if (input.value != "") {
        addItem(input.value)
        input.value = ""
    }
})

clearButton.addEventListener("click", function() {
    clearList()
})

function addItem(myInput) {
    /*let listItems = ""
    for (let i = 0; i < myList.length; i++) {
        listItems += `
        <li> <button id="list-items" onclick="removeItem(${i})"> ${myList[i]} </button> </li>
        `
        document.body.appendChild(
            Object.assign(
                document.createElement("button"), {
                    innerHTML : "button", id:"list-items"
                }
            )
        ) 
        
    } */
    listLength++
    let newItem = document.createElement("button")
    newItem.innerHTML = myInput
    newItem.setAttribute("class", "list-items")

    let newID = "id" + listLength

    newItem.setAttribute("id", newID)
    listEl.insertAdjacentElement('beforeend', newItem)

    let addListener = document.getElementById(newID)
    newItem.addEventListener("click", function() {
        removeItem(newID[2])
    })

    if (!loadingMemory) {
        myList.push(myInput)
        localStorage.setItem("myItems", JSON.stringify(myList))
    }
    //console.log(myList)
    
}

function removeItem(idToRemove) {
    let elementToDelete = document.getElementById("id" + idToRemove)
    let text = elementToDelete.innerText

    let id = 0
    for (let i = 0; i < myList.length; i++) {
        if (text === myList[i]) {
            id = i
        }
    }

    for (let i = id; i < myList.length - 1; i++) {
        myList[i] = myList[i + 1]
    }
    myList.pop()
    localStorage.setItem("myItems", JSON.stringify(myList))
    //console.log(myList)

    elementToDelete.remove()
    listLength--
}

function clearList() {
    while (listEl.firstChild) {
        listEl.removeChild(listEl.firstChild)
    }
    listLength = 0

    myList = []
    localStorage.setItem("myItems", JSON.stringify(myList))
}

