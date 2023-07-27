const options = {
  headers: {
    ['x-api-key']:
      'live_wuraHAEwht1vFhG19ObCfrMMnPdX6LahF05eq7VNjTf0OyMcrMAoFHfpTGfgIHU1',
  },
};

export function fetchBreeds() {
  return fetch('https://api.thecatapi.com/v1/breeds', options)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .catch(error => {
      console.log('error', error);
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  return fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&api_key=live_wuraHAEwht1vFhG19ObCfrMMnPdX6LahF05eq7VNjTf0OyMcrMAoFHfpTGfgIHU1`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .catch(error => {
      console.log('error', error);
      throw error;
    });
}
