const buttonAddTask = document.getElementById("addTask");
const userInput = document.getElementById("toggleHiddenStatus");
const tableElem = document.getElementById("table");
const tableBody = document.getElementById("tableBody");
const list = JSON.parse(localStorage.getItem("savedList")) || {}
let numberOfTasks = 0;


// function to display the ToDo list with data from local storage 
function displayList () {
    for (let key in list) {
        numberOfTasks ++
        const newTaskElem = document.createElement("tr"); // create the tr
        newTaskElem.id = "newtask"
        const newTaskElementData1 = document.createElement("td"); // create td1
        newTaskElementData1.textContent = list[key].key1 || "test";
        const newTaskElementData2 = document.createElement("td"); // create td2
        newTaskElementData2.textContent = list[key].key2 || "test2";
        const newTaskElementData3 = document.createElement("td");  // create td3
        newTaskElementData3.textContent = list[key].key3 || "pending";
        //  add the data (td) to the table raw
        newTaskElem.appendChild(newTaskElementData1);
        newTaskElem.appendChild(newTaskElementData2);
        newTaskElem.appendChild(newTaskElementData3);
      
        // add the raw to the table
        // tableElem.insertBefore(newTaskElem, tableElem.children[1]);
        tableBody.appendChild(newTaskElem);
    }
}
displayList();  // call function to diaplay the list


// ============= toggle the table raw with the input form =====================
buttonAddTask.addEventListener("click", function () {
  console.log("button pressed");
  if (userInput.style.display === 'none') {
    userInput.style.display = ''; // Show the element
} else {
  userInput.style.display = 'none'; // Hide the element
}

});

// ====== event listener for the submit form ==================
userInput.addEventListener("submit", function (event) {
  event.preventDefault();
  const rank = event.target.elements.rank.value;
  const task = event.target.elements.task.value;
   // display the new task in the table
  const newTaskElem = document.createElement("tr"); // create the tr
  newTaskElem.id = "newtask"
  const newTaskElementData1 = document.createElement("td"); // create td1
  newTaskElementData1.textContent = rank || "test";
  const newTaskElementData2 = document.createElement("td"); // create td2
  newTaskElementData2.textContent = task || "test2";
  const newTaskElementData3 = document.createElement("td");  // create td3
  newTaskElementData3.textContent = "pending";
  //  add the data (td) to the table raw
  newTaskElem.appendChild(newTaskElementData1);
  newTaskElem.appendChild(newTaskElementData2);
  newTaskElem.appendChild(newTaskElementData3);

  // add the raw to the table
  // tableElem.insertBefore(newTaskElem, tableElem.children[1]);
  tableBody.appendChild(newTaskElem);
  let createdTask = {key1: rank, key2: task, key3:"pending"};
//   console.log(createdTask);
  let taskNumber = "no"+(numberOfTasks+1);   
  list[taskNumber] = createdTask
  console.log(list);
  localStorage.setItem("savedList", JSON.stringify(list));  
  let rows = table.getElementsByTagName('tr');
  // delete the previous list to prepare to display the updated list
  for (let i = rows.length - 1; i >= 0; i--) {
    let row = rows[i];
    if (row.id === "newtask") {
        row.remove();
    }
}
  // Clear the form fields after submission
  event.target.elements.rank.value = ''; // Clear the rank input field
  event.target.elements.task.value = ''; // Clear the task input field
  
  // Display the initial placeholder in the form fields
  event.target.elements.rank.placeholder = 'rank'; // Set the placeholder for rank input
  event.target.elements.task.placeholder = 'task'; // Set the placeholde
  displayList();
});
