document.addEventListener("DOMContentLoaded", function () {
    showProducts('Men');
});
//function to show products based on the selected category
function showProducts(category) {
    //fetching the product data from the specified URL
    fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
        .then(response => response.json())//Parsing the response as JSON
        .then(data => {
            //finding the data for specified category
            const categoryData = data.categories.find(cat => cat.category_name === category);

            if (categoryData) {
                //clearing the existing product container
                document.getElementById('product-container').innerHTML = '';
                //looping through each product in the category and creating a product card
                categoryData.category_products.forEach(product => {
                    createProductCard(product);
                });
            }
        })
        .catch(error => console.error('Error fetching data:', error));//to log any error during fetch process
//to reset the style for all category buttons to default
        document.querySelectorAll('#tabs button').forEach(button => {
            button.style.backgroundColor = '#f2f2f2';
            button.style.color = 'black';
        });
//to highlight the clicked category button
        const clickedButton = document.querySelector(`#tabs button.${category.toLowerCase()}`);
        if (clickedButton) {
            clickedButton.style.backgroundColor = 'black';
            clickedButton.style.color = 'white';
        }
}
//creating product card with the given product data
function createProductCard(product) {
    //creating div for product data
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
//creating img element for product image
    const productImage = document.createElement('img');
    productImage.src = product.image;
    productImage.alt = product.title;
    productImage.className = 'product-image';
//creating a div for badge and appending it to product card, if badge text exists
    if (product.badge_text !== null) {
        const badge = document.createElement('div');
        badge.className = 'badge';
        badge.innerText = product.badge_text;
        productCard.appendChild(badge);
    }
    //creating h3 for product title
    const title = document.createElement('h3');
    title.innerText = `${product.title}`

    const vendor = document.createElement('p');
    vendor.innerText = `• ${product.vendor}`;
    title.style.float = 'left';
    vendor.style.marginLeft = '105px';

    const price = document.createElement('p');
    price.innerText = ` Rs ${product.price}.00`;

    const compareAtPrice = document.createElement('p');
    compareAtPrice.innerText = `${product.compare_at_price}.00`;

    const discount = document.createElement('p');
    const discountPercentage = calculateDiscountPercentage(product.price, product.compare_at_price);
    discount.innerText = ` ${discountPercentage}% off`;

    price.style.display = 'inline-block';
    price.style.marginRight = '6px';
    compareAtPrice.style.display = 'inline-block';
    compareAtPrice.style.marginRight = '6px';
    compareAtPrice.style.textDecoration = 'line-through';
    compareAtPrice.style.color = 'grey';
    discount.style.display = 'inline-block';
    discount.style.color = 'red';
//creating add to cart button
    const addToCartButton = document.createElement('button');
    addToCartButton.className="button";
    addToCartButton.innerText = 'Add to Cart';

//apending all the created elements to the product card
    productCard.appendChild(productImage);
    productCard.appendChild(title);
    productCard.appendChild(vendor);
    productCard.appendChild(price);
    productCard.appendChild(compareAtPrice);
    productCard.appendChild(discount);
    productCard.appendChild(addToCartButton);

//apending product card to the product container
    document.getElementById('product-container').appendChild(productCard);
}
//calculating discount percentage
function calculateDiscountPercentage(price, compareAtPrice) {
    const discount = ((compareAtPrice - price) / compareAtPrice) * 100;
    return Math.round(discount);
}