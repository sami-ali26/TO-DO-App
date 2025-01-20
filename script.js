document.addEventListener("DOMContentLoaded", function () {
  let input = document.getElementById("inputbox");
  let addbutton = document.getElementById("addbutton");
  let ultag = document.getElementById("todo_list");
  let reset = document.getElementById("delete");
  let tasksarray = JSON.parse(localStorage.getItem("Taskkey")) || [];

  tasksarray.forEach((eachtask) => {
    rendermytask(eachtask);
  });

  addbutton.addEventListener("click", function () {
    let currenttask = input.value.trim();
    if (currenttask === "") return;

    let taskobj = {
      id: Date.now(),
      text: currenttask,
      completed: false,
    };
    tasksarray.push(taskobj);
    savinginlocal();
    rendermytask(taskobj);
    input.value = "";
  });
  function savinginlocal() {
    localStorage.setItem("Taskkey", JSON.stringify(tasksarray));
  }

  function rendermytask(tasks) {
    console.log(tasks);

    let li = document.createElement("li");
    li.setAttribute("data-id", tasks.id);

    li.innerHTML = `<p>${tasks.text}</p> <button class="delete">Delete</button>`;

    let taskText = li.querySelector("p");
    let deleteBtn = li.querySelector(".delete");

    reset.addEventListener("click", function (e) {
      e.stopPropagation();
      if (tasksarray.length > 0) {
        alert("Are you sure?");
        let allli = document.querySelectorAll("li");
        allli.forEach((e) => e.remove());
      }
      localStorage.removeItem("Taskkey");
    });

    taskText.addEventListener("click", function () {
      tasks.completed = !tasks.completed;
      taskText.classList.toggle("complete");
      savinginlocal();
    });

    deleteBtn.addEventListener("click", function () {
      tasksarray = tasksarray.filter((t) => t.id !== tasks.id);
      li.remove();
      savinginlocal();
    });

    ultag.appendChild(li);
  }
});
