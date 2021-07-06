const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUL = document.getElementById('todos');
const name1 = document.getElementById('personName');
const dateToday = document.getElementById('date');

const todos = JSON.parse(localStorage.getItem('todos'));
// let person = prompt("Please enter your name:", "Harry Potter");
// name1.innerText = person;

var today = new Date();
var date = today.getFullYear() + '/' + (today.getMonth()+1) + '/' + today.getDate();
dateToday.innerText = date;


if (todos) {
  todos.forEach(todo => addTodo(todo));
}

form.addEventListener('submit',(e)=>{
  e.preventDefault();
  addTodo();
});

function addTodo(todo){
  let todoText = input.value;
  
  if(todo){
    todoText = todo.text;
  }

  if(todoText){
    const todoEL = document.createElement('li');
    const icon = document.createElement('i');
    icon.classList.add("fas","fa-times-circle");
    const editIcon = document.createElement('i');
    editIcon.classList.add("fas","fa-edit");
    const check = document.createElement('input');
    check.setAttribute("type", "checkbox"); 
    
    if (todo && todo.completed) {
      todoEL.classList.add('completed');
    }
    todoEL.innerText = todoText;

    
    check.addEventListener('change', () => {
      todoEL.classList.toggle('completed');
      updateLS();
    });
    
    
    editIcon.addEventListener("click",()=>{
      editIcon.classList.add('red');
      todoEL.setAttribute("contentEditable","true");
      
      todoEL.addEventListener("keypress",(e)=>{
        if (e.key === "Enter")
        todoEL.setAttribute("contentEditable","false");
        editIcon.classList.remove('red');
    });
      // updateLS();
    });
    
    icon.addEventListener('click', (e) =>  {
      e.preventDefault();
      todoEL.remove();
      updateLS();
    });
   

    todoEL.appendChild(check);
    todoEL.appendChild(editIcon);
    todoEL.appendChild(icon);
    todosUL.appendChild(todoEL);
    input.value = '';

    updateLS();
  }
}

function updateLS() {
  todosEL = document.querySelectorAll('li');
  const todos = [];
  let i = 1;

  todosEL.forEach(todoEL => {
    i++;
    todos.push({
      text: todoEL.innerText,
      completed: todoEL.classList.contains('completed')
    });
    // todos.
  });

  localStorage.setItem('todos',JSON.stringify(todos));
}


