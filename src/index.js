import axios from 'axios';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
const refs = {
  selectBreed: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfoEl: document.querySelector('.cat-info'),
};
refs.loader.setAttribute('hidden', true);
fetchBreeds()
  .then(data =>
    refs.selectBreed.insertAdjacentHTML(
      'beforeend',
      data.map(
        element => `<option value="${element.id}">${element.name}</option>`
      )
    )
  )
  .then(() => {
    new SlimSelect({
        select: '.breed-select',
        settings: {
            placeholderText: 'Select a cat\'s breed'
        },
        events: {
            afterChange: handlerChooseCat
        }
    })
    
  })
  .catch(error => {
    refs.error.removeAttribute('hidden');
  })
  .finally(() => {
    refs.loader.setAttribute('hidden', true);
  });


  
refs.selectBreed.addEventListener('click', handlerChooseCat);

function handlerChooseCat(event) {
  let breedId = event?.target?.value || event[0].value;
  console.log(breedId)
  refs.error.setAttribute('hidden', true);
  refs.loader.removeAttribute('hidden')

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
        refs.catInfoEl.innerHTML = '';
        refs.catInfoEl.insertAdjacentHTML('beforeend', markup);
    })
    .catch(error => {
      refs.error.removeAttribute('hidden');
      console.log(error);
    })
    .finally(() => {
      refs.loader.setAttribute('hidden', true);
    });
}






  