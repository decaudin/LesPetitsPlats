export const searchRecipes = (query, recipes) => {
    const normalizedQuery = query.toLowerCase();

    return recipes.filter(recipe => {
        const name = recipe.name.toLowerCase();
        const ingredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());
        const description = recipe.description.toLowerCase();

        // Vérifie si la requête correspond au nom de la recette, à un ingrédient ou à un mot dans la description
        if (name.includes(normalizedQuery)) {
            return true;
        }

        if (ingredients.some(ingredient => ingredient.includes(normalizedQuery))) {
            return true;
        }

        if (description.includes(normalizedQuery)) {
            return true;
        }

        return false;
    });
};
