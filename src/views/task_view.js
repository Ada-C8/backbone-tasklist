import Backbone from 'backbone';
import Task from '../models/task';

const TaskView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
  },
  render() {
    const compiledTemplate =
         this.template(this.model.toJSON());

    this.$el.html(compiledTemplate);

    return this;
  },
  events: {
    'click button.delete': 'deleteTask',
  },
  deleteTask(event) {
    // console.log(event);
    this.model.destroy();
    this.remove();
  },
});

export default TaskView;










//
