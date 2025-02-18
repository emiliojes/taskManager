const taskForm = document.getElementById("task-form");

const taskList = document.getElementById("task-list");

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const taskInput = document.getElementById("task-input");
  const task = taskInput.value;
  console.log(task)
  if(task) {
    taskList.appendChild(createTaskElement(task))
    taskInput.value = '';
  }

  function createTaskElement(task){
    const li = document.createElement("li")
    li.textContent = task;

    const deleteButton = createButton("❌", "delete-btn");

    //deleteButton.addEventListener("click", () => li.remove())

    li.appendChild(deleteButton)
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
    }
  })
 

  function deleteTask (taskItem) {
    if(confirm("Are you sure, you want to delete this item?")){
      taskItem.remove()
    }
  }



  

  
});