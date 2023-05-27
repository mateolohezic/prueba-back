const express = require('express');
const route = express.Router();
const { createUser, getUser, patchUser, deleteUser, getUserEspecifico, loginUser, passwordRecovery, changePassword } = require('../controllers/users');
const { jwtValidator } = require('../middleware/jwt')


route.get('/get-users', getUser);
route.post('/get-user/:token', getUserEspecifico);
route.post(`/login-user`, loginUser);
route.post('/create-user', createUser)
route.patch(`/patch-user`, patchUser);
route.delete(`/delete-user`, deleteUser);
route.post(`/password-recovery`, passwordRecovery);
route.post('/password-recovery/new-password', changePassword)

module.exports = route;