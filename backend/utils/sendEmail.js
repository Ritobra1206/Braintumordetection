const {createTransport} = require('nodemailer');



exports.sendEmail = async({name,email,subject,otp,link}) =>{
    const transport = createTransport({
        host:process.env.SMTP_HOST,
        port:process.env.SMTP_PORT,
        auth:{
            user:process.env.SMTP_USER,
            pass:process.env.SMTP_PASS
        }
    })


const message =`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BrainTumor Site Verification Mail</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
    .email-container {
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      padding: 20px;
      max-width: 400px;
      width: 100%;
      text-align: center;
    }
    h1 {
      color: #333;
    }
    p {
      color: #555;
    }
    .otp {
      font-size: 24px;
      font-weight: bold;
      color: #007bff;
      margin-bottom: 20px;
    }
   
    .otp-link {
      display: block;
      text-decoration: none;
      color: #fff;
      background-color: #007bff;
      padding: 10px;
      border-radius: 4px;
      transition: background-color 0.3s;
    }
    .otp-link:hover {
      background-color: #0056b3;
    }
  </style>
</head>
<body>
  <div class="email-container">

    <h1>Hello ${name} !</h1>
    <p>Your OTP is:</p>
    <div class="otp">${otp}</div>
    <p>Please use the following link to input the OTP:</p>
    
    <a href=${link} class="otp-link">Verify OTP</a>
  </div>
</body>
</html>`




    await transport.sendMail({
        from:process.env.SMTP_USER,
        to:email,
        subject,
        html:message
    })

}