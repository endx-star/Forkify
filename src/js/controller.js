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
        <use href="src/img/icons.svg#icon-loader"></use>
      </svg>
    </div>
  `;
};

// Helper to render error
const renderError = function (parentEl, message = 'Could not load recipe!') {
  parentEl.innerHTML = `
    <div class="error">
      <svg>
        <use href="src/img/icons.svg#icon-alert-triangle"></use>
      </svg>
      <p>${message}</p>
    </div>
  `;
};

// Helper to render recipe
const renderRecipe = function (parentEl, recipe) {
  parentEl.innerHTML = `
    <figure class="recipe__fig">
      <img src="${recipe.image_url}" alt="${recipe.title}" class="recipe__img" />
      <h1 class="recipe__title">
        <span>${recipe.title}</span>
      </h1>
    </figure>
    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="src/img/icons.svg#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${recipe.cooking_time}</span>
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="src/img/icons.svg#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
        <span class="recipe__info-text">servings</span>
      </div>
      <div class="recipe__user-generated">
        <svg>
          <use href="src/img/icons.svg#icon-user"></use>
        </svg>
      </div>
      <button class="btn--round">
        <svg class="">
          <use href="src/img/icons.svg#icon-bookmark-fill"></use>
        </svg>
      </button>
    </div>
    <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
      <ul class="recipe__ingredient-list">
        ${recipe.ingredients
          .map(
            ing => `
              <li class="recipe__ingredient">
                <svg class="recipe__icon">
                  <use href="src/img/icons.svg#icon-check"></use>
                </svg>
                <div class="recipe__quantity">${ing.quantity ? ing.quantity : ''}</div>
                <div class="recipe__description">
                  <span class="recipe__unit">${ing.unit ? ing.unit : ''}</span>
                  ${ing.description}
                </div>
              </li>
            `
          )
          .join('')}
      </ul>
    </div>
    <div class="recipe__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${recipe.publisher}</span>. Please check out
        directions at their website.
      </p>
      <a
        class="btn--small recipe__btn"
        href="${recipe.source_url}"
        target="_blank"
      >
        <span>Directions</span>
        <svg class="search__icon">
          <use href="src/img/icons.svg#icon-arrow-right"></use>
        </svg>
      </a>
    </div>
  `;
};

// Async function to load and show a recipe from API
async function showRecipe(id = '5ed6604591c37cdc054bc886') {
  try {
    renderSpinner(recipeContainer);
    const res = await Promise.race([
      fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`),
      timeout(10),
    ]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    const recipe = data.data.recipe;
    renderRecipe(recipeContainer, recipe);
  } catch (err) {
    renderError(recipeContainer, err.message);
  }
}

// Demo: load a recipe on page load
showRecipe();
