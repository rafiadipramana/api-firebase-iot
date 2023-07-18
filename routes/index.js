var express = require("express");
var router = express.Router();
require('dotenv').config();
const { initializeApp } = require("firebase/app");
const { getFirestore, addDoc, collection } = require("firebase/firestore");

/* GET home page. */
router.post("/", async function (req, res) {
  // Inisialisasi Firebase dengan akun Google Anda
  const app = initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
  });

  const db = getFirestore(app);

  try {
    const waktuSekarang = new Date();

    const docRef = await addDoc(collection(db, "plants"), {
      suhu: req.body.suhu,
      kelembapan_udara: req.body.kelembapan_udara,
      intensitas_cahaya: req.body.intensitas_cahaya,
      catatan_waktu: waktuSekarang
    });

    res
      .json({
        docRef,
      })
      .status(201);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
