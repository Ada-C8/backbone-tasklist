import Backbone from 'backbone';
import Task from '../models/task';

const TaskView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, 'change', this.render);
  },
  render() {
    const compiledTemplate =
         this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);

    if (this.model.get('is_complete')) {
      this.$el.addClass('is-complete');
      console.log(this.$('.toggle-complete:first'));
      this.$('.toggle-complete:first').text('Set Incomplete');

    }
    else {
      this.$el.removeClass('is-complete');
      this.$('button.toggle-complete').text('Set Complete');

    }

    return this;
  },
  events: {
    'click button.delete': 'deleteTask',
    'click button.toggle-complete': 'toggleComplete',
  },
  toggleComplete(event) {
    // this.$el.toggleClass('is-complete');
    console.log(event);
    this.model.toggleComplete();
  },
  deleteTask() {
    // console.log(event);
    this.model.destroy();
    this.remove();
  },
});

export default TaskView;










//
