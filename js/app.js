//Problem: user interaction doesn't provide desired results.
//Solution: add interactivity so the user can manage daily tasks.
var taskInput = document.getElementById('new-task'); //new-task
var addButton = document.getElementsByTagName('button')[0]; //first button
var incompleteTasksHolder = document.getElementById('incomplete-tasks'); //ul#incomplete-tasks
var completedTasksHolder = document.getElementById('completed-tasks');//ul#completed-tasks


//New task list item
var createNewTaskElement = function(taskString){
//create listItem
  var listItem = document.createElement("li");
  
  //input (checkbox)
  var checkBox = document.createElement("input");
    //label
  var label = document.createElement("label");
    //input (text)
  var editInput = document.createElement("input");
    //button.edit
  var editButton = document.createElement("button");
    //button.delete
  var deleteButton = document.createElement("button");
  
  checkBox.type = "checkbox";
  editInput.type = "text";
  
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  
  
  label.innerText = taskString;
    //each elements needs modified and appended
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  
return listItem;
};

//Add a new task
var addTask = function() {
  console.log('add new task');

    //create a new list item with the text from #new-task:

var listItem = createNewTaskElement(taskInput.value);
//Append listItem to incompleteTasksHolder
  if(taskInput.value.length){
incompleteTasksHolder.appendChild(listItem);
bindTaskEvents(listItem, taskCompleted);
 taskInput.value = "";
  } else {
   alert('please add some text');
  }
  };


//Edit an existing task
var editTask = function() {
  console.log('edit task');
  
  var listItem = this.parentNode;
  
  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
  var editButton = listItem.querySelector("button");
  var containsClass = listItem.classList.contains("editMode");
  if(containsClass) {
    editButton.innerText = "Edit";
    label.innerText = editInput.value;
  //Swith from .editMode
  //label text become the input's value
  } else {
   //else
    //switch to .editMode
    //input value becomes the label's text
    editButton.innerText = "Save";
    editInput.value = label.innerText;
    
  }
  //Toggle .editMode on the parent
  listItem.classList.toggle("editMode");
};  



//Delete an existing task
var deleteTask = function(){
 console.log('delete task');
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
};

//When the delete button is pressed - > remove the parent list item from the ul

//Mark a task as complete
var taskCompleted = function(){
  console.log('task complete');
  //Append the task list item to the #completed-tasks
var listItem = this.parentNode;
completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};
    

//Mark a task as incomplete
var taskIncomplete = function(){
 console.log('task incomplete');
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};
//When the checkbox is unchecked 
    //Append the task list item to the #incomplete-tasks

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log('bind list item events');
  //select it's hilredn
  var checkbox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");
  //bind edittask to edti button
  editButton.onclick = editTask;
  //bind deleteTask to delete button
  deleteButton.onclick = deleteTask;
  //bind checkboxEventHandler to checkbox
  checkbox.onchange = checkBoxEventHandler;
  
  
};

//Set the click handler to the addTask function
addButton.addEventListener("click", addTask);


//Cycle over the incompletetasksHolder ul list items
for(var i = 0; i<incompleteTasksHolder.children.length; i++) {
   bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}
  //for each list item
  //bind events to list item's children (taskCompleted)


//Cycle over the completetasksHolder ul list items
  for(var i = 0; i< completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
  }
  //bind events to list item's children (taskIncompleted);
