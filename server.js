import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();


const CLIENT_ID = "01KJDBHDCTMKE7JFHFDS7PH6X4"
const CLIENT_SECRET = "66947b0c094c3bffd720c82ff56e8e533119926f7855992f58c403add35b3e54"
const REDIRECT_URI = "http://localhost:3000/callback";

app.get("/", (req, res) => {
  res.send('<a href="/login">Přihlásit se přes Kick</a>');
});

app.get("/login", (req, res) => {
  const url = `
https://id.kick.com/oauth/authorize?
    response_type=code&
    client_id=${CLIENT_ID}&
    redirect_uri=${REDIRECT_URI}&
    scope=<scopes>&
    code_challenge=<code_challenge>&
    code_challenge_method=S256&
    state=1`;
  console.log(url);
  
  res.redirect(url);
});

app.get("/callback", async (req, res) => {
  const code = req.query.code;

  const response = await fetch("https://kick.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code: code,
      grant_type: "authorization_code",
      redirect_uri: REDIRECT_URI
    })
  });

  const data = await response.json();
  res.json(data);
});

app.listen(3000, () => {
  console.log("Server běží na http://127.0.0.1:3000/");
});