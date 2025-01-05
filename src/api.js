export default async function getReviews({
  order = "createdAt",
  offset = 0,
  limit = 6,
}) {
  const query = `?order=${order}&offset=${offset}&limit=${limit}`;
  const response = await fetch(
    `https://learn.codeit.kr/0909/film-reviews/${query}`
  );
  if (!response.ok) {
    throw new Error("에러메시지");
  }

  const body = await response.json();
  return body;
}
