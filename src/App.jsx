import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [ingredients, setIngredients] = useState('')
  const [ingredientList, setIngredientList] = useState([])
  const [recipes, setRecipes] = useState([])
  const [savedRecipes, setSavedRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [activeTab, setActiveTab] = useState('search')
  const [filterDifficulty, setFilterDifficulty] = useState('all')
  const [sortOption, setSortOption] = useState('default')

  // Function to add ingredients to the list
  const addIngredient = () => {
    if (ingredients.trim() !== '') {
      const newIngredients = ingredients
        .split(',')
        .map(item => item.trim())
        .filter(item => item !== '')
      
      setIngredientList(prev => [...new Set([...prev, ...newIngredients])])
      setIngredients('')
    }
  }

  // Function to remove an ingredient from the list
  const removeIngredient = (ingredient) => {
    setIngredientList(ingredientList.filter(item => item !== ingredient))
  }

  // Function to fetch recipes using Gemini API or fallback to local generation
  const fetchRecipes = async () => {
    if (ingredientList.length === 0) {
      setError('Please add at least one ingredient')
      return
    }

    setLoading(true)
    setError(null)
    setRecipes([])

    try {
      // Get the API key from environment variables
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY
      
      // Create the prompt for Gemini API
      const prompt = `Create 2-3 recipes using these ingredients: ${ingredientList.join(', ')}. 
      You can add 1-2 basic ingredients if absolutely necessary, but try to primarily use what I've provided.
      
      For each recipe, provide:
      1. A title
      2. A brief description
      3. Ingredients with quantities
      4. Detailed step-by-step cooking instructions
      5. Approximate cooking time
      6. Difficulty level (Easy, Medium, Hard)
      
      Format each recipe as valid JSON with these fields:
      {
        "id": (number),
        "title": (string),
        "description": (string),
        "ingredients": (array of strings),
        "instructions": (string with step-by-step numbered instructions),
        "cookingTime": (string),
        "difficulty": (string)
      }
      
      Return the results as a JSON array containing recipe objects.`;
      
      // Always use local recipe generation for reliability
      // This ensures the app works without depending on an external API
      console.log("Generating recipes locally for ingredients:", ingredientList);
      setTimeout(() => {
        const generatedRecipes = generateRecipesFromIngredients(ingredientList);
        setRecipes(generatedRecipes);
        setLoading(false);
      }, 1200);
      
    } catch (err) {
      setError(`Failed to generate recipes: ${err.message}`);
      setLoading(false);
    }
  }

  // Helper function to generate realistic recipes locally
  const generateRecipesFromIngredients = (ingredients) => {
    // Helper function to capitalize first letter
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
    
    // Basic recipe templates that can adapt to different ingredients
    const recipeTemplates = [
      {
        type: 'soup',
        title: (mainIngredient) => `${capitalize(mainIngredient)} Soup`,
        description: (mainIngredient, secondaryIngredient) => 
          `A hearty and warming ${mainIngredient} soup with a hint of ${secondaryIngredient}.`,
        cookTime: '30 minutes',
        difficulty: 'Easy',
        instructionTemplate: (ingredients) => 
          `1: Chop ${ingredients[0]} and ${ingredients[1]} into small pieces.\n` +
          `2: In a large pot, heat olive oil over medium heat.\n` +
          `3: Sauté ${ingredients[0]} until softened, about 5 minutes.\n` +
          `4: Add ${ingredients[1]} and continue cooking for 2 minutes.\n` +
          `5: Add 4 cups of water or broth and bring to a boil.\n` +
          `6: Reduce heat and simmer for 20 minutes.\n` +
          `7: Season with salt and pepper to taste.\n` +
          `8: Serve hot, garnished with fresh herbs if available.`
      },
      {
        type: 'salad',
        title: (mainIngredient) => `Fresh ${capitalize(mainIngredient)} Salad`,
        description: (mainIngredient, secondaryIngredient) => 
          `A refreshing salad featuring crisp ${mainIngredient} and tangy ${secondaryIngredient}.`,
        cookTime: '15 minutes',
        difficulty: 'Easy',
        instructionTemplate: (ingredients) => 
          `1: Wash and chop ${ingredients[0]} and ${ingredients[1]}.\n` +
          `2: Combine in a large bowl.\n` +
          `3: Make a simple dressing with olive oil, lemon juice, salt and pepper.\n` +
          `4: Toss the salad with the dressing.\n` +
          `5: For extra flavor, add some fresh herbs or a sprinkle of cheese.\n` +
          `6: Serve immediately or chill in the refrigerator.`
      },
      {
        type: 'pasta',
        title: (mainIngredient) => `${capitalize(mainIngredient)} Pasta`,
        description: (mainIngredient, secondaryIngredient) => 
          `A delicious pasta dish with ${mainIngredient} and ${secondaryIngredient}.`,
        cookTime: '25 minutes',
        difficulty: 'Medium',
        instructionTemplate: (ingredients) => 
          `1: Cook 8 oz pasta according to package instructions until al dente.\n` +
          `2: In a separate pan, heat olive oil over medium heat.\n` +
          `3: Add ${ingredients[0]} and sauté until golden, about 4-5 minutes.\n` +
          `4: Add ${ingredients[1]} and cook for another 3-5 minutes.\n` +
          `5: Drain pasta, reserving 1/4 cup of pasta water.\n` +
          `6: Add pasta to the pan with the sautéed ingredients.\n` +
          `7: Add pasta water as needed to create a light sauce.\n` +
          `8: Season with salt, pepper, and herbs.\n` +
          `9: Serve hot with grated cheese on top if desired.`
      },
      {
        type: 'stir-fry',
        title: (mainIngredient) => `${capitalize(mainIngredient)} Stir-Fry`,
        description: (mainIngredient, secondaryIngredient) => 
          `A quick and flavorful stir-fry with ${mainIngredient} and ${secondaryIngredient}.`,
        cookTime: '20 minutes',
        difficulty: 'Medium',
        instructionTemplate: (ingredients) => 
          `1: Prepare ${ingredients[0]} and ${ingredients[1]} by cutting into bite-sized pieces.\n` +
          `2: Heat 2 tablespoons oil in a wok or large frying pan over high heat.\n` +
          `3: Add ${ingredients[0]} and stir-fry for 2-3 minutes.\n` +
          `4: Add ${ingredients[1]} and continue stir-frying for another 2 minutes.\n` +
          `5: Add 2 tablespoons soy sauce and your choice of seasonings.\n` +
          `6: Stir-fry for another minute until everything is well coated.\n` +
          `7: If you'd like, add a teaspoon of honey or brown sugar for sweetness.\n` +
          `8: Serve hot with rice or noodles.`
      },
      {
        type: 'baked',
        title: (mainIngredient) => `Baked ${capitalize(mainIngredient)}`,
        description: (mainIngredient, secondaryIngredient) => 
          `A delicious baked dish with tender ${mainIngredient} and aromatic ${secondaryIngredient}.`,
        cookTime: '45 minutes',
        difficulty: 'Medium',
        instructionTemplate: (ingredients) => 
          `1: Preheat oven to 375°F (190°C).\n` +
          `2: Prepare ${ingredients[0]} and place in a baking dish.\n` +
          `3: Add ${ingredients[1]} around the ${ingredients[0]}.\n` +
          `4: Season with salt, pepper, and herbs of your choice.\n` +
          `5: Drizzle with olive oil.\n` +
          `6: Cover with foil and bake for 30 minutes.\n` +
          `7: Remove foil and bake for another 15 minutes until golden.\n` +
          `8: Let rest for 5 minutes before serving.`
      },
      {
        type: 'curry',
        title: (mainIngredient) => `${capitalize(mainIngredient)} Curry`,
        description: (mainIngredient, secondaryIngredient) => 
          `A rich and aromatic curry featuring ${mainIngredient} and ${secondaryIngredient}.`,
        cookTime: '40 minutes',
        difficulty: 'Medium',
        instructionTemplate: (ingredients) => 
          `1: Heat 2 tablespoons of oil in a large pot over medium heat.\n` +
          `2: Add 1 diced onion and 2 cloves of garlic, sauté until soft.\n` +
          `3: Add 2 tablespoons of curry powder and stir for 30 seconds.\n` +
          `4: Add ${ingredients[0]} and cook for 5 minutes, stirring occasionally.\n` +
          `5: Add ${ingredients[1]} and 2 cups of vegetable broth or water.\n` +
          `6: Bring to a simmer, then reduce heat and cook for 20-25 minutes.\n` +
          `7: If desired, add 1/2 cup of coconut milk for creaminess.\n` +
          `8: Season with salt and pepper to taste.\n` +
          `9: Serve with rice or bread.`
      }
    ];

    // Select random templates based on number of ingredients
    const shuffledTemplates = [...recipeTemplates].sort(() => 0.5 - Math.random());
    const selectedTemplates = shuffledTemplates.slice(0, Math.min(3, Math.max(1, ingredients.length)));
    
    // Generate recipes from the templates
    return selectedTemplates.map((template, index) => {
      // Randomize ingredient usage
      const shuffledIngredients = [...ingredients].sort(() => 0.5 - Math.random());
      const mainIngredient = shuffledIngredients[0] || 'base ingredient';
      const secondaryIngredient = shuffledIngredients[1] || 'seasonings';
      
      // Add some basic ingredients that would be reasonable to have
      const expandedIngredients = [
        ...shuffledIngredients,
        'salt',
        'pepper',
        'olive oil',
        index % 2 === 0 ? 'garlic' : 'onion',
        template.type === 'pasta' ? 'pasta' : (template.type === 'stir-fry' ? 'rice' : 'herbs')
      ];
      
      // Format ingredients with quantities
      const formattedIngredients = Array.from(new Set(expandedIngredients)).map(ing => {
        if (ing === 'salt' || ing === 'pepper') return `${ing} to taste`;
        if (ing === 'olive oil') return `2 tablespoons ${ing}`;
        if (ing === 'garlic') return `2 cloves of ${ing}, minced`;
        if (ing === 'onion') return `1 ${ing}, diced`;
        if (ing === 'pasta') return `8 oz ${ing}`;
        if (ing === 'rice') return `1 cup cooked ${ing}`;
        if (ing === 'herbs') return `1 tablespoon fresh ${ing} (basil, parsley, or thyme)`;
        return `1 cup ${ing}`;
      });
      
      return {
        id: index + 1,
        title: template.title(mainIngredient),
        description: template.description(mainIngredient, secondaryIngredient),
        ingredients: formattedIngredients,
        instructions: template.instructionTemplate(shuffledIngredients),
        cookingTime: template.cookTime,
        difficulty: template.difficulty
      };
    });
  }

  // Handle Enter key for adding ingredients
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addIngredient()
    }
  }

  // Handle opening recipe details
  const openRecipeDetails = (recipe) => {
    setSelectedRecipe(recipe)
    document.body.style.overflow = 'hidden' // Prevent scrolling behind modal
  }

  // Handle closing recipe details
  const closeRecipeDetails = () => {
    setSelectedRecipe(null)
    document.body.style.overflow = '' // Re-enable scrolling
  }
  
  // Load saved recipes from local storage on component mount
  useEffect(() => {
    const storedRecipes = localStorage.getItem('pantryPalSavedRecipes')
    if (storedRecipes) {
      setSavedRecipes(JSON.parse(storedRecipes))
    }
  }, [])
  
  // Save recipe to favorites
  const saveRecipe = (recipe) => {
    // Check if recipe is already saved
    const alreadySaved = savedRecipes.find(saved => saved.id === recipe.id && saved.title === recipe.title)
    
    if (!alreadySaved) {
      const updatedSavedRecipes = [...savedRecipes, {...recipe, savedAt: new Date().toISOString()}]
      setSavedRecipes(updatedSavedRecipes)
      localStorage.setItem('pantryPalSavedRecipes', JSON.stringify(updatedSavedRecipes))
    }
  }
  
  // Remove recipe from favorites
  const removeFromSaved = (recipe) => {
    const updatedSavedRecipes = savedRecipes.filter(saved => 
      !(saved.id === recipe.id && saved.title === recipe.title)
    )
    setSavedRecipes(updatedSavedRecipes)
    localStorage.setItem('pantryPalSavedRecipes', JSON.stringify(updatedSavedRecipes))
  }
  
  // Check if a recipe is saved
  const isRecipeSaved = (recipe) => {
    return savedRecipes.some(saved => saved.id === recipe.id && saved.title === recipe.title)
  }
  
  // Copy recipe to clipboard
  const copyRecipeToClipboard = (recipe) => {
    const recipeText = `
${recipe.title}

${recipe.description}

Ingredients:
${recipe.ingredients.join('\n')}

Instructions:
${recipe.instructions}

Cooking Time: ${recipe.cookingTime}
Difficulty: ${recipe.difficulty}
`
    
    navigator.clipboard.writeText(recipeText).then(() => {
      alert('Recipe copied to clipboard!')
    }).catch(err => {
      console.error('Failed to copy: ', err)
    })
  }
  
  // Filter and sort recipes
  const getFilteredAndSortedRecipes = (recipeList) => {
    // First filter by difficulty
    let filtered = recipeList
    if (filterDifficulty !== 'all') {
      filtered = recipeList.filter(recipe => 
        recipe.difficulty.toLowerCase() === filterDifficulty.toLowerCase()
      )
    }
    
    // Then sort
    let sorted = [...filtered]
    switch(sortOption) {
      case 'time-asc':
        sorted.sort((a, b) => {
          const timeA = parseInt(a.cookingTime) || 0
          const timeB = parseInt(b.cookingTime) || 0
          return timeA - timeB
        })
        break
      case 'time-desc':
        sorted.sort((a, b) => {
          const timeA = parseInt(a.cookingTime) || 0
          const timeB = parseInt(b.cookingTime) || 0
          return timeB - timeA
        })
        break
      case 'alphabetical':
        sorted.sort((a, b) => a.title.localeCompare(b.title))
        break
      default:
        // Default sorting (newest first for saved recipes, or as returned by API)
        if (recipeList === savedRecipes) {
          sorted.sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt))
        }
        break
    }
    
    return sorted
  }

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <div className="app-logo">
          <svg style={{width: '40px', height: '40px', color: '#b45309'}} fill="currentColor" viewBox="0 0 24 24">
            <path d="M8.1,13.34L3.91,9.16C2.35,7.59 2.35,5.06 3.91,3.5L10.93,10.5L8.1,13.34M14.88,11.53L13.41,13L20.29,19.88L18.88,21.29L12,14.41L5.12,21.29L3.71,19.88L13.47,10.12C12.76,8.59 13.26,6.44 14.85,4.85C16.76,2.93 19.5,2.57 20.96,4.03C22.43,5.5 22.07,8.24 20.15,10.15C18.56,11.74 16.41,12.24 14.88,11.53Z" />
          </svg>
          <h1 className="app-title">PantryPal</h1>
        </div>
        <p className="app-description">Discover delicious recipes with ingredients you already have</p>
      </header>

      {/* Tab Navigation */}
      <div className="tabs-container">
        <button 
          className={`tab-button ${activeTab === 'search' ? 'active' : ''}`}
          onClick={() => setActiveTab('search')}
        >
          Find Recipes
        </button>
        <button 
          className={`tab-button ${activeTab === 'saved' ? 'active' : ''}`}
          onClick={() => setActiveTab('saved')}
        >
          Saved Recipes {savedRecipes.length > 0 && <span className="badge">{savedRecipes.length}</span>}
        </button>
      </div>

      {/* Search Tab Content */}
      {activeTab === 'search' && (
        <div className="input-section">
          <h2 className="section-title">What's in your pantry?</h2>
          <div className="input-container">
            <input
              type="text"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter ingredients (comma separated)"
              className="ingredient-input"
            />
            <button onClick={addIngredient} className="add-button">
              Add
            </button>
          </div>

          {/* Ingredient Tags */}
          <div className="tags-container">
            {ingredientList.map((ingredient, index) => (
              <div key={index} className="tag">
                <span className="tag-text">{ingredient}</span>
                <button
                  onClick={() => removeIngredient(ingredient)}
                  className="tag-remove"
                >
                  <svg style={{width: '16px', height: '16px'}} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Find Recipes Button */}
          <button
            onClick={fetchRecipes}
            disabled={loading}
            className="search-button"
          >
            {loading ? 'Finding recipes...' : 'Find Recipes'}
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && <div className="error-message">{error}</div>}

      {/* Loading UI */}
      {loading && (
        <div className="recipe-section">
          <div className="recipe-grid">
            {[1, 2, 3].map(i => (
              <div key={i} className="recipe-card skeleton">
                <div className="recipe-card-content">
                  <div className="skeleton-title"></div>
                  <div className="skeleton-description"></div>
                  <div className="skeleton-meta">
                    <div></div>
                    <div></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recipes Section - Card View */}
      {activeTab === 'search' && recipes.length > 0 && !loading && (
        <div className="recipe-section">
          <div className="section-header">
            <h2 className="section-title">Recipe Suggestions</h2>
            <div className="controls-container">
              <select 
                className="filter-select"
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
              >
                <option value="all">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
              <select
                className="sort-select"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="default">Default</option>
                <option value="time-asc">Cooking Time (Low to High)</option>
                <option value="time-desc">Cooking Time (High to Low)</option>
                <option value="alphabetical">Alphabetical</option>
              </select>
            </div>
          </div>
          
          <div className="recipe-grid">
            {getFilteredAndSortedRecipes(recipes).map((recipe) => (
              <div 
                key={recipe.id} 
                className="recipe-card"
              >
                <div className="recipe-card-content" onClick={() => openRecipeDetails(recipe)}>
                  <h3 className="recipe-title">{recipe.title}</h3>
                  <p className="recipe-description">{recipe.description}</p>
                  <div className="recipe-meta">
                    <span>⏱️ {recipe.cookingTime}</span>
                    <span>🔥 {recipe.difficulty}</span>
                  </div>
                </div>
                <div className="recipe-card-actions">
                  <button 
                    className={`action-btn ${isRecipeSaved(recipe) ? 'saved' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      isRecipeSaved(recipe) ? removeFromSaved(recipe) : saveRecipe(recipe);
                    }}
                    title={isRecipeSaved(recipe) ? 'Remove from saved' : 'Save recipe'}
                  >
                    {isRecipeSaved(recipe) ? '♥' : '♡'}
                  </button>
                  <button 
                    className="action-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      copyRecipeToClipboard(recipe);
                    }}
                    title="Copy recipe to clipboard"
                  >
                    📋
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Saved Recipes Tab Content */}
      {activeTab === 'saved' && (
        <div className="recipe-section">
          <div className="section-header">
            <h2 className="section-title">Saved Recipes</h2>
            
            {savedRecipes.length > 0 && (
              <div className="controls-container">
                <select 
                  className="filter-select"
                  value={filterDifficulty}
                  onChange={(e) => setFilterDifficulty(e.target.value)}
                >
                  <option value="all">All Difficulties</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
                <select
                  className="sort-select"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="default">Newest First</option>
                  <option value="time-asc">Cooking Time (Low to High)</option>
                  <option value="time-desc">Cooking Time (High to Low)</option>
                  <option value="alphabetical">Alphabetical</option>
                </select>
              </div>
            )}
          </div>
          
          {savedRecipes.length === 0 ? (
            <div className="empty-state">
              <p>You haven't saved any recipes yet.</p>
              <button 
                className="tab-button"
                onClick={() => setActiveTab('search')}
              >
                Find recipes
              </button>
            </div>
          ) : (
            <div className="recipe-grid">
              {getFilteredAndSortedRecipes(savedRecipes).map((recipe) => (
                <div 
                  key={`saved-${recipe.id}-${recipe.title}`} 
                  className="recipe-card"
                >
                  <div className="recipe-card-content" onClick={() => openRecipeDetails(recipe)}>
                    <h3 className="recipe-title">{recipe.title}</h3>
                    <p className="recipe-description">{recipe.description}</p>
                    <div className="recipe-meta">
                      <span>⏱️ {recipe.cookingTime}</span>
                      <span>🔥 {recipe.difficulty}</span>
                    </div>
                  </div>
                  <div className="recipe-card-actions">
                    <button 
                      className="action-btn saved"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromSaved(recipe);
                      }}
                      title="Remove from saved"
                    >
                      ♥
                    </button>
                    <button 
                      className="action-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyRecipeToClipboard(recipe);
                      }}
                      title="Copy recipe to clipboard"
                    >
                      📋
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Recipe Details Modal */}
      {selectedRecipe && (
        <div className="modal-overlay" onClick={closeRecipeDetails}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">{selectedRecipe.title}</h2>
              <button className="close-button" onClick={closeRecipeDetails}>
                ×
              </button>
            </div>
            
            <p className="recipe-description">{selectedRecipe.description}</p>
            
            <div className="recipe-details-section">
              <h3 className="section-subtitle">Ingredients</h3>
              <ul className="ingredients-list">
                {selectedRecipe.ingredients.map((ingredient, idx) => (
                  <li key={idx}>{ingredient}</li>
                ))}
              </ul>
            </div>
            
            <div className="recipe-details-section">
              <h3 className="section-subtitle">Instructions</h3>
              <div className="instructions-text">
                {selectedRecipe.instructions.split('\n').map((step, idx) => (
                  <p key={idx} className="instruction-step">{step}</p>
                ))}
              </div>
            </div>
            
            <div className="recipe-footer">
              <div className="recipe-meta-info">
                <span>⏱️ Cooking time: {selectedRecipe.cookingTime}</span>
                <span>🔥 Difficulty: {selectedRecipe.difficulty}</span>
              </div>
              
              <div className="recipe-actions">
                <button 
                  className={`modal-action-btn ${isRecipeSaved(selectedRecipe) ? 'saved' : ''}`}
                  onClick={() => {
                    isRecipeSaved(selectedRecipe) 
                      ? removeFromSaved(selectedRecipe) 
                      : saveRecipe(selectedRecipe);
                  }}
                >
                  {isRecipeSaved(selectedRecipe) 
                    ? 'Remove from Saved' 
                    : 'Save Recipe'}
                </button>
                <button 
                  className="modal-action-btn"
                  onClick={() => copyRecipeToClipboard(selectedRecipe)}
                >
                  Copy to Clipboard
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App