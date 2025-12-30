
export async function shopLoader() {
  const keyword = encodeURIComponent("vinyl records");
  const geocode = "US";
  const zipcode = "10001";
  const page = 1;

  const url =
    `https://api.scrape.do/plugin/amazon/search` +
    `?token=${import.meta.env.VITE_SCRAPEDO_KEY}` +
    `&keyword=${keyword}` +
    `&geocode=${geocode}` +
    `&zipcode=${zipcode}` +
    `&page=${page}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Response("Failed to load shop data", {
      status: res.status
    });
  }

  return res.json();
}

