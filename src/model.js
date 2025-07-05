import { async } from 'regenerator-runtime';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        page: 1,
        resultsPerPage: 10,
    },
    bookmarks: [],
}

export const loadRecipe = async function (id) {
    try {
        const res = await Promise.race([
          fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`),
          timeout(10),
        ]);
        const data = await res.json();
        if (!res.ok) throw new Error(`${data.message} (${res.status})`);
        const recipe = data.data.recipe;
        
        // Update state
        state.recipe = recipe;
        
        return recipe;
    } catch (err) {
        throw err;
    }
}

export const loadSearchResults = async function(query) {
    try {
        state.search.query = query;
        
        const res = await Promise.race([
            fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}`),
            timeout(10),
        ]);
        
        const data = await res.json();
        
        if (!res.ok) throw new Error(`${data.message} (${res.status})`);
        
        state.search.results = data.data.recipes.map(rec => {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
                key: rec.key,
            };
        });
        
        state.search.page = 1;
        
    } catch (err) {
        throw err;
    }
}

export const getSearchResultsPage = function(page = state.search.page) {
    state.search.page = page;
    
    const start = (page - 1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;
    
    return state.search.results.slice(start, end);
}