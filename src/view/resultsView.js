import icons from 'url:../img/icons.svg';

class ResultsView {
    #parentElement = document.querySelector('.results');
    #data;
    #errorMessage = 'No recipes found for your query! Please try again ;)';
    #message = '';

    render(data) {
        this.#data = data;
        const markup = this.#generateMarkup();
        this.#clear();
        this.#parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    #clear() {
        this.#parentElement.innerHTML = '';
    }

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

    renderError(message = this.#errorMessage) {
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

    #generateMarkup() {
        return this.#data.map(result => this.#generateMarkupPreview(result)).join('');
    }

    #generateMarkupPreview(result) {
        const id = window.location.hash.slice(1);
        
        return `
            <li class="preview">
                <a class="preview__link ${result.id === id ? 'preview__link--active' : ''}" href="#${result.id}">
                    <figure class="preview__fig">
                        <img src="${result.image}" alt="${result.title}" />
                    </figure>
                    <div class="preview__data">
                        <h4 class="preview__title">${result.title}</h4>
                        <p class="preview__publisher">${result.publisher}</p>
                        <div class="preview__user-generated ${result.key ? '' : 'hidden'}">
                            <svg>
                                <use href="${icons}#icon-user"></use>
                            </svg>
                        </div>
                    </div>
                </a>
            </li>
        `;
    }
}

export default new ResultsView(); 