import Backbone from 'backbone';
import _ from 'underscore';
import TaskView from '../views/task_view';
import Task from '../models/task';

const TaskListView = Backbone.View.extend({
  initialize(params) {
    this.taskTemplate = params.taskTemplate;
    this.listenTo(this.model, 'update', this.render);
  },
  render() {
    this.$('#todo-items').empty();
    this.model.each((task) => {
      const taskView = new TaskView({
        model: task,
        template: this.taskTemplate,
        tagName: 'li',
        className: 'task',
      });
      this.$('#todo-items').append(taskView.render().$el);
    });
    return this;
  },
  events: {
    'click #add-new-task': 'addTask'
  },
  addTask: function(event) {
    event.preventDefault();
    const taskData ={};
    ['task_name', 'assignee'].forEach( (field) => {
      const val = this.$(`input[name=${field}]`).val();
      if (val != '') {
        taskData[field] = val;
      }
    });
    const newTask = new Task(taskData);

    if (newTask.isValid()) {
      this.model.add(newTask);
      this.updateStatusMessageWith(`New task added: ${newTask.get('task_name')}`);
    } else {
      this.updateStatusMessageFrom(newTask.validationError);
    }
  },
  updateStatusMessageFrom: function(messageHash) {
    const statusMessagesEl = this.$('#status-messages');
    statusMessagesEl.empty();
    _.each(messageHash, (messageType) => {
      messageType.forEach((message) => {
        statusMessagesEl.append(`<li>${message}</li>`);
      })
    });
    statusMessagesEl.show();
  },
  updateStatusMessageWith: function(message) {
    const statusMessagesEl = this.$('#status-messages');
    statusMessagesEl.empty();
    statusMessagesEl.append(`<li>${message}</li>`);
    statusMessagesEl.show();
  }

});











export default TaskListView;
