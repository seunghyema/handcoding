const todoInputs = document.querySelectorAll(".todo-text");
const checkboxes = document.querySelectorAll(".todo-checkbox");
const todoList = document.querySelector(".todo-list");



todoInputs.forEach((input, index) => {
  input.addEventListener("keydown", function (event) {
    if (event.key == "Enter") {
      event.preventDefault();

      const currentItem = input.closest('.todo-item');
      const nextItem = currentItem.nextElementSibling;

      if(nextItem){
        nextItem.querySelector('.todo-text').focus();
      }else{
        createNewTodoItem();
      }
    }
    saveData();
  });
  
});

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", function (event) {
    const todoItem = event.target.closest(".todo-item");
    const todoInput = todoItem.querySelector(".todo-text");

    if (event.target.checked) {
      todoInput.classList.add("completed");
    } else {
      todoInput.classList.remove("completed");
    }
     saveData();
  });
});

function createNewTodoItem() {
  const todoList = document.querySelector(".todo-list");

  const newLi = document.createElement("li");
  newLi.className = "todo-item";

  newLi.innerHTML = `
        <input type = "checkbox" class="todo-checkbox">
        <input type = "text" class="todo-text">
        <input type = "text" class ="todo-priority">
        <button class= "delete-btn">X</button>`;
  todoList.appendChild(newLi);

  const newTodoInput = newLi.querySelector(".todo-text");
  const newCheckbox = newLi.querySelector('.todo-checkbox');

  newTodoInput.addEventListener("keydown", function (event) {
    if (event.key == "Enter") {
      event.preventDefault();
      createNewTodoItem();
      saveData();
    }
  });

  newCheckbox.addEventListener("change", function(event){
    if(event.target.checked){
      newTodoInput.classList.add('completed');
    }else{
      newTodoInput.classList.remove('completed');
    }
    saveData();
  })
  newTodoInput.focus();
}

todoList.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-btn")) {
    const itemToDelete = event.target.parentElement;
    itemToDelete.remove();
    saveData();
  }
});

function saveData() {
  const items = [];
  const todoItems = document.querySelectorAll(".todo-item");

  todoItems.forEach((item) => {
    const text = item.querySelector(".todo-text").value;
    const priority = item.querySelector(".todo-priority").value;
    const checked = item.querySelector(".todo-checkbox").checked;

    items.push({ text, priority, checked });
  });

  localStorage.setItem("todoList", JSON.stringify(items));

  const memoText = document.querySelector("#memo").value;
  localStorage.setItem("memo-section", memoText);
}

function loadData() {
  const savedMemo = localStorage.getItem("memo-section");
  const savedTodos = localStorage.getItem("todoList");

  if (savedMemo) {
    document.querySelector("#memo").value = savedMemo;
  }

  if (savedTodos) {
    const items = JSON.parse(savedTodos);
   

    items.forEach((item, index) => {
      let currentTodoItems = document.querySelectorAll(".todo-item");
      if(index>=currentTodoItems.length){
        createNewTodoItem();
      }
      currentTodoItems = document.querySelectorAll(".todo-item");

      currentTodoItems[index].querySelector(".todo-text").value = item.text;
      currentTodoItems[index].querySelector(".todo-priority").value = item.priority;
      currentTodoItems[index].querySelector(".todo-checkbox").checked = item.checked;

      if (item.checked) {
        currentTodoItems[index].querySelector(".todo-text").classList.add("completed");
      }
    });
  }
}

todoList.addEventListener("input", function(){
  saveData();
})

loadData();
