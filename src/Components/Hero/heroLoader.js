export async function heroLoader() {
  const res = await fetch("https://www.googleapis.com/books/v1/volumes?q=+subject:Fantasy&orderBy=relevance&maxResults=20");

  if (!res.ok) {
    throw new Response("Failed to load hero data", { status: res.status });
  }

  return res.json();
}
