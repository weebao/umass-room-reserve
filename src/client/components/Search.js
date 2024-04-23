
document.addEventListener('DOMContentLoaded', function() {
    const searchBttn = document.getElementById('search-button');
    const searchInput = document.getElementById('building-name');
  
    searchBttn.addEventListener('click', async function(){
        const searchQuery = searchInput.value.toLowerCase();
        try {
            const response = await fetch(`http://localhost:3260/getBuilding?name=${searchQuery}`);
            const data = await response.json(); 
            console.log("Search Results: ", data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }

    });
});