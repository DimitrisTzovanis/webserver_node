

function getUrlParameter(name) {
    name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Get the 'id' parameter from the URL
var subcategoryId = getUrlParameter('id');
console.log(subcategoryId)

fetch('https://wiki-ads.onrender.com/ads?subcategory='+subcategoryId)
        .then(response => {
          //Check if the response status is OK (200)
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          // Parse the response JSON
          return response.json();
        })

        .then(data => {
          // Process the fetched data;
          console.log('Fetched data:', data);
          const categoryContainer = document.getElementById('CategoriesDiv');
          const categoryDiv = document.createElement('div');
          categoryDiv.className = 'category';
          data.forEach(category => {
            
            const fieldsetElement = document.createElement('fieldset');

            const titleElement = document.createElement('h2');
            titleElement.textContent = category.title;

            const descriptionElement = document.createElement('span');
            descriptionElement.textContent = category.description;

            const costElement = document.createElement('h4');
            costElement.textContent = category.cost;

            /*const imgElement = document.createElement('img');
            imgElement.src = 'https://wiki-ads.onrender.com/'+category.img_url;
            imgElement.alt = category.images;*/

            const imagesDiv = document.createElement('div');
            imagesDiv.className = 'image-container';
            category.images.forEach(image => {
            const imgElement = document.createElement('img');
                imgElement.src = 'https://wiki-ads.onrender.com/'+image;
                console.log('https://wiki-ads.onrender.com/'+image);
                imgElement.alt = 'Property Image';
                imagesDiv.appendChild(imgElement);
            });
            
            const featuresTable = document.createElement('table');
            const featuresTbody = document.createElement('tbody');

            if (category.features && typeof category.features === 'string') {
              category.features.split(';').forEach(feature => {
                const featureRow = document.createElement('tr');
                const [label, value] = feature.split(':');

                const labelCell = document.createElement('th');
                labelCell.textContent = label ? label.trim() : 'null';

                const valueCell = document.createElement('td');
                valueCell.textContent = value ? value.trim() : 'null';

                featureRow.appendChild(labelCell);
                featureRow.appendChild(valueCell);

                featuresTbody.appendChild(featureRow);
              });
            } else {
              console.log('Handle the case where features is undefined or not a string');
              const featureRow = document.createElement('tr');

              const labelCell = document.createElement('th');
              labelCell.textContent = 'null';

              const valueCell = document.createElement('td');
              valueCell.textContent = 'null';

              featureRow.appendChild(labelCell);
              featureRow.appendChild(valueCell);

              featuresTbody.appendChild(featureRow);
            }
            featuresTable.appendChild(featuresTbody);
            categoryDiv.appendChild(titleElement);
            categoryDiv.appendChild(descriptionElement);
            categoryDiv.appendChild(costElement);
            
            fieldsetElement.appendChild(titleElement);
            fieldsetElement.appendChild(descriptionElement);
            fieldsetElement.appendChild(costElement);
            fieldsetElement.appendChild(imagesDiv);
            fieldsetElement.appendChild(featuresTable);

            categoryDiv.appendChild(fieldsetElement);
            
            categoryContainer.appendChild(categoryDiv);

            
        }); 
          
        })
        .catch(error => {
          // Handle any errors that occurred during the fetch
          console.error('Error fetching data:', error.message);
        });
        

