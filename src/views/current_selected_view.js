import Backbone from 'backbone';

const CurrentTaskView = Backbone.View.extend( {
  initialize(params) {
    this.bus = params.bus;
    this.listenTo(this.bus, 'selected_task', this.setModel);
  },
  setModel(model) {
    console.log('setModel');
    this.model = model;
    this.render();
  },
  // el: '#current-task',
  render() {
    if (this.model) { // if I have a model
      console.log('rendering Current Task');
      console.log(this.model.get('task_name'));
      this.$el.html(`<h2>${this.model.get('task_name')}</h2>`)
      this.$el.append(`<h3>${this.model.get('assignee')}</h3>`)

      // this.$('h2').html(this.model.get('task_name'));
      // this.$('#assignee').html(this.model.get('assignee'));
    }
    return this;
  }
});

export default CurrentTaskView;
