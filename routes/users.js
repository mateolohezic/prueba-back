const express = require('express');
const route = express.Router();
const { createUser, getUser, patchUser, deleteUser, getUserEspecifico, getUserEspecificoId, loginUser, passwordRecovery, changePassword, changeUserStatus } = require('../controllers/users');
const { verifyAdminTokenDirect, verifyUserTokenDirect, verifyAdminToken, verifyUserToken } = require('../middleware/jwt')

route.post('/get-users', verifyUserToken, getUser);
route.post('/get-user/:token', getUserEspecifico);
route.post('/get-user-id/:id', verifyUserToken, getUserEspecificoId);
route.post(`/login-user`, loginUser);
route.post('/create-user', createUser)
route.patch(`/patch-user`, verifyUserToken, patchUser);
route.patch(`/change-user-status`, changeUserStatus);
route.delete(`/delete-user`, deleteUser);
route.post(`/password-recovery`, passwordRecovery);
route.post('/password-recovery/new-password', changePassword)
route.post('/verify-token', verifyAdminTokenDirect);
route.post('/verify-token-user', verifyUserTokenDirect);

module.exports = route;