// document.querySelector('.clear-tasks').addEventListener('click', (e) => {
//     e.preventDefault()
//     console.log(e.timeStamp, "timeStamp");
//     console.log(e.clientX, "clientX");
//     console.log(e.offsetX, "offsetX");
// })
// document.querySelector('.clear-tasks').addEventListener('dblclick', (e) => {
//     e.preventDefault()
//     console.log("xxxxxxxxxxxxxxxxxxxxxxxxx");
// })




const form_add = document.querySelector('form')
const text_input = document.querySelector('#task')
const filter = document.querySelector('#filter')
const collections = document.querySelector('.collection')
const clear_btn = document.querySelector('.clear-tasks')

LoadEventListeners()
function LoadEventListeners() {
    // Event that calls right after the dom is loaded
    document.addEventListener('DOMContentLoaded', GetAllTaskFromLocalStorage)

    form_add.addEventListener('submit', AddNew)
    collections.addEventListener('click', DeleteItem)
    clear_btn.addEventListener('click', ClearList)
    filter.addEventListener('keyup', Filter)
}


function AddNew(e){
    e.preventDefault()
    const newItem = text_input.value

    if(newItem === null || newItem === '') {
        alert("Add Something")
        return
    }

    StoreInLocalStorage(newItem)

    let new_li = document.createElement('li')
    new_li.textContent = newItem
    new_li.className = "collection-item"

    new_a = document.createElement('a')
    new_a.className = 'delete-item secondary-content'
    new_a.innerHTML = '<i class="fa fa-remove"></i>'

    new_li.appendChild(new_a)
    
    collections.appendChild(new_li)

    text_input.value = null
}


function DeleteItem(e) {
    e.preventDefault()

    if(e.target.parentElement.classList.contains("delete-item")){
        if(confirm(`Are you sure you want to delete "${e.target.parentElement.parentElement.innerText}"`)) {
            RemoveFromInLocalStorage(e.target.parentElement.parentElement.firstChild.textContent)
            e.target.parentElement.parentElement.remove()
            console.log("Deleted "  + e.target.parentElement.parentElement.innerText);
        }
    }
}


function ClearList(e) {
    e.preventDefault()
    /* Slower */
    // collections.innerHTML = ''

    /* Faster */
    while(collections.firstChild) {
        // collections.remove(firstChild)
        collections.removeChild(collections.firstChild)
    }

    ClearAllTasks();
}


function Filter(e) {
    const filtered_text = e.target.value.toLowerCase()
    
    document.querySelectorAll(".collection-item").forEach((i) => {
        console.log(i.firstChild.textContent.indexOf(filtered_text));

        if(i.firstChild.textContent.indexOf(filtered_text) != -1) {
            i.style.display = 'block'
        }else {
            i.style.display = 'none'
        }
    })
}


function GetAllTaskFromLocalStorage() {
    let tasks

    if(localStorage.getItem('task_list') == null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('task_list'))
    }

    tasks.forEach((i) => {
        let new_li = document.createElement('li')
        new_li.textContent = i
        new_li.className = "collection-item"

        new_a = document.createElement('a')
        new_a.className = 'delete-item secondary-content'
        new_a.innerHTML = '<i class="fa fa-remove"></i>'

        new_li.appendChild(new_a)
        
        collections.appendChild(new_li)
    })
}
function StoreInLocalStorage(newTask) {
    let tasks

    if(localStorage.getItem('task_list') == null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('task_list'))
    }

    tasks.push(newTask)
    localStorage.setItem("task_list", JSON.stringify(tasks))
}
function RemoveFromInLocalStorage(deleteTask) {
    let tasks

    if(localStorage.getItem('task_list') == null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('task_list'))
    }

    tasks = tasks.filter(i => i !== deleteTask)

    localStorage.setItem("task_list", JSON.stringify(tasks))
}
function ClearAllTasks() {
    localStorage.clear()
}