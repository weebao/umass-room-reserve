
document.addEventListener('DOMContentLoaded', function() {
    const searchBttn = document.getElementById('search-button');
    const searchInput = document.getElementById('building-name');
    const resultsContainer = document.getElementById('results-container');
    const imageFolder = '../server/building_images'; // Change this to the correct folder directory
  
    searchBttn.addEventListener('click', async function(){
        const searchQuery = searchInput.value.toLowerCase();
        try {
            const response = await fetch(`http://localhost:3260/getBuilding?name=${searchQuery}`);
            const buildings = await response.json(); 
            displayResults(buildings);
        } catch (error) {
            console.error('Error fetching data:', error);
            resultsContainer.innerHTML = '<p>Error loading results.</p>';
        }
    });

    /**
     * Displays search results in the form of cards in a specified container on the web page. Each card represents
     * a building, showing its name and featuring an image as the background. This function clears any previous content
     * in the results container before adding new results, ensuring the display is updated correctly with only the
     * latest search results.
     *
     * @param {Object[]} buildings - An array of building objects where each object contains information about a building.
     * @param {string} buildings[].name - The name of the building to display on the card.
     * @param {string} buildings[].img_name - The filename of the image for the building, used to construct the image URL.
     * 
     * @global
     * @uses resultsContainer - A predefined global variable that refers to the DOM element where results should be displayed.
     * @uses imageFolder - A predefined global variable that contains the path to the folder where building images are stored.
     */
    function displayResults(buildings) {
        resultsContainer.innerHTML = '';
        buildings.forEach(building => {
            const card = document.createElement('div');
            card.className = 'result-card'; // Add a class for styling

            //Display buidling name
            const buildingName = document.createElement('h3');
            buildingName.textContent = building.name;

            //Add image of the buidling as background
            const img_url =  imageFolder + '/' + building.img_name;
            card.style.backgroundImage = `url('${img_url}')`;
            card.style.filter = `brightness(50%)`;

            card.appendChild(buildingName);
            resultsContainer.appendChild(card);
        });
    }
});