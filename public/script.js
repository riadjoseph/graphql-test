document.addEventListener("DOMContentLoaded", function () {
    const productId = '1'; // Product ID to fetch
  
    // Function to fetch product data
    function fetchProduct() {
      return axios.post('http://localhost:4000/graphql', {
        query: `
          query {
            product(id: "${productId}") {
              name
              price
              imageUrl
            }
          }
        `
      });
    }
  
    // Function to fetch all related products
    function fetchRelatedProducts() {
      return axios.post('http://localhost:4000/graphql', {
        query: `
          query {
            relatedProducts {
              id
              name
              price
              imageUrl
            }
          }
        `
      });
    }
  
    // Load product and related products
    Promise.all([fetchProduct(), fetchRelatedProducts()])
      .then(([productRes, relatedRes]) => {
        // Handle product data
        if (productRes.data && productRes.data.data && productRes.data.data.product) {
          const product = productRes.data.data.product;
          document.getElementById('product-name').textContent = product.name;
          document.getElementById('product-price').textContent = `$${product.price}`;
          document.getElementById('product-image').src = product.imageUrl;
          document.getElementById('product-image').alt = product.name; // Add alt text to the image
        } else {
          console.error('Product data not found');
        }
  
        // Handle related products data
        if (relatedRes.data && relatedRes.data.data && relatedRes.data.data.relatedProducts) {
          const relatedProductsList = document.getElementById('related-products-list');
          relatedRes.data.data.relatedProducts.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'related-product';
            productElement.innerHTML = `
              <img src="${product.imageUrl}" alt="${product.name}" />
              <p>${product.name}</p>
              <p>$${product.price}</p>
            `;
            relatedProductsList.appendChild(productElement);
          });
        } else {
          console.error('Related products data not found');
        }
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
  });
  