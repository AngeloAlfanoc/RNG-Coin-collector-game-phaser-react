import {observable} from "mobx"

export default class EarningsStore {
  @observable
  earnings: number = 0
}