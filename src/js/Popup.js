export class Popup {
  constructor() {
    this.$popups = document.querySelectorAll('[data-popup]');
    this.$popupRadios = document.querySelectorAll('[data-popup-radio]');
    this.$popupOverlay = document.querySelector('.popup__overlay');

    this.$popupRadios.forEach($radio => {
      $radio.addEventListener('change', () => {
        this.changeCity($radio);
      });

    });
  }

  changeCity($el) {
    const $parent = $el.closest('[data-popup]');
    const $cityEl = $parent.querySelector('[data-popup-city]');
    if ($el.checked) {
      $cityEl.textContent = $el.value;
    }
  }

  open(name) {
    this.$popupOverlay.classList.add('active');
    this.$popups.forEach($popup => {
      if ($popup.dataset.popup === name) {
        $popup.classList.add('active');
        if ($popup.scrollHeight > $popup.offsetHeight) {
          $popup.classList.add('d-block')
        } else {
          $popup.classList.remove('d-block')
        }
      } else {
        $popup.classList.remove('active');
      }
    });
  }

  close() {
    this.$popupOverlay.classList.remove('active');
    this.$popups.forEach($popup => {
      $popup.classList.remove('active');
    });
  }
}