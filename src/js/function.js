export function initAccordions() {
  const $accordionHeaders = document.querySelectorAll('[data-accordion-header]');

  $accordionHeaders.forEach($header => {
    const $parent = $header.closest('[data-accordion]');
    const $hidden = $parent.querySelector('[data-accordion-hidden]');

    $header.addEventListener('click', () => {
      $header.classList.toggle('active');
      $parent.classList.toggle('active');
      $hidden.style.height =
          $hidden.offsetHeight ?
          '0px' :
          $hidden.scrollHeight + 'px';
    });

    $hidden.addEventListener('transitionend', () => {
      $hidden.offsetHeight ?
          $hidden.style.height = 'auto' :
          false;
    });
  });
}

export function initFileInputs() {
  const $labels = document.querySelectorAll('.file');


  $labels.forEach($label => {
    const placeholder = $label.dataset.placeholder ?
        $label.dataset.placeholder :
        'Прикрепить файл';
    const $input = $label.querySelector('input');
    const $name = $label.querySelector('.file__label');
    let value = '';

    $input.addEventListener('change', () => {
      value = $input.value.split(/(\\|\/)/g).pop();

      value === '' ?
          $name.textContent = placeholder :
          $name.textContent = value;
    });
  });
}

export function initFilters() {
  const $parents = document.querySelectorAll('[data-filter-parent]');

  $parents.forEach($parent => {
    const $btns = $parent.querySelectorAll('[data-filter-btn');
    const $items = $parent.querySelectorAll('[data-filter-item');

    $btns.forEach($btn => {
      $btn.addEventListener('click', () => {
        $btn.classList.add('active');
        $btns.forEach($button => {
          if ($button.dataset.filterBtn !== $btn.dataset.filterBtn) {
            $button.classList.remove('active');
          }
        });

        $items.forEach($item => {
          if ($item.dataset.filterItem === $btn.dataset.filterBtn) {
            $item.classList.add('active');
          } else {
            $item.classList.remove('active');
          }
        });
      })
    });
  });
}