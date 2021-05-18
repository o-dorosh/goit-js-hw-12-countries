import debounce from 'lodash.debounce';
import countryCardTpl from './templates/country-card.hbs';
import API from './js/fetchCountries';
import getRefs from './js/getRefs';

const refs = getRefs();

refs.serchInput.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  const input = e.target;
  const searchQuery = input.value;

  API.fetchCountries(searchQuery)
    .then(renderCountryCard)
    .catch(error => console.log(error));
}

function renderCountryCard(country) {
  const markUp = countryCardTpl(country);
  refs.cardContainer.innerHTML = markUp;
}
