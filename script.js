// GALLERY
document.addEventListener('DOMContentLoaded', function() {
    const featuredImage = document.getElementById('featured-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    // Set the first thumbnail as active by default
    thumbnails[0].classList.add('active');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Get the image source from the thumbnail's image
            const imgSrc = this.querySelector('img').src;
            
            // Update the featured image
            featuredImage.src = imgSrc;
            
            // Remove active class from all thumbnails
            thumbnails.forEach(thumb => {
                thumb.classList.remove('active');
            });
            
            // Add active class to the clicked thumbnail
            this.classList.add('active');
        });
    });
});

// PRODUCTS

document.addEventListener('DOMContentLoaded', function() {
    // Function to display products
    function displayProducts(products) {
      const productsContainer = document.querySelector('.products');
      
      // Clear any existing content
      if (productsContainer) {
        productsContainer.innerHTML = '';
        
        // Loop through products and create HTML for each
        products.forEach(product => {
          const productCard = document.createElement('div');
          productCard.className = 'product-card';
          
          productCard.innerHTML = `
            <div class="product-img">
              <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
              <h3>${product.name}</h3>
              <div class="product-weight">${product.weight}</div>
              <div class="product-price">${product.currency}${product.price.toFixed(3)}</div>
            </div>
          `;
          
          productsContainer.appendChild(productCard);
        });
      }
    }
  
    // Load products from the JSON file
    fetch('products.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        displayProducts(data.products);
      })
      .catch(error => {
        console.error('Error loading products:', error);
        // Display error message to user
        const productsContainer = document.querySelector('.products');
        if (productsContainer) {
          productsContainer.innerHTML = '<p class="error-message">Sorry, we couldn\'t load the products. Please try again later.</p>';
        }
      });
  });