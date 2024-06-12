export const searchRecipes = (query, recipes) => {

    const results = [];
    const normalizedQuery = query.toLowerCase();
    let i = 0;

    // Parcourt toutes les recettes avec une boucle while

    while (i < recipes.length) {

        const recipe = recipes[i];
        const name = recipe.name.toLowerCase();
        const ingredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());
        const description = recipe.description.toLowerCase();

        // Vérifie si la requête correspond au nom de la recette, à un ingrédient ou à un mot dans la description

        if (name.includes(normalizedQuery)) {
            results.push(recipe);
            i++; // Passer à la prochaine recette
            continue; // Passer à la prochaine itération de la boucle (recette suivante)
        }

        let j = 0;
        let matchFound = false;

        while (j < ingredients.length) {
            const ingredient = ingredients[j];
            if (ingredient.includes(normalizedQuery)) {
                results.push(recipe);
                matchFound = true;
                break; // Sortir de la boucle interne si une correspondance est trouvée dans les ingrédients
            }
            j++; // Passer à l'ingrédient suivant
        }

        if (matchFound) {
            i++;
            continue;
        }

        if (description.includes(normalizedQuery)) {
            results.push(recipe);
        }

        i++;
    }

    return results;

};