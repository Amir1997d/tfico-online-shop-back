const express = require("express");

const router = express.Router();

router.post("/contact-us", async (req, res) => {
  const { sendFrom, name, email, phone, images, message } = req.body;
  try {
    await fetch(process.env.EMAIL_SERVER_URI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sendFrom, name, email, phone, images, message }),
      }
    )
    .then(res => { 
      res.json()
      if(!res.ok) {
        return res.status(500).json({message: "Email Is Not Sent(n8n)!"});
      }
    })
    res.status(200).json({message: "Email Is Sent!"});
  } catch (err) {
    console.log("Some Error From Server Side:", err);
    res.status(500).json({message: "Email Is Not Sent!"});
  }
});

module.exports = router;