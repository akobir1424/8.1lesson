const btnSubmit = document.querySelector('.todo-btn') as HTMLButtonElement;
const inputTodo = document.querySelector('.todo-input') as HTMLInputElement;
const formTodo = document.querySelector('.todo-form') as HTMLFormElement;
const todoList = document.querySelector('.todo-list')!;
const btnDeleteAll = document.querySelector('.todo-delete-all') as HTMLButtonElement;

const handleSubmit = (e: Event) => {
    e.preventDefault();
    const newTodo: Todo = {
        id: Date.now(),
        todo: inputTodo.value,
        completed: false
    };

    todos.push(newTodo);
    saveTodos();

    appendTodo(newTodo);
    inputTodo.value = '';
};

interface Todo {
    id: number;
    todo: string;
    completed: boolean;
};

const todos: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]');
console.log(todos);
window.addEventListener('DOMContentLoaded', () => {
    todos.forEach(todo => appendTodo(todo));
});

const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
};

const appendTodo = (newTodo: Todo) => {
    const newLi = document.createElement('li');
    const checkB = document.createElement('input');
    checkB.type = 'checkbox';
    checkB.checked = newTodo.completed;
    checkB.onchange = () => {
        console.log(checkB.checked);
        newTodo.completed = checkB.checked;
        saveTodos();
    };
    newLi.append(newTodo.todo, checkB);
    todoList?.prepend(newLi);
};

formTodo.addEventListener('submit', e => handleSubmit(e));

const clearTodos = () => {
    todos.length = 0;
    saveTodos();
    todoList.innerHTML = '';
};

btnDeleteAll.onclick = () => clearTodos();

