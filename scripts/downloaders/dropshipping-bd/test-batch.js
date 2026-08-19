const DropshippingClient = require('./client');

async function testProducts() {
  const client = new DropshippingClient();
  await client.login();
  
  const page1 = await client.getProductsPage(1, 5);
  for (const prod of page1.data) {
    console.log('====================================');
    console.log(`ID: ${prod.id} | SKU: ${prod.product_code} | Name: ${prod.name}`);
    console.log(`Sale Price: ${prod.sale_price} | Retail Price: ${prod.reselling_price}`);
    console.log(`Thumbnail: ${prod.thumbnail_img}`);
    if (prod.slug) {
      const details = await client.getProductDetails(prod.slug);
      console.log(`Categories: ${details.categories.join(' > ')}`);
      console.log(`Gallery Images (${details.galleryImages.length}):`, details.galleryImages);
    }
  }
}

testProducts();
