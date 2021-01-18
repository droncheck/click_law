import {Dropdown} from "./Dropdown";
import {Popup} from "./Popup";
import GLightbox from 'glightbox';
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
      document.body.classList.toggle('overflow-hidden');
    } else if ($target.dataset.popupBtn) {
      this.Popup.open($target.dataset.popupBtn);
      document.body.classList.add('overflow-hidden');
    } else if ($target.dataset.popupClose) {
      this.Popup.close();
      if (!this.$mobileMenu.classList.contains('active')) {
        document.body.classList.remove('overflow-hidden');
      }
    } else if ($target.dataset.glightboxClose) {
      this.glightbox.close();
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

    this.Popup = new Popup();

    const customLightboxHTML = `<div id="glightbox-body" class="glightbox-container">
        <div class="gloader visible"></div>
        <div class="goverlay"></div>
        <div class="gcontainer">
        <div id="glightbox-slider" class="gslider"></div>
        <button class="gnext gbtn" tabindex="0" aria-label="Next" data-customattribute="example">{nextSVG}</button>
        <button class="gprev gbtn" tabindex="1" aria-label="Previous">{prevSVG}</button>
    </div>
    </div>`;

    const customSlideHTML = `<div class="gslide">
        <div class="gslide-inner-content">
            <div class="ginner-container">
                <div class="gslide-media">
                  <button class="popup__close border border--left border--bottom" data-glightbox-close="true"></button>
                </div>
                <div class="gslide-description">
                    <div class="gdesc-inner">
                        <h4 class="gslide-title"></h4>
                        <div class="gslide-desc"></div>
                    </div>
                </div>

            </div>
        </div>
    </div>`;


    this.glightbox = GLightbox({
      lightboxHTML: customLightboxHTML,
      slideHTML: customSlideHTML,
    });
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