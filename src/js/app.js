'use strict'

import {Swiper, Navigation, Pagination} from 'swiper';
import GLightbox from 'glightbox';
import {Application} from './Application';
import {initAccordions, initFileInputs} from './function';
Swiper.use([Navigation, Pagination]);

document.addEventListener('DOMContentLoaded', function() {

  new Application();

  new Swiper('[data-main-slider]', {
    spaceBetween: 60,
    loop: true,
    navigation: {
      prevEl: '.main__slider-arrow--prev',
      nextEl: '.main__slider-arrow--next',
    },
    pagination: {
      type: 'bullets',
      clickable: true,
      el: '.main__slider-dots'
    }
  });

  new Swiper('.services__slider', {
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 3,
      }
    },
    navigation: {
      prevEl: '.services__arrow--prev',
      nextEl: '.services__arrow--next',
    }
  });

  new Swiper('.diploms__slider', {
    spaceBetween: 30,
    slidesPerView: 2,
    breakpoints: {
      576: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 4,
      },
      1200: {
        slidesPerView: 5,
      }
    },
    navigation: {
      prevEl: '.diploms__arrow--prev',
      nextEl: '.diploms__arrow--next',
    }
  });

  new Swiper('.team__slider', {
    spaceBetween: 30,
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 3,
      }
    },
    navigation: {
      prevEl: '.team__arrow--prev',
      nextEl: '.team__arrow--next',
    }
  });

  const customLightboxHTML = `<div id="glightbox-body" class="glightbox-container">
      <div class="gloader visible"></div>
      <div class="goverlay"></div>
      <div class="gcontainer">
      <div id="glightbox-slider" class="gslider"></div>
      <button class="gnext gbtn" tabindex="0" aria-label="Next" data-customattribute="example">{nextSVG}</button>
      <button class="gprev gbtn" tabindex="1" aria-label="Previous">{prevSVG}</button>
      <button class="gclose gbtn" tabindex="2" aria-label="Close">{closeSVG}</button>
  </div>
  </div>`;

  let customSlideHTML = `<div class="gslide">
      <div class="gslide-inner-content">
          <div class="ginner-container">
              <div class="gslide-media">

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


  const glightbox = GLightbox({
    lightboxHTML: customLightboxHTML,
    slideHTML: customSlideHTML,
  });

  initAccordions();

  initFileInputs();

});
