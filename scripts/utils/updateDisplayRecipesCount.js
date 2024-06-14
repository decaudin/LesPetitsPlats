export const updateDisplayedRecipesCount = (recipes) => {
    const numberRecipes = document.querySelector('.number_recipes');
    numberRecipes.innerText = `${recipes.length} recettes`;
};
