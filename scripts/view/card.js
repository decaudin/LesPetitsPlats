export const recipeTemplate = (recipe) => {

    const { id, image, name, servings, ingredients, time, description, appliance, ustensils } = recipe;

    // Modèle de card pour une recette

    const getRecipeCardDOM = () => {

        // Création d'une balise (article)

        const recipeCard = document.createElement('article');
        recipeCard.classList = 'recipe_card';

        // Ajout des attributs de données

        recipeCard.setAttribute('data-ingredients', ingredients.map(i => i.ingredient).join(','));
        recipeCard.setAttribute('data-appliance', appliance);
        recipeCard.setAttribute('data-ustensils', ustensils.join(','));

        // Création d'une balise pour la durée de préparation (span)

        const recipeDuration = document.createElement('span');
        recipeDuration.classList = 'recipe_duration';
        recipeDuration.textContent = `${time}min`;
        recipeCard.appendChild(recipeDuration);

        // Création d'une balise (img)

        const recipeImg = document.createElement('img');
        recipeImg.classList = 'recipe_img';
        recipeImg.alt = `${name}`;
        recipeImg.src = `assets/imgs/${image}`;
        recipeCard.appendChild(recipeImg);

        const recipeContent = document.createElement('div');
        recipeContent.classList = 'recipe_content';
        recipeCard.appendChild(recipeContent);

        // Création du titre de la recette (h3)

        const recipeTitle = document.createElement('h3');
        recipeTitle.classList = 'recipe_title';
        recipeTitle.textContent = `${name}`;
        recipeContent.appendChild(recipeTitle);

        const recipeDescription = document.createElement('div');
        recipeDescription.classList = 'recipe_description';
        recipeContent.appendChild(recipeDescription);

        // Création du titre 'RECETTE' (h4)

        const descriptionTitle = document.createElement('h4');
        descriptionTitle.classList = 'description_title';
        descriptionTitle.innerText = 'RECETTE';
        recipeDescription.appendChild(descriptionTitle);

        // Création du paragraphe de description de la recette (p)

        const descriptionText = document.createElement('p');
        descriptionText.classList = 'description_text';
        descriptionText.innerText = `${description}`;
        recipeDescription.appendChild(descriptionText);

        const recipeIngredients = document.createElement('div');
        recipeIngredients.classList ='recipe_ingredients';
        recipeContent.appendChild(recipeIngredients);

        // Création du titre 'INGREDIENTS' (h4)

        const ingredientsTitle = document.createElement('h4');
        ingredientsTitle.classList = 'ingredients_title';
        ingredientsTitle.innerText = 'INGRÉDIENTS';
        recipeIngredients.appendChild(ingredientsTitle);

        const recipeIngredientsList = document.createElement('div');
        recipeIngredientsList.classList = 'recipe_ingredients_list';
        recipeIngredients.appendChild(recipeIngredientsList);

        // Création d'un titre (h5) et d'un paragraphe (p) de descrition pour chaque ingrédient

        ingredients.forEach(ingredient => {

            const ingredientItem = document.createElement('div');
            ingredientItem.classList = 'recipe_ingredient';   
            
            const ingredientTitle = document.createElement('h5');
            ingredientTitle.classList = 'ingredient_title';
            ingredientTitle.innerText = `${ingredient.ingredient}`;
            ingredientItem.appendChild(ingredientTitle);

            const ingredientText = document.createElement('p');
            ingredientText.classList = 'ingredient_text';
            ingredientText.textContent = ingredient.quantity ? (ingredient.unit ? `${ingredient.quantity} ${ingredient.unit}` : ingredient.quantity) : '-';
            ingredientItem.appendChild(ingredientText);
            
            recipeIngredientsList.appendChild(ingredientItem);
        });

        return recipeCard;

    }

    return { id, image, name, servings, ingredients, time, description, appliance, ustensils, getRecipeCardDOM }
    
}