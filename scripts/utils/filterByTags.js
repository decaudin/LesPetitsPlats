// Fonction pour filtrer les recettes en fonction des tags sélectionnés

export const filterByTags = (items, tags) => {

    return items.filter(item => {

        const ingredients = item.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());
        const appliance = item.appliance.toLowerCase();
        const ustensils = item.ustensils.map(ustensil => ustensil.toLowerCase());

        return tags.some(tag => {
            if (tag.type === 'ingredient') {
                return ingredients.includes(tag.text.toLowerCase());
            } else if (tag.type === 'appliance') {
                return appliance === tag.text.toLowerCase();
            } else if (tag.type === 'ustensil') {
                return ustensils.includes(tag.text.toLowerCase());
            }
            return false;
        });
    });
};
