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

const tokenStorages = {};

//액세스, 리프레시 토큰 발급 API
app.post('/tokens', async (req, res) => {
  const { id } = req.body;
  // 액세스 토큰과 리프레시 토큰을 발급
  const accessToken = jwt.sign({ id: id }, ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: '10s',
  });
  const refreshToken = jwt.sign({ id: id }, REFRESH_TOKEN_SECRET_KEY, {
    expiresIn: '1m',
  });
  tokenStorages[refreshToken] = {
    id: id,
    ip: req.ip,
    userAgent: req.headers['user-agent'],
  };
  //클라이언트에게 쿠키(토큰)을 할당
  res.cookie('accessToken', accessToken);
  res.cookie('refreshToken', refreshToken);

  return res
    .status(200)
    .json({ message: 'Token이 정상적으로 발급되었습니다. ' });
});

//액세스 토큰 검증 API
app.get('/tokens/validate', async (req, res) => {
  const { accessToken } = req.cookies;
  if (!accessToken)
    return res
      .status(400)
      .json({ errorMessage: 'Access Token이 존재하지 않습니다.' });

  const payload = validateToken(accessToken, ACCESS_TOKEN_SECRET_KEY);

  if (!payload) {
    return res
      .status(400)
      .json({ errorMessage: 'Access Token이 정상적이지 않습니다.' });
  }
  const { id } = payload;
  return res.status(200).json({
    message: `${id}의 Payload를 가진 Token이 정상적으로 인증 되었습니다.`,
  });
});

//Token을 검증하고, Payload를 조회하기위한 함수
function validateToken(token, secretKey) {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    return null;
  }
}

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});
