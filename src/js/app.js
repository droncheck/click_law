'use strict'

import {Swiper, Navigation, Pagination} from 'swiper';

import {Application} from './Application';
import {initAccordions, initFileInputs, initFilters} from './function';
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

  initAccordions();

  initFileInputs();

  initFilters();

});
