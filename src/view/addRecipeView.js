import icons from 'url:../img/icons.svg';

class AddRecipeView {
    #parentElement = document.querySelector('.add-recipe-window');
    #overlay = document.querySelector('.overlay');
    #data;

    render() {
        const markup = this.#generateMarkup();
        this.#clear();
        this.#parentElement.insertAdjacentHTML('afterbegin', markup);
        this.#showModal();
        
        // Set up close button event listener after rendering
        const closeBtn = this.#parentElement.querySelector('.btn--close-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                console.log('Close button clicked');
                this.hideModal();
            });
        }
    }

    #clear() {
        this.#parentElement.innerHTML = '';
    }

    #showModal() {
        this.#overlay.classList.remove('hidden');
        this.#parentElement.classList.remove('hidden');
        
        // Add entrance animation
        setTimeout(() => {
            this.#parentElement.style.transform = 'translate(-50%, -50%) scale(1)';
            this.#parentElement.style.opacity = '1';
            this.#overlay.style.opacity = '1';
        }, 10);
    }

    hideModal() {
        this.#parentElement.style.transform = 'translate(-50%, -50%) scale(0.9)';
        this.#parentElement.style.opacity = '0';
        this.#overlay.style.opacity = '0';
        
        setTimeout(() => {
            this.#overlay.classList.add('hidden');
            this.#parentElement.classList.add('hidden');
        }, 300);
    }

    #generateMarkup() {
        return `
            <button class="btn--close-modal">&times;</button>
            <form class="upload">
                <div class="upload__column">
                    <h3 class="upload__heading">Recipe data</h3>
                    <label>Title</label>
                    <input required name="title" type="text" placeholder="Enter recipe title..." />
                    <label>URL</label>
                    <input required name="sourceUrl" type="url" placeholder="https://example.com/recipe" />
                    <label>Image URL</label>
                    <input required name="image" type="url" placeholder="https://example.com/image.jpg" />
                    <label>Publisher</label>
                    <input required name="publisher" type="text" placeholder="Recipe publisher..." />
                    <label>Prep time</label>
                    <input required name="cookingTime" type="number" placeholder="45" />
                    <label>Servings</label>
                    <input required name="servings" type="number" placeholder="4" />
                </div>

                <div class="upload__column">
                    <h3 class="upload__heading">Ingredients</h3>
                    <label>Ingredient 1</label>
                    <input
                        type="text"
                        required
                        name="ingredient-1"
                        placeholder="Format: 'Quantity,Unit,Description'"
                    />
                    <label>Ingredient 2</label>
                    <input
                        type="text"
                        name="ingredient-2"
                        placeholder="Format: 'Quantity,Unit,Description'"
                    />
                    <label>Ingredient 3</label>
                    <input
                        type="text"
                        name="ingredient-3"
                        placeholder="Format: 'Quantity,Unit,Description'"
                    />
                    <label>Ingredient 4</label>
                    <input
                        type="text"
                        name="ingredient-4"
                        placeholder="Format: 'Quantity,Unit,Description'"
                    />
                    <label>Ingredient 5</label>
                    <input
                        type="text"
                        name="ingredient-5"
                        placeholder="Format: 'Quantity,Unit,Description'"
                    />
                    <label>Ingredient 6</label>
                    <input
                        type="text"
                        name="ingredient-6"
                        placeholder="Format: 'Quantity,Unit,Description'"
                    />
                </div>

                <button class="btn upload__btn">
                    <svg>
                        <use href="${icons}#icon-upload-cloud"></use>
                    </svg>
                    <span>Upload</span>
                </button>
            </form>
        `;
    }

    addHandlerShowModal() {
        document.querySelector('.nav__btn--add-recipe').addEventListener('click', () => {
            this.render();
        });
    }

    addHandlerHideModal() {
        // Close on overlay click
        this.#overlay.addEventListener('click', (e) => {
            if (e.target === this.#overlay) {
                console.log('Overlay clicked');
                this.hideModal();
            }
        });
    }

    addHandlerUpload(handler) {
        // Use event delegation for form submission
        document.addEventListener('submit', (e) => {
            if (e.target.closest('.upload')) {
                e.preventDefault();
                const formData = new FormData(e.target);
                const data = Object.fromEntries(formData);
                handler(data);
            }
        });
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

    renderMessage(message) {
        const markup = `
            <div class="message">
                <div>
                    <svg>
                        <use href="${icons}#icon-smile"></use>
                    </svg>
                </div>
                <p>${message}</p>
            </div>
        `;
        this.#clear();
        this.#parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderError(message) {
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
}

export default new AddRecipeView(); 