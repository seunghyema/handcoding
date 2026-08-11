const todoInputs = document.querySelectorAll(".todo-text");
const checkboxes = document.querySelectorAll(".todo-checkbox");
const todoList = document.querySelector(".todo-list");

todoInputs.forEach((input, index) => {
  input.addEventListener("keydown", function (event) {
    if (event.key == "Enter") {
      event.preventDefault();

      if (index + 1 < todoInputs.length) {
        todoInputs[index + 1].focus();
      } else {
        createNewTodoItem();
      }
    }
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

  newTodoInput.addEventListener("keydown", function (event) {
    if (event.key == "Enter") {
      event.preventDefault();
      createNewTodoItem();
    }
  });
  newTodoInput.focus();
}

todoList.addEventListener("click", function(event){
    if(event.target.classList.contains("delete-btn")){
        const itemToDelete = event.target.parentElement;
        itemToDelete.remove();
    }
})
