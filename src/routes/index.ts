
import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { CommentRoutes } from '../modules/comments/comment.route';
import { UserRoutes } from '../modules/user/user.route';
import { PaymentRoutes } from '../modules/payment/payment.route';
import { PostRoutes } from '../modules/posts/post.route';
import { StatisticsRoutes } from '../modules/statistics/statistics.route';
import { NotificationRoutes } from '../modules/notification/notification.route';

const router = express.Router()

const moduleRoutes = [
    {
      path: '/auth',
      route: AuthRoutes,
    },
    {
      path: '/users',
      route: UserRoutes,
    },
    {
      path: '/posts',
      route: PostRoutes,
    },
    {
      path: '/comments',
      route: CommentRoutes,
    },
    {
      path: '/payments',
      route: PaymentRoutes,
    },
    {
      path: '/statistics',
      route: StatisticsRoutes,
    },
    {
      path: '/notification',
      route: NotificationRoutes,
    },
  ];
  
  moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;