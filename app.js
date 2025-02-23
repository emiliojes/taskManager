const taskForm = document.getElementById("task-form");

const taskList = document.getElementById("task-list");

loadTasks();

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const taskInput = document.getElementById("task-input");
  const task = taskInput.value.trim();
  //console.log(task)
  if(task) {
    const taskElement = createTaskElement(task)
    taskList.appendChild(taskElement)
    storeTaskInLocalStorage(task)
    taskInput.value = "";
  }

})

  function createTaskElement(task){
    const li = document.createElement("li")
    li.textContent = task;

    const deleteButton = createButton("❌", "delete-btn");
    const editButton = createButton("✏️", "edit-btn");
    
    li.appendChild(deleteButton)
    li.appendChild(editButton);
    return li
    
  }

  function createButton (text, className){
    const btn = document.createElement("span")
    btn.textContent = text;
    btn.className = className;
    return btn;
  }

   
  taskList.addEventListener("click", (event) => {
    //By clicking the element we will see class
    //console.log(event.target);
    if (event.target.classList.contains("delete-btn")){
      deleteTask(event.target.parentElement)
    } else if (event.target.classList.contains("edit-btn")){
      editTask(event.target.parentElement)
    }

  

  
});


function deleteTask (taskItem) {
  const taskText = taskItem.firstChild.textContent.trim();
  if(confirm("Are you sure, you want to delete this item?")){
    taskItem.remove()
    removeTaskFromLocalStorage(taskText)
  }
}

function editTask(taskItem){
  const taskText = taskItem.firstChild.textContent.trim();
  const newTask = prompt("Edit task:", taskText)?.trim();
  if(newTask && newTask !== taskText){
    taskItem.firstChild.textContent = newTask;
    updateLocalStorage()
  }
}

function storeTaskInLocalStorage(task){
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks))
}


function loadTasks(){
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks.forEach((task) => {
    taskList.appendChild(createTaskElement(task.trim()))
  })
}

function updateLocalStorage(){
  const tasks = Array.from(taskList.querySelectorAll("li")).map((li) => li.firstChild.textContent.trim());

  localStorage.setItem("tasks",JSON.stringify(tasks))
  //console.log(tasks)

}

function removeTaskFromLocalStorage(taskText){
  let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks = tasks.filter((task) => task.trim() !== taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

const themeToggleButton = document.getElementById("toggle-theme-btn");
const currentTheme = localStorage.getItem("theme");

themeToggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme")

  const theme = document.body.classList.contains("dark-theme") 
  ? "dark" 
  : "light";
  localStorage.setItem("theme", theme);
})

if (currentTheme === "dark"){
  document.body.classList.add("dark-theme")
}