

let todoList = {

	todos: [],

	addTodo: function(newItem){
		if(newItem !== ''){
			let item = { todoText: newItem, completed: false};
			this.todos.push(item);
		}
	},

	changeTodo: function(position, newValue){
		this.todos[position].todoText = newValue;
	},

	deleteTodo: function(position){
		this.todos.splice(position, 1);
	},

	toggleCompleted: function(position){
		let todo = this.todos[position];
		todo.completed = !todo.completed;
	},

	toggleAll: function(){

		let totalTodos = this.todos.length;
		let completedTodos = 0;

		this.todos.map( (x) => {
			if(x.completed === true){
				completedTodos++;
			}
		})



		if(completedTodos === totalTodos){
			this.todos.map( (x) => {
				x.completed = false;
			});
		}
		else{
			this.todos.map( (x) => {
				x.completed = true;
			})
		}
	}





};


// let display = document.getElementById('displayAll');
// let toggle = document.getElementById('toggleAll');


// display.addEventListener('click', function(){
//   todoList.displayTodos();
// });

// toggle.addEventListener('click', function(){
// 	todoList.toggleAll();
// })


let handlers = {
	toggleAll: function(){todoList.toggleAll();view.displayTodos();},
	addTodo: function(){
		let newText = document.getElementById('addTodoText');
		todoList.addTodo(newText.value);
		newText.value = '';
		view.displayTodos();
	},
	changeTodo: function(){
		let changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
		let changeTodoTextInput = document.getElementById('changeTodoTextInput');
		todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
		changeTodoPositionInput.value = '';
		changeTodoTextInput = '';
		view.displayTodos();
	},
	deleteTodo: function(position){
		todoList.deleteTodo(position);
		view.displayTodos();
	},
	toggleCompleted: function(){
		let completedPosition = document.getElementById('togglePositionCompletedInput');
		todoList.toggleCompleted(completedPosition.valueAsNumber);
		completedPosition.value = '';
		view.displayTodos();
	}

};




let view = {

	displayTodos: function(){
		let ulList = document.querySelector('ul');
		ulList.innerHTML = '';
		


		todoList.todos.map( (x, index) => {
			let todoLi = document.createElement('li');
			let todoTextWithCompletion = '';

			if(x.completed === true){
				todoTextWithCompletion = 'X' + x.todoText;
			}
			else{
				todoTextWithCompletion = ' ' + x.todoText;
			}
			todoLi.id = index;
			todoLi.textContent = todoTextWithCompletion;
			todoLi.appendChild(this.createDeleteButton());
			ulList.appendChild(todoLi);
		})
	},

	createDeleteButton: function(){
		let deleteButton = document.createElement('button');
		deleteButton.textContent = 'Delete';
		deleteButton.className = 'deleteButton';
		return deleteButton;
	}
};

let todosUl = document.querySelector('ul');
todosUl.addEventListener('click', function(){
	event.target.parentNode.id

	let elementClicked = event.target;
	if(elementClicked.className === 'deleteButton'){
		let position = parseInt(elementClicked.parentNode.id);
		handlers.deleteTodo(position);
	}
})