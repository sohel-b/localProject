const jwt = require("jsonwebtoken");

const user = { id: "123", name: "Sohel" };
const token = jwt.sign(user, "yourSecretKey", { expiresIn: "1h" });
console.log(token);

try {
  const decoded = jwt.verify(token, "yourSecretKey");
  console.log(decoded); // { id: "123", name: "Sohel", iat: ..., exp: ... }
} catch (err) {
  console.log("Invalid token");
}


A JWT is basically a string that looks like this:   
xxxxx.yyyyy.zzzzz
It has three parts separated by dots (.):

Header (Base64 encoded)
{
  "alg": "HS256",
  "typ": "JWT"
}

Payload (Base64 encoded)
{
  "id": "12345",
  "name": "Sohel",
  "role": "developer",
  "exp": 1736344800
}

Signature
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  your-secret-key
)


Final Token
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJpZCI6IjEyMzQ1IiwibmFtZSI6IlNvaGVsIiwicm9sZSI6ImRldmVsb3BlciIsImV4cCI6MTczNjM0NDgwMH0.
6f9ca2dc2d06c1e9b18d4d8a3f6ef3d9a...