var taskInput = document.getElementById("new-task");
var addButton = document.getElementById("add-task-button"); // 버튼 id 변경
var incompleteTasksHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");
var saveButton = document.getElementById("save-diary-button"); // save 버튼 id 추가
var diaryInput = document.getElementById("new-diary"); // input 박스 id 추가

// Get the container element
var container = document.querySelector('.container');

// Create a new paragraph element for displaying the date
var dateParagraph = document.createElement('p');
dateParagraph.id = 'date-display';

// Append the date paragraph to the container
container.appendChild(dateParagraph);

// Update date display
var updateDateDisplay = function() {
  var dateDisplay = document.getElementById("date-display");

  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth();
  var day = today.getDate();

  // Array of month names in English
  var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Format the date as desired (e.g., June 20, 2023)
  var formattedMonth = monthNames[month];
  var formattedYear = year;
  var formattedDay = day;

  // Update the date display with separate lines for month and year
  dateDisplay.innerHTML = "<span class='month'>" + formattedMonth + "</span><br>" + formattedDay + "<br>" + formattedYear;
};

// Call the updateDateDisplay function to initially display the date
updateDateDisplay();




// Add a task
var createNewTaskElement = function(taskString) {
  // Create list item
  var listItem = document.createElement("li");

  // input (checkbox)
  var checkBox = document.createElement("input");

  // label
  var label = document.createElement("label");

  // input (text)
  var editInput = document.createElement("input");

  // button.edit
  var editButton = document.createElement("button");

  // button.delete
  var deleteButton = document.createElement("button");
  var fixedButton = document.createElement("button");

  var frag = [checkBox, label, editInput, editButton, deleteButton, fixedButton];
  var docFrag = document.createDocumentFragment();
  for (var i = 0; i < frag.length; i++) {
    docFrag.appendChild(frag[i]);
  }

  // Each element needs modified and appending
  checkBox.type = "checkBox";
  editInput.type = "text";

  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  fixedButton.innerText = "fixed";
  fixedButton.className = "fixed";

  label.innerText = taskString;

  listItem.appendChild(docFrag);

  return listItem;
};

// When button is pressed, create task (an li with the text from #new-task)
var addTask = function() {
  var listItem = createNewTaskElement(taskInput.value);
  // Append list item to the incompleteTaskHolder
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  // Clear the input after user Adds a task
  taskInput.value = "";
};

// fixTask
var fixTask = function() {
  var listItem = this.parentNode;
  var taskList = listItem.parentNode;

  if (listItem.classList.contains("fixed")) {
    taskList.appendChild(listItem);
    listItem.classList.remove("fixed");
    var label = listItem.querySelector("label");
    label.style.fontWeight = "normal";
  } else {
    taskList.insertBefore(listItem, taskList.firstChild);
    listItem.classList.add("fixed");
    var label = listItem.querySelector("label");
    label.style.fontWeight = "bold";
  }
};

// Edit an existing task
var editTask = function() {
  var listItem = this.parentNode;

  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");

  var containsClass = listItem.classList.contains("editMode");
  // If the parent class is .editMode
  if (containsClass) {
    label.innerText = editInput.value;
  } else {
    editInput.value = label.innerText;
  }

  // Toggle .editMode on the listItem
  listItem.classList.toggle("editMode");
};

// Delete an existing task
var deleteTask = function() {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;

  // Remove parent list item (to remove also all of its children)
  ul.removeChild(listItem);
};

// Mark task as completed
var taskCompleted = function() {
  // Append the task li to the #completed-tasks
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

// Mark a task as incomplete
var taskIncomplete = function() {
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log("Binding events");
  // Select its children
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");

  var fixedButton = taskListItem.querySelector("button.fixed"); // 상단고정 버튼

  // Bind editTask to edit button
  editButton.onclick = editTask;

  // Bind deleteTask to the delete button
  deleteButton.onclick = deleteTask;

  fixedButton.onclick = fixTask; // 상단고정 버튼 클릭 이벤트 추가

  // Bind checkBoxEventHandler to checkbox
  checkBox.onchange = checkBoxEventHandler;
};

// events
addButton.onclick = addTask;

// Cycle over incompleteTaskHolder ul list items
for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

// Cycle over CompleteTassHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

// Save the diary
var saveDiary = function() {
  var diaryText = diaryInput.value;

  // Create a new paragraph element
  var paragraph = document.createElement("p");
  paragraph.innerText = diaryText;

  // Insert the paragraph after the diaryInput
  diaryInput.parentNode.insertBefore(paragraph, diaryInput.nextSibling);

  // Hide the save button and diary input
  saveButton.style.display = "none";
  diaryInput.style.display = "none";
};

// Bind saveDiary to saveButton
saveButton.onclick = saveDiary;
