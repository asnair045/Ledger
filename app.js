

const STORAGE_KEY = 'ledger.tasks';

let tasks = loadTasks();
let currentFilter = 'all';

const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');
const countLabel = document.getElementById('task-count');
const clearBtn = document.getElementById('clear-completed');
const tabs = document.querySelectorAll('.tab');

function loadTasks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function addTask(text) {
  tasks.push({ id: Date.now().toString(36), text, done: false });
  saveTasks();
  render();
}

function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) task.done = !task.done;
  saveTasks();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  render();
}

function clearDone() {
  tasks = tasks.filter(t => !t.done);
  saveTasks();
  render();
}

function filteredTasks() {
  if (currentFilter === 'open') return tasks.filter(t => !t.done);
  if (currentFilter === 'done') return tasks.filter(t => t.done);
  return tasks;
}

function render() {
  list.innerHTML = '';
  const items = filteredTasks();

  if (items.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'empty';
    empty.textContent = tasks.length === 0
      ? 'Nothing on the ledger yet — add your first item above.'
      : currentFilter === 'open' ? 'No open items.' : 'Nothing marked done yet.';
    list.appendChild(empty);
  }

  items.forEach((task, i) => {
    const li = document.createElement('li');
    li.className = 'row' + (task.done ? ' done' : '');

    const num = document.createElement('span');
    num.className = 'num';
    num.textContent = String(i + 1).padStart(3, '0');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;
    checkbox.setAttribute('aria-label', 'Mark item done');
    checkbox.addEventListener('change', () => toggleTask(task.id));

    const span = document.createElement('span');
    span.className = 'text';
    span.textContent = task.text;

    const delBtn = document.createElement('button');
    delBtn.textContent = '×';
    delBtn.className = 'delete';
    delBtn.setAttribute('aria-label', 'Delete item');
    delBtn.addEventListener('click', () => deleteTask(task.id));

    li.append(num, checkbox, span, delBtn);
    list.appendChild(li);
  });

  const open = tasks.filter(t => !t.done).length;
  countLabel.textContent = `${open} open`;
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  addTask(text);
  input.value = '';
  input.focus();
});

clearBtn.addEventListener('click', clearDone);

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentFilter = tab.dataset.filter;
    render();
  });
});

render();
