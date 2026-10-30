const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');

const initialTodos = [
  { id: 1, text: 'Вивчити HTML', checked: true },
  { id: 2, text: 'Вивчити CSS', checked: true },
  { id: 3, text: 'Вивчити JavaScript', checked: false }
];

let todos = JSON.parse(localStorage.getItem('todos')) || initialTodos;

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function updateCounter() {
  const totalCount = todos.length;
  const uncheckedCount = todos.filter(todo => !todo.checked).length;

  itemCountSpan.textContent = totalCount;
  uncheckedCountSpan.textContent = uncheckedCount;
}

function renderTodo(todo) {
  const checkedAttr = todo.checked ? 'checked' : '';
  const textClass = todo.checked ? 'text-success text-decoration-line-through' : '';

  return `
    <li class="list-group-item">
      <input type="checkbox" class="form-check-input me-2" id="todo-${todo.id}" ${checkedAttr} onchange="checkTodo(${todo.id})" />
      <label for="todo-${todo.id}"><span class="${textClass}">${todo.text}</span></label>
      <button class="btn btn-danger btn-sm float-end" onclick="deleteTodo(${todo.id})">delete</button>
    </li>
  `;
}

function render(todosArray = todos) {
  const htmlRows = todosArray.map(renderTodo).join('');
  list.innerHTML = htmlRows;
}

function newTodo() {
  const todoText = prompt('Введіть текст нової справи:');
  if (todoText && todoText.trim() !== '') {
    const todo = {
      id: Date.now(),
      text: todoText.trim(),
      checked: false
    };

    todos.push(todo);
    console.log('Поточний список справ після додавання:', todos);
    saveTodos();
    render();
    updateCounter();
  }
}

function checkTodo(id) {
  const targetTodo = todos.find(todo => todo.id === id);
  if (targetTodo) {
    targetTodo.checked = !targetTodo.checked;
    saveTodos();
    render();
    updateCounter();
  }
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  saveTodos();
  render();
  updateCounter();
}

render();
updateCounter();