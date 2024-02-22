// app.js

import express from 'express';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 3019;

// 비밀 키는 외부에 노출되면 안되겠죠? 그렇기 때문에, .env 파일을 이용해 비밀 키를 관리해야합니다.
const ACCESS_TOKEN_SECRET_KEY = `HangHae99`; // Access Token의 비밀 키를 정의합니다.
const REFRESH_TOKEN_SECRET_KEY = `Sparta`; // Refresh Token의 비밀 키를 정의합니다.

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  return res.status(200).send('Hello Token!');
});

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});
