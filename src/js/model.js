// Model for managing application state and API calls

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
        console.log('loadRecipe called with id:', id);
        const res = await Promise.race([
          fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`),
          timeout(10),
        ]);
        const data = await res.json();
        console.log('Recipe API response:', data);
        if (!res.ok) throw new Error(`${data.message} (${res.status})`);
        const recipe = data.data.recipe;
        
        // Update state
        state.recipe = recipe;
        console.log('Recipe state updated:', state.recipe);
        
        return recipe;
    } catch (err) {
        console.error('Error in loadRecipe:', err);
        throw err;
    }
}

export const loadSearchResults = async function(query) {
    try {
        console.log('Loading search results for:', query);
        state.search.query = query;
        
        const res = await Promise.race([
            fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}`),
            timeout(10),
        ]);
        
        const data = await res.json();
        console.log('API response:', data);
        
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
        
        console.log('Processed results:', state.search.results);
        state.search.page = 1;
        
    } catch (err) {
        console.error('Error in loadSearchResults:', err);
        throw err;
    }
}

export const getSearchResultsPage = function(page = state.search.page) {
    state.search.page = page;
    
    const start = (page - 1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;
    
    return state.search.results.slice(start, end);
}

export const getSearchResultsPageCount = function() {
    return Math.ceil(state.search.results.length / state.search.resultsPerPage);
}

export const uploadRecipe = async function(newRecipe) {
    try {
        console.log('Uploading recipe:', newRecipe);
        
        // Parse ingredients
        const ingredients = [];
        for (let i = 1; i <= 6; i++) {
            const ingredient = newRecipe[`ingredient-${i}`];
            if (ingredient) {
                const [quantity, unit, description] = ingredient.split(',').map(item => item.trim());
                if (description) {
                    ingredients.push({
                        quantity: quantity ? +quantity : null,
                        unit: unit || '',
                        description: description
                    });
                }
            }
        }

        const recipe = {
            title: newRecipe.title,
            source_url: newRecipe.sourceUrl,
            image_url: newRecipe.image,
            publisher: newRecipe.publisher,
            cooking_time: +newRecipe.cookingTime,
            servings: +newRecipe.servings,
            ingredients: ingredients
        };

        console.log('Processed recipe:', recipe);
        
        // In a real app, you would send this to your API
        // For now, we'll just add it to the state
        const newRecipeId = Date.now().toString();
        recipe.id = newRecipeId;
        recipe.key = 'user-generated';
        
        // Add to search results
        state.search.results.unshift(recipe);
        
        return recipe;
    } catch (err) {
        console.error('Error uploading recipe:', err);
        throw err;
    }
}