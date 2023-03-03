import {fetchCountries} from "./js/fetchCountries"
import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;



const inputEl = document.querySelector('#search-box');
const listEl = document.querySelector(".country-list");
const infoEl = document.querySelector('.country-info');
inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
    const name = event.target.value.trim();
    listEl.innerHTML = "";
    infoEl.innerHTML = "";
    
    if (!name) {
        return
    }
    fetchCountries(name).then(response => {
        

        if (response.length > 10) {
            Notify.info('Too many matches found. Please enter a more specific name.')
            return
        };
        if (response.length > 1) {
            renderCountryList(response);
            return
        }
        renderOneCountry(response[0]);
}).catch(error => Notify.failure('Oops, there is no country with that name'));
}

function renderCountryList(countries) {
    const markup = countries.map(country =>
        `<li class=country-item>
        <img src="${country.flags.svg}" alt="${country.flags.alt}" width="60" height ="40"\>
        <h2 >${country.name.official}</h2>
        </li>`
    ).join("");
    listEl.innerHTML = markup;
};

function renderOneCountry(country) {
     const markup = 
        `<img src="${country.flags.svg}" alt="${country.flags.alt}" width="60" height ="40"\>
        <h2 class="country-name">${country.name.official}</h2>
        <p class=country-item> Capital: ${country.capital}</p>
        <p class=country-item> Population: ${country.population}</p>
        <p class=country-item> Languages: ${Object.values(country.languages).join(', ')}</p>
        `
    
    infoEl.innerHTML = markup;
}