import Backbone from 'backbone';

import TaskView from './task_view';
import Task from '../models/task';
import CurrentTaskView from './current_selected_view';

const TaskListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;

    this.listenTo(this.model, 'update', this.render);
  },
  events: {
    'click #add-new-task': 'addTask',
  },
  updateStatusMessageFrom(messageHash) {
    const $statusMessages = this.$('#status-messages');
    $statusMessages.empty();
    Object.keys(messageHash).forEach((messageType) => {
      messageHash[messageType].forEach((message) => {
        $statusMessages.append(`<li>${message}</li>`);
      });
    });
    $statusMessages.show();
  },
  updateStatusMessage(message) {
    this.updateStatusMessageFrom({
      'task': [message],
    });
  },
  addTask(event) {
    event.preventDefault();

    const formData = this.getFormData();
    const newTask = new Task(formData);
    if (newTask.isValid()) {
      this.model.add(newTask);
      this.clearFormData();
      this.updateStatusMessage(`${newTask.get('task_name')} Created!`);
    }
    else {
      console.log('ERROR');
      this.updateStatusMessageFrom(newTask.validationError);
      newTask.destroy();
    }
  },
  clearFormData() {
    ['task_name', 'assignee'].forEach((field) => {
      this.$(`#add-task-form input[name=${field}]`).val('');
    });
  },
  getFormData() {
    const taskData = {};
    ['task_name', 'assignee'].forEach((field) => {
      const val =
        this.$(`#add-task-form input[name=${field}]`).val();
        if (val !== '') {
          taskData[field] = val;
        }
    });

    return taskData;
  },
  render() {
    this.$('#todo-items').empty();
    this.$('#selected-task').empty();
    const currentTaskView = new CurrentTaskView({
      bus: this.bus,
      el: '#selected-task',
    });
    currentTaskView.render();
    this.model.each((task) => {
      const taskView = new TaskView({
        model: task,
        template: this.template,
        tagName: 'li',
        className: 'task',
        bus: this.bus,
      });
      this.$('#todo-items').append(taskView.render().$el);
      this.listenTo(taskView, 'edit_me', this.editTask);
    });
    return this;
  },
  editTask(task) {
    // this.model.remove(task);
    this.$('#add-task-form input[name=task_name]').val(task.get('task_name'));
    this.$('#add-task-form input[name=assignee]').val(task.get('assignee'));
    task.destroy();
  },





});

export default TaskListView;
