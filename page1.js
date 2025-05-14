const input = document.getElementById("ingredientsInput");
const button = document.getElementById("recommendBtn");
const result = document.getElementById("result");

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

button.addEventListener("click", async () => {
  const ingredients = input.value.trim();
  if (!ingredients) {
    result.textContent = "재료를 입력해주세요.";
    return;
  }

  result.textContent = "추천 중입니다...";

  const messages = [
    {
      role: "system",
      content: "당신은 훌륭한 요리사입니다. 사용자가 가진 재료로 저녁 메뉴를 추천해주세요.",
    },
    {
      role: "user",
      content: `냉장고 속 재료: ${ingredients}`,
    },
  ];

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4-turbo",
      messages,
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content;
  result.textContent = reply || "추천 결과를 받아오지 못했습니다.";
});
