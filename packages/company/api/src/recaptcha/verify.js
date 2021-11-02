const fetch = require("node-fetch");

const verify = async (token) => {
  const formData = new FormData();
  formData.append("secret", process.env.RECAPTCHA_SECRET);
  formData.append("response", token);

  const response = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "post",
      body: formData,
      headers: { "Content-Type": "application/json" },
    }
  );

  if (response.status !== 200) {
    return false;
  }

  const { success, score, action } = await response.json();

  console.log(score);

  return success && action === "submit" && score >= 0.5;
};

module.exports = verify;
