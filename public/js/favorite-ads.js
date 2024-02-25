
const adContainer = document.getElementById('favoritesContainer');

function getUrlParameter(name) {
  name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

//Get the 'id' parameter from the URL
var username = getUrlParameter('username');
var sessionId = getUrlParameter('sessionId');

fetch(`/favorites-retrieval?username=${username}&sessionId=${sessionId}`)
  .then(response => response.json())
  .then(favorites => {
    console.log('User Favorites:', favorites);
    const favoritesData = favorites.favorites;

    //Display favorite ads
    favoritesData.forEach(ad => {
      const adElement = document.createElement('div');

      const fieldsetElement = document.createElement('fieldset');

      const adCodeElement = document.createElement('p');
      adCodeElement.textContent = `Ad Code: ${ad.adCode}`;

      const costElement = document.createElement('p');
      costElement.textContent = `Cost: ${ad.cost} €`;

      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = ad.description;

      const imgUrlElement = document.createElement('img');
      imgUrlElement.src = 'https://wiki-ads.onrender.com/'+ad.imgUrl;
      imgUrlElement.alt = 'Ad Image';
      console.log(imgUrlElement.src)
      const titleElement = document.createElement('h2');
      titleElement.textContent = ad.title;

      //Append elements to the container
      fieldsetElement.appendChild(titleElement);
      fieldsetElement.appendChild(adCodeElement);
      fieldsetElement.appendChild(costElement);
      fieldsetElement.appendChild(descriptionElement);
      fieldsetElement.appendChild(imgUrlElement);
      adElement.appendChild(fieldsetElement);
      favoritesContainer.appendChild(adElement);
    });

  })
  .catch(error => {
    console.error('Error fetching favorites:', error);
  });
