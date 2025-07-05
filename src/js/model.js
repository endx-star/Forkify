// Model for managing application state and API calls

const API_URL = 'https://forkify-api.herokuapp.com/api/v2/recipes/';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const getJSON = async function(url) {
  try {
    const res = await Promise.race([fetch(url), timeout(10)]);
    const data = await res.json();
    
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
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

// Load bookmarks from localStorage
const loadBookmarks = function() {
    const storage = localStorage.getItem('bookmarks');
    console.log('Loading bookmarks from localStorage:', storage);
    if (storage) {
        state.bookmarks = JSON.parse(storage);
        console.log('Loaded bookmarks:', state.bookmarks);
    } else {
        console.log('No bookmarks found in localStorage');
    }
}

// Save bookmarks to localStorage
const persistBookmarks = function() {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}

// Add bookmark
export const addBookmark = function(recipe) {
    console.log('addBookmark called with recipe:', recipe);
    // Add bookmark
    state.bookmarks.push(recipe);
    
    // Mark current recipe as bookmarked
    if (state.recipe.id === recipe.id) state.recipe.bookmarked = true;
    
    console.log('Bookmarks after adding:', state.bookmarks);
    persistBookmarks();
}

// Delete bookmark
export const deleteBookmark = function(id) {
    console.log('deleteBookmark called with id:', id);
    // Delete bookmark
    const index = state.bookmarks.findIndex(el => el.id === id);
    state.bookmarks.splice(index, 1);
    
    // Mark current recipe as NOT bookmarked
    if (state.recipe.id === id) state.recipe.bookmarked = false;
    
    console.log('Bookmarks after deleting:', state.bookmarks);
    persistBookmarks();
}

// Check if recipe is bookmarked
export const isBookmarked = function(id) {
    return state.bookmarks.some(bookmark => bookmark.id === id);
}

// Initialize bookmarks
loadBookmarks();

export const loadRecipe = async function (id) {
    try {
        console.log('loadRecipe called with id:', id);
        const data = await getJSON(`${API_URL}${id}`);
        console.log('Recipe API response:', data);
        
        let { recipe } = data.data;
        
        // Update state
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            source_url: recipe.source_url,
            image_url: recipe.image_url,
            servings: recipe.servings,
            cooking_time: recipe.cooking_time,
            ingredients: recipe.ingredients,
        };
        
        // Check if recipe is bookmarked
        state.recipe.bookmarked = isBookmarked(state.recipe.id);
        
        console.log('Recipe state updated:', state.recipe);
        
        return recipe;
    } catch (err) {
        console.error('Error in loadRecipe:', err);
        throw err;
    }
}

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    console.log('Search query:', query);

    const data = await getJSON(`${API_URL}?search=${query}`);
    console.log('Search results:', data);

    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
        ...(recipe.key && { key: recipe.key }),
        bookmarked: isBookmarked(recipe.id)
      };
    });
    state.search.page = 1;
    console.log('Search results processed:', state.search.results);
  } catch (err) {
    console.error('Error loading search results:', err);
    throw err;
  }
};

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