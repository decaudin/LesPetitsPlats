// Fonction pour enlever les accents d'une chaîne de caractères

const removeAccents = (str) => {

    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

// Fonction pour recherche une chaîne de caractère dans une autre (rechercher needle dans haystack)

const stringContains = (haystack, needle) => {

    // Si l'utilisateur a entré des accents, utiliser la recherche normale
    
    if (needle !== removeAccents(needle)) {
        return haystack.includes(needle);
    }
    
    // Sinon, enlever les accents à haystack avant de comparer à needle

    return removeAccents(haystack).includes(needle);
};

// Fonction pour mettre à jour les dropdowns avec filtrage via l'input

export const chooseDropdownFilter = (inputFieldId, dropdownListId) => {

    const inputField = document.getElementById(inputFieldId);
    const dropdownList = document.getElementById(dropdownListId);

    // Ecouteur d'évènement pour la filtration des li des dropdowns via l'input

    inputField.addEventListener('input', () => {

        const searchText = inputField.value.trim().toLowerCase();

        const options = Array.from(dropdownList.querySelectorAll('.dropdown_list__item, .dropdown_list__item.visible, .dropdown_list__item.hidden')); // TEST

        options.forEach(option => {

            const textContent = option.textContent.toLowerCase();
            const optionVisible = stringContains(textContent, searchText);

            if (optionVisible) {
                option.classList.remove('hidden');
                option.classList.add('visible');
            } else {
                option.classList.remove('visible');
                option.classList.add('hidden');
            }
        });
    });
};