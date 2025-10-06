document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("trainingForm");
  const status = document.getElementById("status");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.textContent = "⏳ Отправка...";
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("https://script.google.com/macros/s/AKfycbygjVpDcluLIG_2PmdZZPmMqhuyM2orq0Fy8RWJlKw6b0uXBQhG24K-4k9RSX6YaSkn1g/exec", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      const json = await res.json();
      if (json.ok) {
        status.textContent = "✅ Заявка успешно отправлена!";
        form.reset();
      } else {
        status.textContent = "⚠️ Ошибка: " + (json.error || "Неизвестная ошибка");
      }
    } catch (err) {
      status.textContent = "❌ Ошибка сети: " + err.message;
    }
  });
});
