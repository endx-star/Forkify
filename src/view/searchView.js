import icons from 'url:../img/icons.svg';

class SearchView {
    #parentElement = document.querySelector('.search');
    #data;

    getQuery() {
        const query = this.#parentElement.querySelector('.search__field').value;
        console.log('SearchView.getQuery() called, query:', query);
        this.#clearInput();
        return query;
    }

    #clearInput() {
        this.#parentElement.querySelector('.search__field').value = '';
    }

    addHandlerSearch(handler) {
        console.log('SearchView.addHandlerSearch() called');
        this.#parentElement.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Search form submitted');
            handler();
        });
    }
}

export default new SearchView(); 