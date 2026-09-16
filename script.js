const taskInput = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addBtn");
const taskList = document.querySelector("#taskList");

// Purana data load karo
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(function (task, index) {
    let li = document.createElement("li");
    if (task.done) li.classList.add("done");

    let span = document.createElement("span");
    span.innerText = task.text;
    li.appendChild(span);

    // Buttons ka group banaya
    let actions = document.createElement("div");
    actions.classList.add("actions");

    let completeBtn = document.createElement("button");
    completeBtn.innerText = "✔";
    actions.appendChild(completeBtn);

    let delBtn = document.createElement("button");
    delBtn.innerText = "✘";
    actions.appendChild(delBtn);

    li.appendChild(actions);

    completeBtn.addEventListener("click", function () {
      tasks[index].done = !tasks[index].done;
      saveTasks();
      renderTasks();
    });

    delBtn.addEventListener("click", function () {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    taskList.appendChild(li);
  });
}

// Add button click
addBtn.addEventListener("click", function () {
  let task = taskInput.value.trim();
  if (task === "") return;

  tasks.push({ text: task, done: false });
  saveTasks();
  renderTasks();
  taskInput.value = "";
});

// Page load hote hi purani list dikhao
renderTasks();
