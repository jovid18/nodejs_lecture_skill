import express from 'express';
import jwt from 'jsonwebtoken';
const app = express();

app.post('/login', function async(req, res, next) {
  const user = {
    // 사용자 정보
    userId: 203, // 사용자의 고유 아이디 (Primary key)
    email: 'archepro84@gmail.com', // 사용자의 이메일
    name: '이용우', // 사용자의 이름
  };
  const userJWT = jwt.sign(user, 'mysecretkey', { expiresIn: '1h' });
  res.cookie('jwt-express', userJWT);
  return res.status(200).end();

  //   res.cookie('sparta', user); // sparta 라는 이름을 가진 쿠키에 user 객체를 할당합니다.
  //   return res.status(200).end();
});

app.listen(5002, () => {
  console.log(5002, '번호로 서버가 켜졌어요!');
});
