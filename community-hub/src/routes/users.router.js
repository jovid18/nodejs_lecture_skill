import express from 'express';
import { prisma } from '../utils/prisma/index.js';

const router = express.Router();
//post api
router.post('/sign-up', async (req, res, next) => {
  const { email, password, name, age, gender, profileImage } = req.body;
  const isExistUser = await prisma.users.findFirst({
    where: {
      email,
    },
  });
  if (isExistUser) {
    return res.status(409).json({ message: '이미 존재하는 이메일입니다.' });
  }
  const user = await prisma.users.create({
    data: {
      email,
      password,
    },
  });
  const userInfo = await prisma.userInfos.create({
    data: {
      userId: user.userId,
      name,
      age,
      gender: gender.toUpperCase(),
      profileImage,
    },
  });
  return res.status(201).json({ message: '회원가입이 완료되었습니다.' });
});

export default router;
