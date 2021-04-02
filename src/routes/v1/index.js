const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const upcomingLaunchesRoute = require('./launch.route');
const podRoute = require('./pod.route');
const hubblesiteRoute = require('./hubblesite.route');
const snaRoute = require('./sna.route');
const subscriptionRoute = require('./subscription.route');
const defaultRoute = require('./default.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {

    path: '/',
    route: defaultRoute,

  },
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/upcomingLaunches',
    route: upcomingLaunchesRoute,
  },
  {
    path: '/pod',
    route: podRoute,
  },
  {
    path: '/news',
    route: hubblesiteRoute,
  },
  {
    path: '/snanews',
    route: snaRoute,
  },
  {
    path: '/subscribe',
    route: subscriptionRoute,
  },
];

/* const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
]; */

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
/* if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
} */

module.exports = router;
