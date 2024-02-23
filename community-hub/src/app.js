import express from 'express';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import UsersRouter from './routes/users.router.js';
import PostsRouter from './routes/posts.router.js';
import CommentsRouter from './routes/comments.router.js';
import LogMiddleware from './middlewares/log.middleware.js';
import ErrorHandlingMiddleware from './middlewares/error-handling.middleware.js';
const app = express();
const PORT = 3018;

app.use(LogMiddleware);
app.use(express.json());
app.use(cookieParser());
app.use(
  expressSession({
    secret: 'custum-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use('/api', [UsersRouter, PostsRouter, CommentsRouter]);

app.use(ErrorHandlingMiddleware);
app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});
