function setToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));

}
function getFromLocalStorage() {
    return JSON.parse(localStorage.getItem('tasks'))
}
function appendTask(task) {
    let list = document.createElement('li');
    list.innerHTML = `
    <input class='stat' type='checkBox' ${task[2] == '1' ? 'checked' : ''} onclick='toggleTask(${task[2]})'>
    <span>${task[1]}</span>
    <button class="delete-btn" onclick="removeTask(this, ${task[0]})">X</button>
    `;
    tasksList.appendChild(list);
}
function removeTask(elem, id) {
    elem.parentElement.remove();
    tasks = tasks.filter(arr => {
        return arr[0] !== id;
    });
    setToLocalStorage();
}
function toggleTask(id) {
    for (let i = 0; i < tasks.length; i++) {
        let elem = tasks[i][2]
        if (elem == id) {
            elem = elem === 0 ? 1 : 0 
            break;
        } 
    }
    setToLocalStorage();
}
let tasks = getFromLocalStorage() || [];
let noteInput = document.getElementById('note-input');
let tasksList = document.getElementById('tasks-list');
let a = document.querySelectorAll('input[type=checkbox]')
for (const task of tasks) {
    appendTask(task);
}
function addTask() {
    if (noteInput === null || noteInput.value === '') {
        return;
    }
    let id = tasks.length > 0 ? tasks[tasks.length - 1][0] + 1 : 0;
    console.log(id);
    let task = [id, noteInput.value, 0]
    appendTask(task);
    tasks.push(task);
    setToLocalStorage();

    // related to ux
    noteInput.value = '';
    noteInput.focus()
}