'use strict';

/* your code goes here! */

class Task {
  constructor(descr, comp){
    this.description = descr;
    this.complete = comp;
  }

  render() {
    var newLi = document.createElement('li');
    newLi.innerHTML = this.description;
    if (this.complete) {
      newLi.className = 'font-strike';
    }
    newLi.addEventListener('click', () => {
      this.toggleFinished();
      newLi.classList.toggle('font-strike'); 
    });
    return newLi;
  }

  toggleFinished() {
    this.complete = !this.complete;
  }

}

class TaskList {
  constructor(taskArr) {
    this.tasks = taskArr;
  }

  addTask(descr) {
    var newTask = new Task(descr, false);
    this.tasks.push(newTask);
  }

  render() {
    var newOl = document.createElement('ol');
    this.tasks.forEach((task) => {
      newOl.appendChild(task.render());
    })
    return newOl;
  }

}

class NewTaskForm {
  constructor(addTaskToList) {
    this.submitCallback = addTaskToList;
  }

  render() {
    var newForm = document.createElement('form');
    var input = document.createElement('input');
    var btn = document.createElement('button');
    input.classList.add('form-control', 'mb-3');
    input.setAttribute('placeholder', "What else do you have to do?");
    newForm.appendChild(input);
    
    btn.classList.add('btn', 'btn-primary');
    btn.innerHTML = "Add task to list";
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      this.submitCallback(input.value);
    });
    newForm.appendChild(btn);
    return newForm;
  }

}

class App {
  constructor(parent, tl) {
    this.parentElement = parent;
    this.taskList = tl;
  }

  render() {
    this.parentElement.appendChild(this.taskList.render());
    var newTf = new NewTaskForm((descr)=> {
      this.addTaskToList(descr);
    });
    this.parentElement.appendChild(newTf.render());
  }

  addTaskToList(descr) {
    this.taskList.addTask(descr);
    while (this.parentElement.hasChildNodes()) {
      this.parentElement.removeChild(this.parentElement
        .firstChild);
    }
    this.render();
  }

}

let newApp = new App(document.querySelector('#app'), (new TaskList([new Task("Make some classes", true), new Task("Arrow some functions", false)])));
newApp.render();

//Make functions and variables available to tester. DO NOT MODIFY THIS.
if(typeof module !== 'undefined' && module.exports){
  /* eslint-disable */
  if(typeof Task !== 'undefined') 
    module.exports.Task = Task;
  if(typeof TaskList !== 'undefined') 
    module.exports.TaskList = TaskList;
  if(typeof NewTaskForm !== 'undefined') 
    module.exports.NewTaskForm = NewTaskForm;
  if(typeof App !== 'undefined') 
    module.exports.App = App;
}
