import {Dropdown} from "./Dropdown";
import {capitalize, getCoords} from "./utils";

export class Application {

  constructor() {

    this.lastTarget = null;
    this.initComponents();
    this.addDocumentListeners(['mousemove', 'click']);
    this.addWindowListeners([]);

  }

  onDocumentClick(e) {
    const $target = e.target;

    if ($target.dataset.mobileMenuOpen) {
      $target.classList.toggle('active');
      this.$mobileMenu.classList.toggle('active');
      document.body.classList.toggle('oveflow-hidden');
    }
  }

  onDocumentMousemove(e) {
    const $target = e.target;
    this.lastTarget = $target;

    if ($target.dataset.dropdownOpen) {
      this.Dropdown.openDropdown($target.dataset.dropdownOpen, getCoords($target).left);
    } else if (this.Dropdown.isOpen) {
      setTimeout(() => {
        if (!this.lastTarget.closest('[data-dropdown-parent]') && !this.lastTarget.closest('[data-dropdown-open]')) {
          this.Dropdown.closeDropdown();
        }
      }, 500)
    }
  }

  initComponents() {
    const $dropdownMenu = document.querySelector('.dropdown-menu');
    this.Dropdown = new Dropdown($dropdownMenu);
    this.$mobileMenu = document.querySelector('[data-mobile-menu]');
  }

  addDocumentListeners(listeners) {
    listeners.forEach(listener => {
      document.addEventListener(listener, this['onDocument' + capitalize(listener)].bind(this));
    });
  }

  addWindowListeners(listeners) {
    listeners.forEach(listener => {
      document.addEventListener(listener, this['onWindow' + capitalize(listener)].bind(this));
    });
  }

}