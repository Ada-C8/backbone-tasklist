import Backbone from 'backbone';
import Task from '../models/task';

const TaskView = Backbone.View.extend({
    initialize(params) {
      this.template = params.template;
      this.listenTo(this.model, "change", this.render);
    },
    render() {
      const compiledTemplate = this.template(this.model.toJSON());
      this.$el.html(compiledTemplate);
      if (this.model.get('is_complete')) {
        this.$el.addClass('is-complete');
      } else {
        this.$el.removeClass('is-complete');
      }
      return this;
    },
    events: {
      'click button.delete': 'deleteTask',
      'click button.toggle-complete': 'toggleComplete',
      'click button.edit': 'editTask'
    },
    deleteTask: function(e) {
      this.model.destroy();
      this.remove();
    },
    toggleComplete: function(e) {
      this.model.set('is_complete', !this.model.get('is_complete'));
    },
    editTask: function(e) {
      console.log("We clicked the edit button, and we're in the callback in Task View");
      this.trigger('editMe', this);
    }
});










export default TaskView;
