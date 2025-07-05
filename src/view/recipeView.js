import icons from 'url:../img/icons.svg';
// import  Fraction  from 'fractional';

class RecipeView {
    #parentElement = document.querySelector('.recipe');
    #data;
    #bookmarkHandler;

    renderSpinner() {
        const markup = `
            <div class="spinner">
                <svg>
                    <use href="${icons}#icon-loader"></use>
                </svg>
            </div>
        `;

        this.#clear();
        this.#parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderError(message = 'Could not load recipe!') {
        const markup = `
            <div class="error">
                <div>
                    <svg>
                        <use href="${icons}#icon-alert-triangle"></use>
                    </svg>
                </div>
                <p>${message}</p>
            </div>
        `;
        this.#clear();
        this.#parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    render(data) {
        this.#data = data;
        const markup = this.#generateMarkup();
        this.#clear();
        this.#parentElement.insertAdjacentHTML('afterbegin', markup);
        
        // Debug: Check if bookmark button exists
        const bookmarkBtn = this.#parentElement.querySelector('.btn--bookmark');
        console.log('Bookmark button found:', bookmarkBtn);
        console.log('Recipe bookmarked:', data.bookmarked);
        
        // Add direct click handler to bookmark button
        if (bookmarkBtn) {
            console.log('Bookmark button HTML:', bookmarkBtn.outerHTML);
            bookmarkBtn.addEventListener('click', function(e) {
                console.log('Direct bookmark button click');
                e.preventDefault();
                e.stopPropagation();
            });
        }
    }

    #clear() {
        this.#parentElement.innerHTML = '';
    }

    #generateMarkup() {
return `
      <figure class="recipe__fig">
       <img src="${this.#data.image_url}" alt="${this.#data.title}" class="recipe__img" />
       <h1 class="recipe__title">
        <span>${this.#data.title}</span>
       </h1>
     </figure>
      <div class="recipe__details">
       <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${this.#data.cooking_time}</span>
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${this.#data.servings}</span>
        <span class="recipe__info-text">servings</span>
      </div>
      <div class="recipe__user-generated">
        <svg>
          <use href="${icons}#icon-user"></use>
        </svg>
      </div>
      <button class="btn--round btn--bookmark">
        <svg class="">
          <use href="${icons}#icon-bookmark${this.#data.bookmarked ? '-fill' : ''}"></use>
        </svg>
      </button>
    </div>
    <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
      <ul class="recipe__ingredient-list">
        ${this.#data.ingredients
          .map(
            ing => `
              <li class="recipe__ingredient">
                <svg class="recipe__icon">
                  <use href="${icons}#icon-check"></use>
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
        <span class="recipe__publisher">${this.#data.publisher}</span>. Please check out
        directions at their website.
      </p>
      <a
        class="btn--small recipe__btn"
        href="${this.#data.source_url}"
        target="_blank"
      >
        <span>Directions</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </a>
    </div>
  `;
    }

    addHandlerBookmark(handler) {
        // Remove existing event listener if any
        this.#parentElement.removeEventListener('click', this.#bookmarkHandler);
        
        // Create new handler function
        this.#bookmarkHandler = function(e) {
            console.log('Click detected on:', e.target);
            console.log('Closest button:', e.target.closest('.btn--bookmark'));
            const btn = e.target.closest('.btn--bookmark');
            if (!btn) return;
            console.log('Bookmark button clicked');
            e.preventDefault();
            e.stopPropagation();
            handler();
        };
        
        // Add new event listener
        this.#parentElement.addEventListener('click', this.#bookmarkHandler);
        console.log('Bookmark event listener added');
    }
}

export default new RecipeView();