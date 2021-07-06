var Todo = /** @class */ (function () {
  function Todo() {
      this.taskList = [];
      this.input = document.getElementById('input');
      this.listTask();
  }
  
        const url = "https://my-json-server.typicode.com/C-Rish/todolist";
        const form = document.getElementById('form');
        const input = document.getElementById('input');
        const todosUL = document.getElementById('todos');
        const dateToday = document.getElementById('date');

        const todos = JSON.parse(localStorage.getItem('todos'));

        var today = new Date();
        var date = today.getFullYear() + '/' + (today.getMonth()+1) + '/' + today.getDate();
        dateToday.innerText = date;

      Todo.prototype.listTask = function () {
          this.apiRequests('GET', url, null)
      }

      Todo.prototype.addTask = function () {
          let value = document.getElementById('input').value;
          if (value) {
              let dataObject = {
                  task: value,
                  completed: false
              }
              this.apiRequests('POST', url, JSON.stringify(dataObject))
          }
      };

      Todo.prototype.completeTask = function (elemId) {
        let id = parseInt(elemId.split('-')[1])
        for (let index in this.taskList) {
            if (this.taskList[index]['id'] == id) {
                this.taskList[index]['completed'] = !this.taskList[index]['completed'];
                console.log(this.taskList[index])
                this.apiRequests('PATCH', url + id, JSON.stringify(this.taskList[index]))
            }
        }
    }


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

            
            check.addEventListener('change', (e) => {
              todoEL.classList.toggle('completed');

              if (e.target && e.target.classList.contains('completed')) {
                this.completeTask(e.target.id);
              }

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


        Todo.prototype.apiRequests = function (method, url, data) {
          let httpRequest = new XMLHttpRequest();
          httpRequest.open(method, url, true);
          if (method === 'POST') {
              httpRequest.setRequestHeader('Content-type', 'application/json');
              httpRequest.onload = (response) => {
                  let responseObj = JSON.parse(response.target.responseText);
                  this.taskList = that.taskList.concat([responseObj]);
                  document.getElementById('input').value = '';
              };
          }

          if (method === 'GET') {
              httpRequest.onload = (response) => {
                  this.taskList = JSON.parse(response.target.responseText);
              }
          }
          if (method === 'PATCH') {
              httpRequest.setRequestHeader('Content-type', 'application/json');
              httpRequest.onload = (response) => {
                  this.listTask();
              }
          }

          httpRequest.send(data);

      }

        return Todo;
      }()
  );
  var todo = new Todo();
