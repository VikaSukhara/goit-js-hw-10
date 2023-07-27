import axios from 'axios';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';
const refs = {
  selectBreed: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfoEl: document.querySelector('.cat-info'),
};
refs.loader.setAttribute('hidden', true);
refs.selectBreed.setAttribute('hidden', true);

fetchBreeds()
  .then(data => {
    refs.selectBreed.insertAdjacentHTML(
      'beforeend',
      data.map(
        element => `<option value="${element.id}">${element.name}</option>`
      )
    );
    refs.loader.style.display = 'none';
    new SlimSelect({
      select: '.breed-select',
      settings: {
        placeholderText: "Select a cat's breed",
      },
      events: {
        afterChange: handlerChooseCat,
      },
    });
  })
  .catch(error => {
    // refs.error.removeAttribute('hidden');
    Notiflix.Notify.warning(
      '  Oops! Something went wrong! Try reloading the page'
    );
  })
  .finally(() => {
    refs.loader.setAttribute('hidden', true);
  });

refs.selectBreed.addEventListener('click', handlerChooseCat);

function handlerChooseCat(event) {
  let breedId = event?.target?.value || event[0].value;
  console.log(breedId);
  // refs.error.setAttribute('hidden', true);
  refs.loader.removeAttribute('hidden');
  refs.loader.style.display = 'flex';
  refs.selectBreed.setAttribute('hidden', true);
  refs.catInfoEl.setAttribute('hidden', true);

  fetchCatByBreed(breedId)
    .then(data => {
      const markup = data
        .map(
          elementDate => `<img src="${elementDate.url}" alt="${elementDate.breeds[0].name}" width = "460px">
        <h2>${elementDate.breeds[0].name}</h2>
        <p>${elementDate.breeds[0].description}</p>
        <p>${elementDate.breeds[0].temperament}</p>`
        )
        .join('');
      refs.catInfoEl.removeAttribute('hidden');
      refs.catInfoEl.innerHTML = '';
      refs.catInfoEl.insertAdjacentHTML('beforeend', markup);
      refs.loader.style.display = 'none';
    })
    .catch(error => {
      // refs.error.removeAttribute('hidden');
      Notiflix.Notify.warning(
        'Oops! Something went wrong! Try reloading the page'
      );
      console.log(error);
    })
    .finally(() => {
      refs.loader.setAttribute('hidden', true);
    });
}
