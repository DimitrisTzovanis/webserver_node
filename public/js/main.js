
const apiUrl = 'https://wiki-ads.onrender.com/categories';

//Using fetch to make a GET request
fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    
    console.log('Fetched data:', data);

    const categoryContainer = document.getElementById('CategoriesDiv');

    data.forEach(category => {

      const categoryDiv = document.createElement('div');
      categoryDiv.className = 'category';

      const imgElement = document.createElement('img');
      imgElement.src = 'https://wiki-ads.onrender.com/'+category.img_url;
      imgElement.alt = category.title;

      //Go to the category.html link when the image is clicked
      imgElement.addEventListener('click', function() {
        window.location.href = '/category.html?id='+category.id;
      });

      const titleElement = document.createElement('h2');
      titleElement.textContent = category.title;

      titleElement.style.color = 'red';
      
      categoryDiv.appendChild(titleElement);
      categoryDiv.appendChild(imgElement);

      fetch('https://wiki-ads.onrender.com/categories/'+category.id+'/subcategories')
        .then(response => {
 
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })

        .then(data2 => {

          console.log('Fetched data:', data2);

          data2.forEach(subcategory => {

            const titleElement = document.createElement('li');
            titleElement.textContent = subcategory.title;
            
            titleElement.style.color = 'blue';
            titleElement.style.textDecoration = 'underline';
             
            titleElement.textContent = subcategory.title;

            //Go to the subcategory.html link when the heading is clicked
            titleElement.addEventListener('click', function() {
              window.location.href = '/subcategory.html?id='+subcategory.id;
            });
 
            categoryDiv.appendChild(titleElement);
            categoryContainer.appendChild(categoryDiv);
          }); 
          
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
        
      
    });
    
  })

  .catch(error => {
    console.error('Error fetching data:', error.message);
  });
