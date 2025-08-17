document.getElementById("tokenizeBtn").addEventListener("click", async () => {
  const inputText = document.getElementById("inputText").value;

  const res = await fetch("http://127.0.0.1:8000/tokenize", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ input: inputText })
  });

  const data = await res.json();
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  if (data.tokens) {
    data.tokens.forEach(token => {
      const span = document.createElement("span");
      span.className = "token";
      span.textContent = token;
      resultDiv.appendChild(span);
    });
  } else {
    resultDiv.textContent = "Error: " + data.error;
  }
});
