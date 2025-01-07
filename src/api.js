const BASE_URL = "https://learn.codeit.kr/0909/film-reviews";

export async function getReviews({
  order = "createdAt",
  offset = 0,
  limit = 6,
}) {
  const query = `?order=${order}&offset=${offset}&limit=${limit}`;
  const response = await fetch(`${BASE_URL}/${query}`);
  if (!response.ok) {
    throw new Error("에러메시지");
  }

  const body = await response.json();
  return body;
}

export async function createReview(formData) {
  const response = await fetch(
    `
    ${BASE_URL}`,
    {
      method: "POST",
      body: formData,
    }
  );
  if (!response.ok) {
    throw new Error("리뷰생성 실패 ");
  }

  const body = await response.json();
  return body;
}

export async function updateReview(id, formData) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("리뷰수정 실패 ");
  }

  const body = await response.json();
  return body;
}
