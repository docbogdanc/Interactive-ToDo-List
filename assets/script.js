const buttonAddTask = document.getElementById("addTask");
const userInput = document.getElementById("toggleHiddenStatus");
const tableElem = document.getElementById("table");
const tableBody = document.getElementById("tableBody");
const list = JSON.parse(localStorage.getItem("savedList")) || {};
const listHistory = JSON.parse(localStorage.getItem("savedHistoryList")) || {};
let numberOfTasks = 0;


//-----------------------------------------------------------------------------------
//================ function to DISPLAY the ToDo list with data from local storag e=================
function displayList() {
  // order the list with "Urgent" first and "Anytime" last
  const orderedData = Object.fromEntries(
    Object.entries(list).sort(([, a], [, b]) => {
      if (a.key1 === "Urgent") return -1;
      if (b.key1 === "Urgent") return 1;
      if (a.key1 === "Anytime" && b.key1 === "Normal") return 1;
      if (a.key1 === "Normal" && b.key1 === "Anytime") return -1;
      return 0;
    })
  );
  // create the table elements with data from object list
  for (let key in orderedData) {
    const newTaskElem = document.createElement("tr"); // create the tr
    newTaskElem.className = "newtask";
    const newTaskElementData1 = document.createElement("td"); // create td1
    newTaskElementData1.textContent = orderedData[key].key1 || "test";
    const newTaskElementData2 = document.createElement("td"); // create td2
    newTaskElementData2.textContent = orderedData[key].key2 || "test2";
    const newTaskElementData3 = document.createElement("td"); // create td3
    newTaskElementData3.textContent = orderedData[key].key3 || "pending";
    const newTaskElementData4 = document.createElement("td"); // create td4
    const newTaskElementData4DeleteButton = document.createElement("button");
    const newTaskElementData4FinishedButton = document.createElement("button");
    newTaskElementData4FinishedButton.className = "finishedButton";
    newTaskElementData4FinishedButton.textContent = "Done";
    newTaskElementData4DeleteButton.className = "Button";
    newTaskElementData4DeleteButton.textContent = "X";
    newTaskElementData4.appendChild(newTaskElementData4FinishedButton);
    newTaskElementData4.appendChild(newTaskElementData4DeleteButton);

    //  add the data (td) to the table raw
    newTaskElem.appendChild(newTaskElementData1);
    newTaskElem.appendChild(newTaskElementData2);
    newTaskElem.appendChild(newTaskElementData3);
    newTaskElem.appendChild(newTaskElementData4);
    // add the raw to the table
    // tableElem.insertBefore(newTaskElem, tableElem.children[1]);
    tableBody.appendChild(newTaskElem);
  }
}
displayList(); // call function to diaplay the list


//---------------------------------------------------------------------------------------
// ============= TOGGLE the display for table raw with the INPUT FORM =====================
buttonAddTask.addEventListener("click", function () {
  if (userInput.style.display === "none") {
    userInput.style.display = ""; // Show the element
  } else {
    userInput.style.display = "none"; // Hide the element
  }
});


//---------------------------------------------------------------------
// ============= FUNCTION for button to DELETE task =====================
const deleteButtons = document.getElementsByClassName("deleteButton");
// Iterate over each delete button element
Array.from(deleteButtons).forEach(function (deleteButton) {
  // Add an event listener to each delete button
  deleteButton.addEventListener("click", function (event) {
    // Access the parent node of the delete button
    const parentElement = event.target.parentNode.parentNode;
    // Access the task to delete from the second child element
    const taskToDelete = parentElement.children[1].textContent;
    // find in the object the key that need to be deleted and delete its object
    for (let key in list) {
      if (list[key].key2 === taskToDelete) {
        delete list[key];
        break; // Stop the loop after deleting the element
      } 
    }
    localStorage.setItem("savedList", JSON.stringify(list)); // save list in local storage
    let rows = table.getElementsByTagName("tr"); // delete old list
    // delete the previous list to prepare to display the updated list
    for (let i = rows.length - 1; i >= 0; i--) {
      let row = rows[i];
      if (row.className === "newtask") {
        row.remove();
      }
    }
    displayList(); // display new list
    window.location.reload()
    
  });
  
});


//---------------------------------------------------------------------
// ============= FUNCTION for button to DELETE task =====================
const finishedButtons = document.getElementsByClassName("finishedButton");
// Iterate over each delete button element
Array.from(finishedButtons).forEach(function (finishedButton) {
  // Add an event listener to each delete button
  finishedButton.addEventListener("click", function (event) {
    // Access the parent node of the delete button
    const parentElement = event.target.parentNode.parentNode;
    // Access the task to Mark as finished from the second child element
    const taskToFinish = parentElement.children[1].textContent;
    // find in the object the key that need to be deleted and delete its object
    for (let key in list) {
      if (list[key].key2 === taskToFinish) {
        list[key].key3 = "Finished";
        break; // Stop the loop after deleting the element
      } 
    }
    localStorage.setItem("savedList", JSON.stringify(list)); // save list in local storage
    let rows = table.getElementsByTagName("tr"); // delete old list
    // delete the previous list to prepare to display the updated list
    for (let i = rows.length - 1; i >= 0; i--) {
      let row = rows[i];
      if (row.className === "newtask") {
        row.remove();
      }
    }
    displayList(); // display new list
    window.location.reload()
    
  });
  
});



//-------------------------------------------------------------
// ====== event listener for the SUBMIT FORM ==================
userInput.addEventListener("submit", function (event) {
  event.preventDefault();
  const rank = event.target.elements.rank.value;  // take the values submitted
  const task = event.target.elements.task.value;
  // create a new object with the task
  let createdTask = { key1: rank, key2: task, key3: "pending", key4: "X" , key5:"finished"};
  numberOfTasks = localStorage.getItem("noOfTasks") || 1;
  numberOfTasks = parseInt(numberOfTasks)+1;
  console.log(numberOfTasks);
  let taskNumber = "no" + (numberOfTasks);
  list[taskNumber] = createdTask;
  localStorage.setItem("noOfTasks", numberOfTasks)
  localStorage.setItem("savedList", JSON.stringify(list));
  let rows = table.getElementsByTagName("tr");
  // delete the previous list to prepare to display the updated list
  for (let i = rows.length - 1; i >= 0; i--) {
    let row = rows[i];
    if (row.className === "newtask") {
      row.remove();
    }
  }
  displayList();
  window.location.reload()
});
