import { observable, action } from 'mobx';

export default class HelloModel {

  @observable world;
  constructor() {
    this.world = 'BeginHello';
  }

  @action.bound
  setWorld(world) {
    this.world = world;
  }

  @action
  fetchHello(){
      window.client.invoke('hello', 'HelloWorld', (error, result) => { this.setWorld(result); });
  }
}
