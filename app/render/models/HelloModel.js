import { observable, action } from 'mobx';

export default class HelloModel {

  @observable world;
  constructor() {
    this.world = 'Hello From Python';
  }

  @action.bound
  setWorld(world) {
    this.world = world;
  }

  @action
  fetchHello(){
      window.client.invoke('hello', 'Hello from python:  ', (error, result) => { this.setWorld(result); });
  }
}
