import icons from 'url:../img/icons.svg';

class PaginationView {
    #parentElement = document.querySelector('.pagination');
    #data;

    render(data) {
        this.#data = data;
        const markup = this.#generateMarkup();
        this.#clear();
        this.#parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    #clear() {
        this.#parentElement.innerHTML = '';
    }

    #generateMarkup() {
        const curPage = this.#data.page;
        const numPages = this.#data.numPages;

        // Page 1, and there are other pages
        if (curPage === 1 && numPages > 1) {
            return `
                <button class="btn--inline pagination__btn--next" data-goto="${curPage + 1}">
                    <span>Page ${curPage + 1}</span>
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>
            `;
        }

        // Last page
        if (curPage === numPages && numPages > 1) {
            return `
                <button class="btn--inline pagination__btn--prev" data-goto="${curPage - 1}">
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${curPage - 1}</span>
                </button>
            `;
        }

        // Other page
        if (curPage < numPages) {
            return `
                <button class="btn--inline pagination__btn--prev" data-goto="${curPage - 1}">
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${curPage - 1}</span>
                </button>
                <button class="btn--inline pagination__btn--next" data-goto="${curPage + 1}">
                    <span>Page ${curPage + 1}</span>
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>
            `;
        }

        // Page 1, and there are NO other pages
        return '';
    }

    addHandlerClick(handler) {
        this.#parentElement.addEventListener('click', function(e) {
            const btn = e.target.closest('.btn--inline');
            if (!btn) return;

            const goToPage = +btn.dataset.goto;
            handler(goToPage);
        });
    }
}

export default new PaginationView(); 