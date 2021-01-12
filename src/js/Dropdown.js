import {Component} from "./Component";

export class Dropdown extends Component {
  constructor($root) {
    super($root)
  }

  init() {
    this.isOpen = false;
    this.$menus = this.$root.querySelectorAll('[data-dropdown-menu]');
    this.$triangle = this.$root.querySelector('.dropdown-menu__triangle');
    this.addListeners(['mousemove']);

    this.tabsMap = new Map();
    this.$menus.forEach($menu => {
      this.tabsMap.set($menu, {
        $pills: $menu.querySelectorAll('[data-dropdown-pill]'),
        $tabs: $menu.querySelectorAll('[data-dropdown-tab]'),
      });
    });
  }


  onMousemove(e) {
    const $target = e.target;

    if ($target.dataset.dropdownPill) {
      const $parent = $target.closest('[data-dropdown-menu]');

      this.changeTab($parent, $target.dataset.dropdownPill)
    }
  }

  changeTab($parent, name) {
    this.tabsMap.get($parent).$pills.forEach($pill => {
      if ($pill.dataset.dropdownPill === name) {
        $pill.classList.add('active');
      } else {
        $pill.classList.remove('active');
      }
    });
    this.tabsMap.get($parent).$tabs.forEach($tab => {
      if ($tab.dataset.dropdownTab === name) {
        $tab.classList.add('active');
      } else {
        $tab.classList.remove('active');
      }
    });
  }

  openDropdown(name, left) {
    this.$root.classList.add('active');
    this.isOpen = true;
    this.$triangle.style.left = left + 'px'

    this.$menus.forEach($menu => {
      if ($menu.dataset.dropdownMenu === name) {
        $menu.classList.add('active');
      } else {
        $menu.classList.remove('active');
      }
    });
  }

  closeDropdown() {
    this.$root.classList.remove('active');
    this.isOpen = false;
  }
}