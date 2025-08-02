let tasks = [
  {
    title: "قراءة كتاب",
    date: "15/10/2030",
    isDone: false,
  },
  {
    title: "إنهاء المشروع النهائي",
    date: "15/10/2030",
    isDone: true,
  },
  {
    title: "إنهاء كورس الجافاسكريبت",
    date: "15/10/2030",
    isDone: false,
  },
];

function getTasksFromStorage() {
  let savedTasks = JSON.parse(localStorage.getItem("tasks"));
  tasks = savedTasks ?? tasks;
}

function fillTasksOnThePage() {
  document.getElementById("tasks").innerHTML = "";
  let index = 0;
  for (task of tasks) {
    let content = `<div class="task ${task.isDone ? "done" : ""}">
          <div style="width: 70%">
            <h2>${task.title}</h2>
            <div>
              <span class="material-symbols-outlined">
                calendar_month
              </span>
              <span>${task.date}</span>
            </div>
          </div>
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
              width: 20%;
            "
          >
            <button
            onclick="deleteTask(${index})"
              class="circular"
              style="background-color: rgb(114, 0, 0); color: white"
            >
              <span class="material-symbols-outlined"> delete </span>
            </button>
            ${
              task.isDone
                ? `<button
            onclick="toggleTaskCompletion(${index})"
              class="circular"
              style="background-color: rgb(118, 0, 101); color: white"
            >
              <span class="material-symbols-outlined"> cancel </span>
            </button>`
                : `<button
            onclick="toggleTaskCompletion(${index})"
              class="circular"
              style="background-color: rgb(0, 150, 30); color: white"
            >
              <span class="material-symbols-outlined"> done </span>
            </button>`
            }
            <button
            onclick="editTask(${index})"
              class="circular"
              style="
                background-color: rgba(0, 16, 197, 0.692);
                color: white;
              "
            >
              <span class="material-symbols-outlined"> edit </span>
            </button>
          </div>
        </div>`;
    document.getElementById("tasks").innerHTML += content;
    index++;
  }
}

getTasksFromStorage();

fillTasksOnThePage();
document.getElementById("add-btn").addEventListener("click", function () {
  let taskName = prompt("الرجاء إدخال عنوان المهمة");
  if (taskName === null || taskName.trim() === "") return;

  let now = new Date();

  let day = now.getDate();
  let month = now.getMonth() + 1;
  let year = now.getFullYear();

  let hours = now.getHours();
  let minutes = now.getMinutes();

  let ampm = hours >= 12 ? "مساءً" : "صباحًا";

  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  let date = `${day}-${month}-${year} | ${hours}:${minutes} ${ampm}`;

  let taskObj = {
    title: taskName,
    date: date,
    isDone: false,
  };
  tasks.push(taskObj);
  storageTasks();
  fillTasksOnThePage();
});

function deleteTask(index) {
  let task = tasks[index];
  let isConfirmed = confirm("هل أنت متأكد من حذف : " + task.title + "؟");

  if (isConfirmed) {
    tasks.splice(index, 1);
    storageTasks();
    fillTasksOnThePage();
  }
}

function editTask(index) {
  let task = tasks[index];
  let newTaskTitl = prompt("الرجاء إدخال عنوان المهمة الجديد", task.title);
  if (newTaskTitl === null || newTaskTitl.trim() === "") return;

  task.title = newTaskTitl;
  storageTasks();
  fillTasksOnThePage();
}

function toggleTaskCompletion(index) {
  let task = tasks[index];
  task.isDone = !task.isDone;
  storageTasks();
  fillTasksOnThePage();
}

function storageTasks() {
  let taskString = JSON.stringify(tasks);
  localStorage.setItem("tasks", taskString);
}
