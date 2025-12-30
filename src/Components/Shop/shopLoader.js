export async function shopLoader() {

  const res = await fetch("https://rest.canopyapi.co/api/amazon/search?searchTerm=vinyl%20records&domain=US&limit=30&minPrice=0&conditions=NEW&sort=AVERAGE_CUSTOMER_REVIEW", {
    method: 'GET',
    headers: {
      'API-KEY': import.meta.env.VITE_CANOPY_KEY,
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Response("Failed to load hero data", { status: res.status });
  }

  return res.json();
}
