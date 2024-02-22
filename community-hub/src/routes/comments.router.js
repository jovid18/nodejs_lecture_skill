import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { prisma } from '../utils/prisma/index.js';

const router = express.Router();

router.post(
  '/posts/:postId/comments',
  authMiddleware,
  async (req, res, next) => {
    const { postId } = req.params;
    const { userId } = req.user;
    const { content } = req.body;

    const post = await prisma.posts.findFirst({
      where: {
        postId: +postId,
      },
    });
    if (!post)
      return res.status(404).json({ message: '포스트가 존재하지 않아요!' });

    const comment = await prisma.comments.create({
      data: {
        userId: +userId,
        postId: +postId,
        content: content,
      },
    });
    return res.status(201).json({ data: comment });
  }
);

router.get('/posts/:postId/comments', async (req, res, next) => {
  const { postId } = req.params;
  const comments = await prisma.comments.findMany({
    where: {
      postId: +postId,
    },
    orderBy: { createdAt: 'desc' },
  });
  return res.status(200).json({ data: comments });
});
export default router;
