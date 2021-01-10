import {observable} from "mobx"

export default class StakeStore {
  @observable
  stake: number = 1
}