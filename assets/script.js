const buttonAddTask = document.getElementById('addTask');
const tableElem = document.getElementById('table');
const tableBody = document.getElementById('tableBody')
let ranking, task, action

buttonAddTask.addEventListener ('click', function() {
    console.log("button pressed");
    const newRaw = document.createElement('tr');
    const formElem = document.createElement('form');
    const inputElem = document.createElement('input')
    const formDataRanking = document.createElement('td');
    inputElem.setAttribute('type', 'text');
    inputElem.setAttribute('placeholder', 'Enter Ranking');
    formDataRanking.appendChild(inputElem)
    const formTask = document.createElement('td');
    formTask.setAttribute('type', 'text');
    const formAction = document.createElement('td');
    formAction.setAttribute('type', 'text');

    formDataRanking.appendChild(formElem);


    
    newRaw.appendChild(formDataRanking)
    tableBody.appendChild(newRaw);
});

function addTask (ranking, task, action) {
    const newTaskElem = document.createElement('tr');
    const newTaskElementData1 = document.createElement('td');
    newTaskElementData1.textContent ="test";
    const newTaskElementData2 = document.createElement('td');
    newTaskElementData2.textContent ="test2";
    const newTaskElementData3 = document.createElement('td');
    newTaskElementData3.textContent ="test3";
    //  add the data to the table raw
    newTaskElem.appendChild(newTaskElementData1);
    newTaskElem.appendChild(newTaskElementData2);
    newTaskElem.appendChild(newTaskElementData3);

    // add the raw to the table 
    // tableElem.insertBefore(newTaskElem, tableElem.children[1]);
    tableBody.appendChild(newTaskElem);
}

addTask();