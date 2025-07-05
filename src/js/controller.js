import * as model from './model.js';
import RecipeView from '../view/recipeView.js';
import SearchView from '../view/searchView.js';
import ResultsView from '../view/resultsView.js';
import PaginationView from '../view/paginationView.js';

import icons from 'url:../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// Helper to render spinner
const renderSpinner = function (parentEl) {
  parentEl.innerHTML = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
  `;
};

// Helper to render error
const renderError = function (parentEl, message = 'Could not load recipe!') {
  parentEl.innerHTML = `
    <div class="error">
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
      <p>${message}</p>
    </div>
  `;
};

// Helper to render recipe
// const renderRecipe = function (parentEl, recipe) {
//   parentEl.innerHTML = 
// };

// Search controller
const controlSearchResults = async function() {
    try {
        // 1) Get search query
        const query = SearchView.getQuery();
        console.log('Search query:', query);
        if (!query) return;

        // 2) Load search results
        ResultsView.renderSpinner();
        await model.loadSearchResults(query);
        console.log('Search results:', model.state.search.results);

        // 3) Render results
        controlPagination();

    } catch (err) {
        console.error('Search error:', err);
        ResultsView.renderError(err.message);
    }
};

// Pagination controller
const controlPagination = function(goToPage = 1) {
    console.log('Pagination - page:', goToPage);
    const results = model.getSearchResultsPage(goToPage);
    console.log('Results for page:', results);
    
    // 1) Render new results
    ResultsView.render(results);
    
    // 2) Update active state after rendering
    ResultsView.updateActiveRecipe();

    // 3) Render new pagination buttons
    PaginationView.render({
        page: model.state.search.page,
        numPages: model.getSearchResultsPageCount(),
    });
};

// Recipe controller
const controlRecipes = async function() {
  const id = window.location.hash.slice(1);
  console.log('controlRecipes called, hash:', window.location.hash, 'id:', id);

  //Check for id
  if (!id) return;
  RecipeView.renderSpinner();

  try {
    //Load recipe
    console.log('Loading recipe with id:', id);
    await model.loadRecipe(id);
    const {recipe} = model.state;
    console.log('Recipe loaded:', recipe);

    //Render recipe
    RecipeView.render(model.state.recipe);
    
    // Update active state in results
    ResultsView.updateActiveRecipe();
  } catch (err) {
    console.error('Error loading recipe:', err);
    RecipeView.renderError(err.message);
  }
}

// Recipe click handler
const controlRecipeClick = function(id) {
  console.log('Recipe clicked, updating hash to:', id);
  window.location.hash = id;
}

// Event handlers
const init = function() {
    console.log('Initializing app...');
    SearchView.addHandlerSearch(controlSearchResults);
    PaginationView.addHandlerClick(controlPagination);
    ResultsView.addHandlerClick(controlRecipeClick);
    
    // Add event listeners for recipe loading
    window.addEventListener('hashchange', controlRecipes);
    window.addEventListener('load', controlRecipes);
    
    console.log('Event listeners added for hashchange and load');
}

init();