const taskInput = document.getElementById("taskInput")
const addButton = document.getElementById("addButton")

let tasks = [];



const updateTaskList = () => {
    const taskList = document.getElementById("task-list")
    taskList.innerHTML = ""

    tasks.forEach((task,index) =>{
        const listItem = document.createElement("li")
        listItem.innerHTML = `
        <div class="taskItems">
        <div class="task ${task.completed ? 'completed': ''}">
        <input type="checkbox" class="checkbox" ${task.completed?'checked': ''}/>
        <p>${task.text}</p>
        </div>
        <div class="icons">
        <img src="edit2.png" onclick="editTask(${index})" />
        <img src="delete4.png" onclick="deleteTask(${index})" />
        </div>
        </div>
        `;

        listItem.querySelector('input[type="checkbox"]').addEventListener('change', () => toggleTaskComplete(index));
    taskList.appendChild(listItem);

    });
};




const toggleTaskComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
  updateTaskList();
  updateStats();
  saveTasks();
};


const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateTaskList();
  updateStats();
  saveTasks();
};

const editTask = (index)=> {
    const taskInput = document.getElementById('taskInput')
    taskInput.value = tasks[index].text

    tasks.splice(index,1)
    updateTaskList()
    updateStats();
    saveTasks();
};

const updateStats = ()=>{
    const completedTasks = tasks.filter(task=> task.completed).length
    const totalTasks = tasks.length
     const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
    const progressBar = document.getElementById('progress')

    progressBar.style.width = `${progress}%`;
    document.getElementById(
        "numbers"
        ).innerText = `${completedTasks} / ${totalTasks}`
} 

addButton.addEventListener("click", function(e) {
  e.preventDefault();
  addTask();
});

function saveTasks(){
  localStorage.setItem('tasks', JSON.stringify(tasks));
 }


function loadTasks() {
  const storedTasks =(localStorage.getItem('tasks'))
if (storedTasks) {
  tasks = JSON.parse(storedTasks);
    updateTaskList()
    updateStats();

}
}
const addTask = () => {
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({text: text, completed: false});
        taskInput.value = "";
        updateTaskList()
        updateStats();
        saveTasks();
    }
    
};

loadTasks();