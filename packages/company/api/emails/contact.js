module.exports = {
  subject: (name, email) => `New contact from ${name} (${email})`,
  html: (notionUrl, email, name, message) => `
    <html>
      <body>
        <p>${notionUrl}</p>
        <p>${email}</p>
        <p>${name}</p>
        <p>${message}</p>
      </body>
    </html>
  `,
};
