import icons from 'url:../img/icons.svg';

class BookmarksView {
    #parentElement = document.querySelector('.bookmarks__list');
    #data;

    render(data) {
        console.log('BookmarksView.render called with data:', data);
        console.log('Parent element:', this.#parentElement);
        console.log('Parent element HTML before:', this.#parentElement.innerHTML);
        
        this.#data = data;
        const markup = this.#generateMarkup();
        console.log('Generated bookmarks markup:', markup);
        this.#clear();
        this.#parentElement.insertAdjacentHTML('afterbegin', markup);
        
        console.log('Parent element HTML after:', this.#parentElement.innerHTML);
    }

    #clear() {
        this.#parentElement.innerHTML = '';
    }

    #generateMarkup() {
        if (this.#data.length === 0) {
            return `
                <div class="message">
                    <div>
                        <svg>
                            <use href="${icons}#icon-smile"></use>
                        </svg>
                    </div>
                    <p>
                        No bookmarks yet. Find a nice recipe and bookmark it :)
                    </p>
                </div>
            `;
        }

        return this.#data.map(bookmark => this.#generateMarkupPreview(bookmark)).join('');
    }

    #generateMarkupPreview(bookmark) {
        const id = window.location.hash.slice(1);
        
        return `
            <li class="preview">
                <a class="preview__link ${bookmark.id === id ? 'preview__link--active' : ''}" href="#${bookmark.id}">
                    <figure class="preview__fig">
                        <img src="${bookmark.image_url || bookmark.image}" alt="${bookmark.title}" />
                    </figure>
                    <div class="preview__data">
                        <h4 class="preview__title">${bookmark.title}</h4>
                        <p class="preview__publisher">${bookmark.publisher}</p>
                        <div class="preview__user-generated ${bookmark.key ? '' : 'hidden'}">
                            <svg>
                                <use href="${icons}#icon-user"></use>
                            </svg>
                        </div>
                    </div>
                </a>
            </li>
        `;
    }

    addHandlerClick(handler) {
        this.#parentElement.addEventListener('click', function(e) {
            const link = e.target.closest('.preview__link');
            if (!link) return;
            
            e.preventDefault();
            const id = link.getAttribute('href').slice(1);
            handler(id);
        });
    }

    // Method to update active state when hash changes
    updateActiveRecipe() {
        const id = window.location.hash.slice(1);
        document.querySelectorAll('.bookmarks .preview__link').forEach(link => {
            link.classList.remove('preview__link--active');
            if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('preview__link--active');
            }
        });
    }
}

export default new BookmarksView(); 