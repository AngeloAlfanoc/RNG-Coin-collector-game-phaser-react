import {observable} from "mobx"

export default class BooleanStore {
  @observable
  pause: boolean = true;
}