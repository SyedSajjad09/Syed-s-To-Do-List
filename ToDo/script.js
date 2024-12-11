
const themeToggleBtn = document.querySelector('.theme-toggle-btn');
const body = document.body;
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');


themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    console.log('Theme toggled:', body.classList.contains('dark-mode') ? 'Dark Mode' : 'Light Mode');
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
});


document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }
    loadTasks();
});


function createTask(taskTitle) {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');
    taskItem.style.animation = 'fadeIn 0.5s ease';

    const taskTitleElement = document.createElement('span');
    taskTitleElement.classList.add('task-title');
    taskTitleElement.textContent = taskTitle;

    const taskDeleteBtn = document.createElement('button');
    taskDeleteBtn.classList.add('task-delete-btn');
    taskDeleteBtn.textContent = 'X';


    taskDeleteBtn.addEventListener('click', () => {
        taskItem.style.animation = 'fadeOut 0.5s ease';
        taskItem.addEventListener('animationend', () => {
            taskItem.remove();
            removeTaskFromLocalStorage(taskTitle);
        });
    });

    taskItem.appendChild(taskTitleElement);
    taskItem.appendChild(taskDeleteBtn);
    taskList.appendChild(taskItem);
}


addTaskBtn.addEventListener('click', () => {
    const taskTitle = taskInput.value.trim();
    if (taskTitle !== '') {
        createTask(taskTitle);
        saveTaskToLocalStorage(taskTitle);
        taskInput.value = '';
        console.log('Task Added:', taskTitle);
    } else {
        console.log('Task input is empty.');
    }
});


taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTaskBtn.click();
    }
});


/*function saveTaskToLocalStorage(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
*/

/*function removeTaskFromLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter((t) => t !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    console.log('Task Removed:', task);
}
*/

/*function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach((task) => createTask(task));
    console.log('Tasks Loaded:', tasks);
}
    */


const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }

    @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-10px); }
    }
`;
document.head.appendChild(style);
