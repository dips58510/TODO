 let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function addTask() {
      const input = document.getElementById("taskInput");
      const taskText = input.value.trim();
      if (taskText === "") return;

      tasks.push({ text: taskText, completed: false });
      saveTasks();
      input.value = "";
      renderTasks();
    }

    function toggleTask(index) {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    }

    function deleteTask(index) {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    }

    function filterTasks(filter) {
      renderTasks(filter);
    }

    function renderTasks(filter = "all") {
      const list = document.getElementById("taskList");
      list.innerHTML = "";

      tasks.forEach((task, index) => {
        if (
          filter === "active" && task.completed ||
          filter === "completed" && !task.completed
        ) return;

        const li = document.createElement("li");
        li.className = `todo-item ${task.completed ? "completed" : ""}`;

        li.innerHTML = `
          <span onclick="toggleTask(${index})">${task.text}</span>
          <div>
            <button class="btn-action text-success" onclick="toggleTask(${index})">
              <i class="fa ${task.completed ? "fa-rotate-left" : "fa-check"}"></i>
            </button>
            <button class="btn-action text-danger" onclick="deleteTask(${index})">
              <i class="fa fa-trash"></i>
            </button>
          </div>
        `;

        list.appendChild(li);
      });
    }

    // Initial render
    renderTasks();