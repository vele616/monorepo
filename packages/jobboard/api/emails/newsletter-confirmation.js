module.exports = {
  subject: 'Newsletter Confirmation from CroCoder Jobs 🐊',
  html: (confirmUrl) => `
  <!doctype html>
  <html>
  
  <head>
    <meta name="viewport" content="width=device-width" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Newsletter Confirmation - CroCoder Jobs 🐊</title>
    <style>
      @import url("https://fonts.googleapis.com/css2?family=Rubik&display=swap");
      @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300&display=swap');
  
      body {
        color: #424c6d;
      }
  
      .link {
        font-family: "Rubik", sans-serif;
        color: #85a32a !important;
        cursor: pointer;
        font-size: 16px;
        line-height: 20px;
        text-decoration: none;
      }
  
      .link:hover {
        color: #98b534 !important;
      }
  
      .link:focus,
      .link:active {
        color: #72911f !important;
      }
  
      .link:disabled {
        color: #e8e8e8 !important;
      }
  
      .link--primary {
        text-decoration: none;
        display: inline-block;
        border-radius: 6px;
        border-style: solid;
        border-width: 1px;
        box-sizing: border-box;
        cursor: pointer;
        font-family: "Rubik", sans-serif;
        font-size: 16px;
        font-weight: 500;
        padding: 16px 25px 14px 25px;
        background-color: #85a32a !important;
        border-color: #85a32a !important;
        color: #1e1a1a !important;
        letter-spacing: 1px;
        text-transform: uppercase;
      }
  
      .link--primary:hover {
        background-color: rgba(151, 181, 52, 90);
        border-color: rgba(151, 181, 52, 90);
      }
  
      .link--primary:focus {
        outline: none;
        background-color: rgba(151, 181, 52, 90);
        border-color: #1e1a1a;
      }
  
      .link--primary:disabled,
      .link--primary:disabled:hover {
        cursor: not-allowed;
        background-color: #e8e8e8 !important;
        color: #828282 !important;
        border-color: #e8e8e8 !important;
      }
  
      .link--secondary {
        text-decoration: none;
        display: inline-block;
        border-radius: 6px;
        border-style: solid;
        border-width: 1px;
        box-sizing: border-box;
        cursor: pointer;
        font-family: "Rubik", sans-serif;
        font-size: 16px;
        font-weight: 500;
        padding: 16px 25px 14px 25px;
        background-color: #fec343 !important;
        border-color: #fec343 !important;
        color: #1e1a1a;
        letter-spacing: 1px;
        text-transform: uppercase;
      }
  
      .link--secondary:hover {
        background-color: rgba(254, 209, 82, 90);
        border-color: rgba(254, 209, 82, 90);
      }
  
      .link--secondary:focus {
        outline: none;
        background-color: rgba(254, 209, 82, 90);
        border-color: #1e1a1a !important;
      }
  
      .link--secondary:disabled,
      .link--secondary:disabled:hover {
        cursor: not-allowed;
        background-color: #e8e8e8 !important;
        color: #828282;
        border-color: #e8e8e8 !important;
      }
  
      img {
        border: none;
        -ms-interpolation-mode: bicubic;
        max-width: 100%;
      }
  
      body {
        background-color: rgb(246, 252, 253);
        font-family: "Rubik", sans-serif;
        -webkit-font-smoothing: antialiased;
        font-size: 16px;
        line-height: 1.4;
        margin: 0;
        padding: 0;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
      }
  
      table {
        border-collapse: separate;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
        width: 100%;
      }
  
      table td {
        font-family: "Rubik", sans-serif;
        font-size: 16px;
        vertical-align: top;
      }
  
      .body {
        background-color: rgb(246, 252, 253);
        ;
        width: 100%;
      }
  
      .container {
        display: block;
        margin: 0 auto !important;
        max-width: 580px;
        padding: 10px;
        width: 580px;
      }
  
      .content {
        box-sizing: border-box;
        display: block;
        margin: 0 auto;
        max-width: 580px;
        padding: 10px;
      }
  
      .main {
        background: #ffffff;
        border-radius: 3px;
        width: 100%;
      }
  
      .wrapper {
        box-sizing: border-box;
        padding: 20px;
      }
  
      .content-block {
        padding-bottom: 10px;
        padding-top: 10px;
      }
  
      .footer {
        clear: both;
        margin-top: 10px;
        text-align: center;
        width: 100%;
      }
  
      .footer td,
      .footer p,
      .footer span,
      .footer a {
        color: #999999;
        font-size: 12px;
        text-align: center;
      }
  
      h1,
      h2,
      h3,
      h4 {
        color: #424c6d;
        font-family: "Rubik", sans-serif;
        font-weight: 400;
        line-height: 1.4;
        margin: 0;
        margin-bottom: 30px;
      }
  
      h1 {
        font-size: 35px;
        font-weight: 300;
        text-align: center;
        text-transform: capitalize;
      }
  
      p,
      ul,
      ol {
        font-family: "Rubik", sans-serif;
        font-size: 16px;
        font-weight: normal;
        font-color: #424c6d;
        margin: 0;
        margin-top: 8px;
        margin-bottom: 7px;
      }
  
      p li,
      ul li,
      ol li {
        list-style-position: inside;
        margin-left: 5px;
      }
  
      .btn {
        box-sizing: border-box;
        width: 100%;
        margin-top: 10px;
        margin-bottom: 10px;
      }
  
      .btn>tbody>tr>td {
        padding-bottom: 15px;
      }
  
      .btn table {
        width: 100%;
      }
  
      .btn table td {
        background-color: #ffffff;
        border-radius: 5px;
        text-align: center;
      }
  
      .last {
        margin-bottom: 0;
      }
  
      .first {
        margin-top: 0;
      }
  
      .align-center {
        text-align: center;
      }
  
      .align-right {
        text-align: right;
      }
  
      .align-left {
        text-align: left;
      }
  
      .clear {
        clear: both;
      }
  
      .mt0 {
        margin-top: 0;
      }
  
      .mb0 {
        margin-bottom: 0;
      }
  
      .preheader {
        color: transparent;
        display: none;
        height: 0;
        max-height: 0;
        max-width: 0;
        opacity: 0;
        overflow: hidden;
        mso-hide: all;
        visibility: hidden;
        width: 0;
      }
  
      .powered-by a {
        text-decoration: none;
      }
  
      hr {
        border: 0;
        border-bottom: 1px solid #f6f6f6;
        margin: 20px 0;
      }
  
      @media only screen and (max-width: 620px) {
        table[class=body] h1 {
          font-size: 28px !important;
          margin-bottom: 10px !important;
        }
  
        table[class=body] p,
        table[class=body] ul,
        table[class=body] ol,
        table[class=body] td,
        table[class=body] span,
        table[class=body] a {
          font-size: 16px !important;
        }
  
        table[class=body] .wrapper,
        table[class=body] .article {
          padding: 10px !important;
        }
  
        table[class=body] .content {
          padding: 0 !important;
        }
  
        table[class=body] .container {
          padding: 0 !important;
          width: 100% !important;
        }
  
        table[class=body] .main {
          border-left-width: 0 !important;
          border-radius: 0 !important;
          border-right-width: 0 !important;
        }
  
        table[class=body] .btn table {
          width: 100% !important;
        }
  
        table[class=body] .btn a {
          width: 100% !important;
        }
  
        table[class=body] .img-responsive {
          height: auto !important;
          max-width: 100% !important;
          width: auto !important;
        }
      }
  
      .cro {
        color: #85a32a;
      }
  
      .coder {
        color: #424c6d;
        font-size: 1em;
        font-weight: 600;
      }
    </style>
  </head>
  
  <body>
    <span class="preheader">Just one more step! Please confirm your <span class="coder"><span
          class="cro">Cro</span>Coder</span> Jobs 🐊 subscription by clicking the link below.</span>
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
      <tr>
        <td>&nbsp;</td>
        <td class="container">
          <div class="content">
            <table role="presentation" class="main">
              <tr>
                <td class="wrapper">
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                    <tr>
                      <td>
                        <p>Hello from <span class="coder"><span class="cro">Cro</span>Coder</span> Jobs!</p>
                        <p>You are receieving this email so you can confirm your subscription to our jobs newsletter. You can do so by clicking on the button below.</p>
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                          <tbody>
                            <tr>
                              <td align="left">
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                  <tbody>
                                    <tr>
                                      <td> <a class="link--primary" href="${confirmUrl}" target="_blank">Confirm subscription</a> </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <p>In case the button does not work for you, you can also open this link:</p>
                        <a class="link" href="${confirmUrl}">${confirmUrl}</a>
                        <p>If you received this email by mistake, simply delete it. You are not subscribed to our newsletter until we get a confirmation from you that you really wish to do so (in other words, by clicking one of the confirmation links above.)</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <div class="footer">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td class="content-block">
                    <span class="apple-link">Brought to you by <a class="link" href="https://crocoder.dev?rel=subscription_email">Abram ltd.</a></span>
                  </td>
                </tr>
              </table>
            </div>
  
          </div>
        </td>
        <td>&nbsp;</td>
      </tr>
    </table>
  </body>
  
  </html>`,
};
