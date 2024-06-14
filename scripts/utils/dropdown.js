// Fonction pour l'ouverture/fermeture des Dropdowns et pivotement du chevron au clic 

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

    // Empêche le dropdown ouvert de se refermer au clic dedans

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




  