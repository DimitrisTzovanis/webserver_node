
function getUrlParameter(name) {
    name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

//Get the 'id' parameter from the URL

var categoryId = getUrlParameter('id');
console.log(categoryId)

fetch('https://wiki-ads.onrender.com/ads?category='+categoryId)
        .then(response => {

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })

        .then(data => {
          //Process the fetched data;
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

            const imagesDiv = document.createElement('div');
            imagesDiv.className = 'image-container';
            category.images.forEach(image => {
            const imgElement = document.createElement('img');
                imgElement.src = 'https://wiki-ads.onrender.com/'+image;
                console.log('https://wiki-ads.onrender.com/'+image);
                imgElement.alt = 'Property Image';
                imagesDiv.appendChild(imgElement);
            });

            const button = document.createElement('button');
            button.style.backgroundColor = 'red';
            button.id = 'heart-button'; //css
            button.classList.add('heart-button'); 
            button.onclick = function() {
              addToFavorites(category.id, category.title, category.description, category.cost, category.images[0]);
            };
            fieldsetElement.appendChild(button);
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
          console.error('Error fetching data:', error.message);
        });

var username;
var sessionId;

async function login() {
  username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const response = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  const loginMessage = document.getElementById('login-message');

  if (response.ok) {
    loginMessage.textContent = `Login successful. Session ID: ${data.sessionId}`;
    sessionId = data.sessionId;
    
  } else {
    loginMessage.textContent = `Login failed. Error: ${data.error}`;
  }
}

async function addToFavorites(adCode, title, description, cost, imgUrl) {
  if (!sessionId || !username) {
    alert('Please log in to add to favorites list');
    return;
  }

  const response = await fetch('/add-to-favorites', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ adCode, title, description, cost, imgUrl, username, sessionId }),
  });

  const data = await response.json();

  if (response.ok) {
    alert('Ad added to favorites successfully');
  } else {
    alert(`Error: ${data.error}`);
  }
}

async function favorites(){
  
  if (!sessionId || !username) {
    alert('Please log in to see favorites list');
    return;
  }
  
  window.location.href = '/favorite-ads.html?username='+username+'&sessionId='+sessionId;
  
}