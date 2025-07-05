import * as model from '../model.js';
import RecipeView from '../view/recipeView.js';

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
// const renderSpinner = function (parentEl) {
//   parentEl.innerHTML = `
//     <div class="spinner">
//       <svg>
//         <use href="${icons}#icon-loader"></use>
//       </svg>
//     </div>
//   `;
// };

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

// Async function to load and show a recipe from API
const controlRecipes = async function() {
  const id = window.location.hash.slice(1);

  //Check for id
  if (!id) return;
  renderSpinner(recipeContainer);

  //Load recipe
  await model.loadRecipe(id);
  const {recipe} = model.state;


  //Render recipe
  RecipeView.render(model.state.recipe);
}

// load a recipe on page load

['hashchange', 'load'].forEach(ev => window.addEventListener(ev, controlRecipes));