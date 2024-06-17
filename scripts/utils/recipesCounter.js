export const recipesCounter = (recipes) => {
    
    const numberRecipes = document.querySelector('.number_recipes');
    numberRecipes.innerText = `${recipes.length} recettes`;
};
