const DropshippingClient = require('./client');

async function testDetailSelectors() {
  const client = new DropshippingClient();
  await client.login();
  
  const slug = 'premium-zafran-felix-luxury-abaya-with-embroidery-stone-work-matching-hijab-adjustable-inner-modest-fashion-plum-13292';
  const url = `${client.baseUrl}/product/${slug}`;
  const res = await fetch(url, {
    headers: {
      'Cookie': client._getCookieHeader(),
      'User-Agent': 'Mozilla/5.0'
    }
  });
  const html = await res.text();
  
  // Find where .project-picture or carousel is
  const projectPicMatches = [...html.matchAll(/class="[^"]*project-picture[^"]*"[\s\S]*?<img[^>]+src="([^">]+)"/gi)].map(m => m[1]);
  const owlDotMatches = [...html.matchAll(/class="[^"]*owl-dot[^"]*"[\s\S]*?<img[^>]+src="([^">]+)"/gi)].map(m => m[1]);
  
  // Find all images inside the main product gallery block
  // Let's find the section containing the product gallery
  const galleryBlockMatch = html.match(/<div[^>]*class="[^"]*(?:product-gallery|single-product-image|product-details-image|product-image-slider|project-picture|product_details_left)[^"]*"[\s\S]*?<\/div>\s*<\/div>/i);
  
  console.log('Project pic matches:', projectPicMatches);
  console.log('Owl dot matches:', owlDotMatches);

  // Let's check regex for all img tags inside the primary gallery container
  const primaryImages = [];
  const primaryImgRegex = /<div[^>]+class="[^"]*project-picture[^"]*"[^>]*>\s*<img[^>]+src="([^">]+)"/gi;
  let m;
  while ((m = primaryImgRegex.exec(html)) !== null) {
    primaryImages.push(m[1]);
  }
  console.log('Primary images:', primaryImages);
}

testDetailSelectors();
