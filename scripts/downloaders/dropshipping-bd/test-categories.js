const DropshippingClient = require('./client');

(async () => {
  const client = new DropshippingClient();
  await client.login();
  const res = await fetch(client.baseUrl + '/dropshipper/products/show/all', {
    headers: {
      'Cookie': client._getCookieHeader(),
      'User-Agent': 'Mozilla/5.0'
    }
  });
  const html = await res.text();
  
  // Look for category options
  const catOptions = [...html.matchAll(/<option[^>]*value="(\d+)"[^>]*>([\s\S]*?)<\/option>/gi)];
  console.log('Category options found in page:', catOptions.map(o => `${o[1]}: ${o[2].trim()}`));

  // Also check if there are subcategory API calls in the JS bundles
  const scriptSrcs = [...html.matchAll(/<script[^>]+src="([^">]+)"/gi)].map(m => m[1]);
  console.log('Script sources:', scriptSrcs);
})();
