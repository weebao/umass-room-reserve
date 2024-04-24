
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