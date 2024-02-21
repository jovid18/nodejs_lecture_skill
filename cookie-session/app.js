import express from 'express';
import cookieParser from 'cookie-parser';
const app = express();
const PORT = 5001;

app.use(express.json());
app.use(cookieParser());

app.get('/set', (req, res) => {
  res.cookie('name', 'nodejs');
  return res.status(200).end();
});

app.get('/get', (req, res) => {
  const cookies = req.cookies;
  return res.status(200).json({ cookies });
});

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});
