const taskInput = document.querySelector(".task-input input"),
filters = document.querySelectorAll(".filters span"),
clearAll = document.querySelector(".clr-btn"),
taskBox = document.querySelector(".task-box");

let editID ;
let isEditable = false;

let todos = JSON.parse(localStorage.getItem("todo-list"));

filters.forEach(btn => {
    btn.addEventListener("click" , () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showToDoList(btn.id);
    })
  
})

function showToDoList(filter){
    let liTag = "";
    if(todos){
        todos.forEach((todo,id) => {
            let isCompleted = todo.status == "completed" ? "checked" : "";

            if(filter == todo.status || filter == "all"){
                    liTag += `<li class="task">
                    <label for="${id}">
                        <input onclick = "updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                        <p class = "${isCompleted}" >${todo.name}</p>
                    </label>
                    <div class="settings">
                        <i onclick = "showMenu(this)" class="fa-solid fa-ellipsis"></i>
                        <ul class="task-menu">
                            <li onclick = 'editTask(${id} , "${todo.name}")'><i class="fa-regular fa-pen-to-square"></i>Edit</li>
                            <li onclick = 'deleteTask(${id} , "${filter}")'><i class="fa-solid fa-trash"></i>Delete</li>
                        </ul>
                    </div>
                </li>
                `
            }
           
        
        })
    }
    taskBox.innerHTML = liTag || `<span>You don't have any task here</span>`;
}
showToDoList("all");

function updateStatus(selectedTask){
    // console.log(selectedTask);
    let taskName = selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked){
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed";
    }
    else{
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list" , JSON.stringify(todos));
}

function showMenu(selectedTask){
    let menuDiv = selectedTask.parentElement.lastElementChild;
    menuDiv.classList.add("show");
    document.addEventListener("click" , e => {
        if(e.target.tagName != "I" || e.target != selectedTask){
            menuDiv.classList.remove("show");
        }
    })
}

function deleteTask(deleteId,filter){
    // console.log(deleteId);
    todos.splice(deleteId , 1);
    localStorage.setItem("todo-list" , JSON.stringify(todos));
    showToDoList(filter);
}

function editTask(taskID , taskName){
    // console.log(taskID , taskName);
    editID = taskID;
    isEditable = true;
    taskInput.value = taskName;
}

clearAll.addEventListener("click" , () => {
    todos.splice(0 , todos.length);
    localStorage.setItem("todo-list" , JSON.stringify(todos));
    showToDoList("all");

})

taskInput.addEventListener("keyup" , e => {
    let userTask = taskInput.value.trim();
  
    if(e.key == 'Enter' && userTask){
        if(!isEditable){
            if(!todos){
                todos = [];
            }
            let taskInfo = {name:userTask , status:"pending"};
            todos.push(taskInfo);
        }
        else{
            isEditable = false;
            todos[editID].name = userTask;
        }
        
      
        taskInput.value = "";
        localStorage.setItem("todo-list" , JSON.stringify(todos));

        showToDoList("all");
    }
  
})