import Backbone from 'backbone';

import TaskView from './task_view';
import Task from '../models/task';

const TaskListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;

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

    this.model.each((task) => {
      const taskView = new TaskView({
        model: task,
        template: this.template,
        tagName: 'li',
        className: 'task',
      });
      this.$('#todo-items').append(taskView.render().$el);
    });

    return this;
  },





});

export default TaskListView;
