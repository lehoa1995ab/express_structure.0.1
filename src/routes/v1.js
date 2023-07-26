import express from 'express';
const router = express.Router();

import userApi from './apis/user.api';

router.use('/users', userApi)

module.exports = router;