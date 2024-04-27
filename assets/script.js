const buttonAddTask = document.getElementById('addTask');
const tableElem = document.getElementById('table');
const tableBody = document.getElementById('tableBody')

buttonAddTask.addEventListener ('click', function() {
    console.log("button pressed");

});

function addTask () {
    const newTaskElem = document.createElement('tr');
    const newTaskElementData1 = document.createElement('td');
    newTaskElementData1.textContent ="test";
    // const newTaskElementData2 = document.createElement('td');
    // const newTaskElementData3 = document.createElement('td');
    newTaskElem.appendChild(newTaskElementData1);

    
    // tableElem.insertBefore(newTaskElem, tableElem.children[1]);
    tableBody.appendChild(newTaskElem);
}

addTask();