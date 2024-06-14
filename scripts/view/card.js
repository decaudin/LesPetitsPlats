export const recipeTemplate = (recipe) => {

    const { id, image, name, servings, ingredients, time, description, appliance, ustensils } = recipe;

    // Modèle de card pour une recette

    const getRecipeCardDOM = () => {

        const recipeCard = document.createElement('article');
        recipeCard.classList = 'recipe_card';

        // Ajout des attributs de données

        recipeCard.setAttribute('data-ingredients', ingredients.map(i => i.ingredient).join(','));
        recipeCard.setAttribute('data-appliance', appliance);
        recipeCard.setAttribute('data-ustensils', ustensils.join(','));

        const recipeDuration = document.createElement('span');
        recipeDuration.classList = 'recipe_duration';
        recipeDuration.textContent = `${time}min`;
        recipeCard.appendChild(recipeDuration);

        const recipeImg = document.createElement('img');
        recipeImg.classList = 'recipe_img';
        recipeImg.alt = `${name}`;
        recipeImg.src = `assets/imgs/${image}`;
        recipeCard.appendChild(recipeImg);

        const recipeContent = document.createElement('div');
        recipeContent.classList = 'recipe_content';
        recipeCard.appendChild(recipeContent);

        const recipeTitle = document.createElement('h3');
        recipeTitle.classList = 'recipe_title';
        recipeTitle.textContent = `${name}`;
        recipeContent.appendChild(recipeTitle);

        const recipeDescription = document.createElement('div');
        recipeDescription.classList = 'recipe_description';
        recipeContent.appendChild(recipeDescription);

        const descriptionTitle = document.createElement('h4');
        descriptionTitle.classList = 'description_title';
        descriptionTitle.innerText = 'RECETTE';
        recipeDescription.appendChild(descriptionTitle);

        const descriptionText = document.createElement('p');
        descriptionText.classList = 'description_text';
        descriptionText.innerText = `${description}`;
        recipeDescription.appendChild(descriptionText);

        const recipeIngredients = document.createElement('div');
        recipeIngredients.classList ='recipe_ingredients';
        recipeContent.appendChild(recipeIngredients);

        const ingredientsTitle = document.createElement('h4');
        ingredientsTitle.classList = 'ingredients_title';
        ingredientsTitle.innerText = 'INGRÉDIENTS';
        recipeIngredients.appendChild(ingredientsTitle);

        const recipeIngredientsList = document.createElement('div');
        recipeIngredientsList.classList = 'recipe_ingredients_list';
        recipeIngredients.appendChild(recipeIngredientsList);

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