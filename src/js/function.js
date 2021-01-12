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