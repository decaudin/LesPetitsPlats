// Fonction pour enlever les accents d'une chaîne de caractères

const removeAccents = (str) => {

    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

// Fonction pour rechercher une chaîne de caractère dans une autre (rechercher needle dans haystack)

export const stringContains = (haystack, needle) => {

    // Si l'utilisateur a entré des accents, utiliser la recherche normale
    
    if (needle !== removeAccents(needle)) {
        return haystack.includes(needle);
    }
    
    // Sinon, enlever les accents à haystack avant de comparer à needle

    return removeAccents(haystack).includes(needle);
};