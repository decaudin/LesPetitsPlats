export const handleDropdown = (titles, contents, vectors) => {

    titles.forEach((title, index) => {

        title.addEventListener('click', (e) => {
            e.stopPropagation();

            // Empêche plusieurs dropdown d'être ouvert en même temps

            contents.forEach((content, i) => {
                if (i !== index) {
                    content.classList.remove('active');
                    vectors[i].classList.remove('open');
                } 
            });

            contents[index].classList.toggle('active');
            vectors[index].classList.toggle('open');
            
        });
    });

    contents.forEach((content) => {   
        content.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });

    // Fermeture des dropdown au clic sur la page web

    document.addEventListener('click', () => {
        contents.forEach((content, index) => {
            content.classList.remove('active');
            vectors[index].classList.remove('open');
        });
    });
}

// Fonction de création d'un élément de la liste

/*const createListItems = (items, listElement) => {

    listElement.innerHTML = '';

    items.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('dropdown_list__item');
        li.setAttribute("tabindex", 0);
        li.textContent = item;
        listElement.appendChild(li);
    });
};

export const fillDropdowns = (recipes) => {

    const ingredientsSet = new Set();
    const appliancesSet = new Set();
    const ustensilsSet = new Set();

    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            ingredientsSet.add(ingredient.ingredient);
        });
        appliancesSet.add(recipe.appliance);
        recipe.ustensils.forEach(ustensil => {
            ustensilsSet.add(ustensil);
        });
    });

    const ingredientsList = document.getElementById('ingredients_list');
    const appliancesList = document.getElementById('appliances_list');
    const ustensilsList = document.getElementById('ustensils_list');

    // Appel de la fonction createListItems pour créer les 3 listes

    createListItems(Array.from(ingredientsSet), ingredientsList);
    createListItems(Array.from(appliancesSet), appliancesList);
    createListItems(Array.from(ustensilsSet), ustensilsList);

}; */




  