import {capitalize} from "./utils";

export class Component {
  constructor($root) {
    this.$root = $root;

    if (document.contains(this.$root)) {
      this.init();
    }
  }

  init() {
  }

  addListeners(listeners) {
    listeners.forEach(listener => {
      this.$root.addEventListener(listener, this['on' + capitalize(listener)].bind(this));
    });
  }
}