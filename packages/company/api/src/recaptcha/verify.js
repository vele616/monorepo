const fetch = require("node-fetch");
const FormData = require("form-data");

const verify = async (token) => {
  try {
    const formData = new FormData();
    formData.append("secret", process.env.RECAPTCHA_SECRET);
    formData.append("response", token);

    const options = {
      method: "POST",
      body: formData,
    };

    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      options
    );

    if (response.status !== 200) {
      return false;
    }

    const { success, score, action } = await response.json();

    console.log("recaptcha", success, score, action);

    return success && action === "submit" && score >= 0.5;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = verify;
