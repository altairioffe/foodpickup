//Load Env Variables
require('dotenv').config();
const TWILIO_ACCOUNT_SID    = process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN         = process.env.TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER       = process.env.TWILIO_PHONE_NUMBER,
  CUSTOMER_PHONE_NUMBER     = process.env.CUSTOMER_PHONE_NUMBER,
  RESTAURANT_PHONE_NUMBER   = process.env.RESTAURANT_PHONE_NUMBER;


//Middleware
const express               = require('express');
const router                = express.Router();
const twilio                = require('twilio');
const MessagingResponse     = require('twilio').twiml.MessagingResponse;
const client                = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);


//ROUTES:
router.get("/", (req, res) => {
  res.render("landing_page");
});

router.get("/payment", (req, res) => {
  res.render("payment");
});

router.post("/payment", (req, res) => {
  res.redirect("/payment");
});


//Twilio route
//1. CUSTOMER SUBMITS payment, creates POST request to /message, triggers SMS to restaurant
router.post('/message', function(req, res, next) {
  // Use the REST client to send a text message
  client.messages.create({
    to: RESTAURANT_PHONE_NUMBER,
    from: TWILIO_PHONE_NUMBER,
    body: `New order: ${req.body.message}.\nPlease respond with ETA as numerical value in MINUTES.`
  })
  .then(function(message) {
    res.redirect('/confirmation');
  })
  .catch(error => res.status(500).send(error));
});



router.get("/confirmation", (req, res) => {
  res.render("confirmation");
});

router.post("/confirmation", (req, res) => {
res.redirect("/confirmation");
});

module.exports = router;
