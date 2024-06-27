import { stringContains } from "./stringContains.js";

export const searchRecipes = (query, recipes) => {

    const results = [];
    const normalizedQuery = query.toLowerCase();
    let i = 0;

    // Parcours toutes les recettes avec une boucle while

    while (i < recipes.length) {

        const recipe = recipes[i];
        const name = recipe.name.toLowerCase();
        const ingredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());
        const description = recipe.description.toLowerCase();

        // Vérifie si la requête correspond au nom de la recette, à un ingrédient ou à un mot dans la description

        if (stringContains(name, normalizedQuery)) {
            results.push(recipe);
            i++; // Passer à la prochaine recette
            continue; // Passer à la prochaine itération de la boucle (recette suivante)
        }

        let j = 0;
        let matchFound = false;

        while (j < ingredients.length) {
            const ingredient = ingredients[j];
            if (stringContains(ingredient, normalizedQuery)) {
                results.push(recipe);
                matchFound = true;
                break; // Sort de la boucle interne si une correspondance est trouvée dans les ingrédients et passe à l'instruction suivante
            }
            j++; // Passer à l'ingrédient suivant
        }

        if (matchFound) {
            i++;
            continue;
        }

        if (stringContains(description, normalizedQuery)) {
            results.push(recipe);
        }

        i++;
    }

    return results;

};
