import debounce from 'lodash.debounce';
import countryCardTpl from './templates/country-card.hbs';
import countryList from './templates/country-list.hbs';
import API from './js/fetchCountries';
import getRefs from './js/getRefs';
import { notice, info, success, error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';

const refs = getRefs();

refs.serchInput.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  const input = e.target;
  const searchQuery = input.value;

  if (!searchQuery.trim()) {
    clearMarkUp();
    notice({
      text: 'Please, enter your query',
      delay: 5000,
    });
    return;
  }

  API.fetchCountries(searchQuery)
    .then(renderAllTogether)
    .catch(error => console.log(error));
}

function renderAllTogether(countries) {
  if (countries.length > 10) {
    clearMarkUp();

    info({
      text: 'Too many matches found. Please enter a more specific query!',
      delay: 5000,
    });
  } else if (countries.length >= 2 && countries.length <= 10) {
    renderCountryList(countries);
    renderCountryCard(countries);
  } else if (!status.ok) {
    clearMarkUp();

    error({
      text: 'We can not find anything. Please write a valid query',
      delay: 5000,
    });
  } else {
    renderCountryCard(countries);
  }
}

function clearMarkUp() {
  renderCountryList('');
  renderCountryCard('');
}

function renderCountryCard(countries) {
  const markUp = countryCardTpl(countries);
  refs.cardContainer.innerHTML = markUp;
}

function renderCountryList(countries) {
  const markUpCountryList = countryList(countries);
  refs.countryListCont.innerHTML = markUpCountryList;
}
