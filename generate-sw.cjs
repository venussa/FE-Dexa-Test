const fs = require("fs");
const path = require("path");
require("dotenv").config();

const templatePath = path.join(__dirname, "./firebase-sw-template.js");
const outputPath = path.join(__dirname, "./public/firebase-messaging-sw.js");

let content = fs.readFileSync(templatePath, "utf-8");

content = content
  .replace("<API_KEY>", process.env.VITE_FIREBASE_API_KEY)
  .replace("<AUTH_DOMAIN>", process.env.VITE_FIREBASE_AUTH_DOMAIN)
  .replace("<PROJECT_ID>", process.env.VITE_FIREBASE_PROJECT_ID)
  .replace("<STORAGE_BUCKET>", process.env.VITE_FIREBASE_STORAGE_BUCKET)
  .replace("<MESSAGING_SENDER_ID>", process.env.VITE_FIREBASE_MESSAGING_SENDER_ID)
  .replace("<APP_ID>", process.env.VITE_FIREBASE_APP_ID);

fs.writeFileSync(outputPath, content);

console.log("firebase-messaging-sw.js berhasil digenerate!");