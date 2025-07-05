import * as model from './model.js';
import RecipeView from '../view/recipeView.js';
import SearchView from '../view/searchView.js';
import ResultsView from '../view/resultsView.js';
import PaginationView from '../view/paginationView.js';
import AddRecipeView from '../view/addRecipeView.js';
import BookmarksView from '../view/bookmarksView.js';

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
        console.log('controlSearchResults called');
        
        // 1) Get search query
        const query = SearchView.getQuery();
        console.log('Search query:', query);
        if (!query) return;
        
        // 2) Load search results
        await model.loadSearchResults(query);
        console.log('Search results loaded:', model.state.search.results);
        
        // 3) Render results
        controlPagination();
        
    } catch (err) {
        console.error('Error in search:', err);
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
    
    // Set up bookmark handler after rendering
    RecipeView.addHandlerBookmark(controlBookmark);
    
    // Update active state in results
    ResultsView.updateActiveRecipe();
    
    // Update active state in bookmarks
    BookmarksView.updateActiveRecipe();
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

// Bookmark controller
const controlBookmark = function() {
    console.log('controlBookmark called');
    console.log('Current recipe:', model.state.recipe);
    console.log('Is bookmarked:', model.state.recipe.bookmarked);
    
    if (!model.state.recipe.bookmarked) {
        console.log('Adding bookmark');
        model.addBookmark(model.state.recipe);
    } else {
        console.log('Removing bookmark');
        model.deleteBookmark(model.state.recipe.id);
    }
    
    console.log('Bookmarks after update:', model.state.bookmarks);
    
    // Update recipe view
    RecipeView.render(model.state.recipe);
    
    // Update bookmarks view
    BookmarksView.render(model.state.bookmarks);
    
    // Update search results if they exist
    if (model.state.search.results.length > 0) {
        controlPagination();
    }
}

// Add recipe controller
const controlAddRecipe = async function(newRecipe) {
    try {
        console.log('Adding new recipe:', newRecipe);
        
        // Show loading state
        AddRecipeView.renderSpinner();
        
        // Upload recipe
        const recipe = await model.uploadRecipe(newRecipe);
        console.log('Recipe uploaded:', recipe);
        
        // Hide modal
        AddRecipeView.hideModal();
        
        // Show success message
        AddRecipeView.renderMessage('Recipe uploaded successfully!');
        
        // Update results to show new recipe
        controlPagination();
        
    } catch (err) {
        console.error('Error adding recipe:', err);
        AddRecipeView.renderError('Failed to upload recipe. Please try again.');
    }
}

// Event handlers
const init = function() {
    console.log('Initializing app...');
    SearchView.addHandlerSearch(controlSearchResults);
    PaginationView.addHandlerClick(controlPagination);
    ResultsView.addHandlerClick(controlRecipeClick);
    BookmarksView.addHandlerClick(controlRecipeClick);
    AddRecipeView.addHandlerShowModal();
    AddRecipeView.addHandlerHideModal();
    AddRecipeView.addHandlerUpload(controlAddRecipe);
    
    // Add event listeners for recipe loading
    window.addEventListener('hashchange', controlRecipes);
    window.addEventListener('load', controlRecipes);
    
    // Render bookmarks on load
    BookmarksView.render(model.state.bookmarks);
    
    console.log('Event listeners added for hashchange and load');
}

init();