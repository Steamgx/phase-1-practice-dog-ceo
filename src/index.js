document.addEventListener('DOMContentLoaded', () => {
    // URLs for the APIs
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
  
    // Fetch and display random dog images
    fetch(imgUrl)
      .then(response => response.json())
      .then(data => {
        const imageContainer = document.getElementById('dog-image-container');
        data.message.forEach(imageUrl => {
          const img = document.createElement('img');
          img.src = imageUrl;
          img.alt = 'Random Dog Image';
          img.style.width = '200px'; // You can adjust the size if necessary
          img.style.margin = '10px';
          imageContainer.appendChild(img);
        });
      })
      .catch(error => console.error('Error fetching dog images:', error));
  
    // Fetch and display the dog breeds
    fetch(breedUrl)
      .then(response => response.json())
      .then(data => {
        const breedList = document.getElementById('dog-breeds');
        const breedDropdown = document.getElementById('breed-dropdown');
  
        // Function to render the list of breeds
        const renderBreeds = (letter = '') => {
          breedList.innerHTML = ''; // Clear the breed list
          for (const breed in data.message) {
            if (data.message.hasOwnProperty(breed) && breed.startsWith(letter)) {
              const li = document.createElement('li');
              li.textContent = breed;
              li.style.cursor = 'pointer'; // Makes the breed name clickable
              
              // Event listener to change the font color on click
              li.addEventListener('click', () => {
                li.style.color = 'red'; // Change the color to red when clicked
              });
  
              breedList.appendChild(li);
            }
          }
        };
  
        // Initially render all breeds (without any filtering)
        renderBreeds();
  
        // Handle dropdown change to filter breeds
        breedDropdown.addEventListener('change', (event) => {
          const selectedLetter = event.target.value;
          renderBreeds(selectedLetter); // Filter the list based on the selected letter
        });
      })
      .catch(error => console.error('Error fetching dog breeds:', error));
  });
  