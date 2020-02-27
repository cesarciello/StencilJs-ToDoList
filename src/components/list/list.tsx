import { Component, h, Prop, Method } from '@stencil/core';

@Component({
  tag: 'todo-list',
  styleUrl: 'list.css',
  shadow: true
})
export class List {

  @Prop() arraytodo = [];
  @Prop() textadd: string = 'Add';
  @Prop() titlebox: string = 'ToDo List';
  @Prop() textremove: string = 'Remove';
  @Prop() fontcolorbtn: string = 'whitesmoke';
  @Prop() btncolor: string = 'rgb(255, 38, 89)';
  @Prop() shadow_color: string = 'rgba(255, 38, 89, 0.2)';

  @Method()
  async getTodoList() {
    return this.arraytodo
  }

  @Method()
  async setTodoList(list) {
    this.arraytodo = list
  }

  @Method()
  async pushTodoList(task, did = false) {
    this.arraytodo = [...this.arraytodo, {did, task}]
  }

  value: string;

  handleChange(event) {
    this.value = event.target.value;
  }

  updateNewTodo(ev) {
    if (this.value) {
      this.arraytodo = [...this.arraytodo, { did: false, task: this.value }];
      this.clearInput(ev)
    }
  }

  clearInput(ev) {
    let btn = ev.target as HTMLElement;
    let input = btn.previousElementSibling;
    this.value = ''
    input['value'] = '';
  }

  lineTask(ev) {
    let check = ev.target as HTMLElement;
    if (check.nextElementSibling.classList.value != "line") check.nextElementSibling.classList.add("line");
    else check.nextElementSibling.classList.remove("line");
  }

  removeTask(index) {
    const init = this.arraytodo.slice(0, index)
    const end = this.arraytodo.slice(index + 1)
    this.arraytodo = [...init, ...end];
  }

  css = `
    main {
      box-shadow: 0px 0px 10px ${ this.shadow_color || 'rgba(255, 38, 89, 0.2)' };
    }

    h4 {
      color: ${ this.btncolor || 'rgb(255, 38, 89)' }; 
    }

    div.inputAdd button:hover , div.tasks button:hover {
      color: ${ this.fontcolorbtn || 'whitesmoke' };
      background-color: ${ this.btncolor || 'rgb(255, 38, 89)' }; 
    }

    div.inputAdd button, div.tasks button {
      color: ${ this.btncolor || 'rgb(255, 38, 89)' };
      border: 1px solid ${ this.btncolor || 'rgb(255, 38, 89)' };
    }
  `;

  render() {
    return (
      <main>
        <style>{this.css}</style>
        <h4>{this.titlebox}</h4>
        <div class={"inputAdd"}>
          <input id="my-input" type="text" value={this.value} onInput={(event) => this.handleChange(event)}/>
          <button onClick={this.updateNewTodo.bind(this)} >{this.textadd}</button>
        </div>
        <div id="task-list">
          {
            this.arraytodo.map((ele, index) =>
              <div class={"tasks"}>
                <input type="checkbox" onChange={this.lineTask.bind(this)} checked={ele.did} />
                <p class={ele.did ? 'line' : ''} >
                  {ele.task}
                </p>
                <button onClick={this.removeTask.bind(this, index)}>{this.textremove}</button>
              </div>
            )
          }
        </div>
      </main>

    );
  }

}
