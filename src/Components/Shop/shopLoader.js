export async function shopLoader() {
  const keyword = encodeURIComponent("vinyl records");
  const geocode = "US";
  const zipcode = "10001";

  const url = (page) =>
    `https://api.scrape.do/plugin/amazon/search` +
    `?token=${import.meta.env.VITE_SCRAPEDO_KEY}` +
    `&keyword=${keyword}` +
    `&geocode=${geocode}` +
    `&zipcode=${zipcode}` +
    `&page=${page}`;

  const [res1, res2] = await Promise.all([
    fetch(url(1)),
    fetch(url(2))
  ]);

  if (!res1.ok || !res2.ok) {
    throw new Response("Failed to load shop data", {
      status: res1.status || res2.status
    });
  }

  const data1 = await res1.json();
  const data2 = await res2.json();

  return [...data1.products, ...data2.products];
}


