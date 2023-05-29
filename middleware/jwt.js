const jwt = require('jsonwebtoken');
require('dotenv').config();
const adminTokenSecret = process.env.CLAVE_ADMIN
const userTokenSecret = process.env.CLAVE_USER

const verifyAdminTokenDirect = async (req, res) => {
    const {adminToken} = req.body;

    try {
        const verify = jwt.verify(adminToken, adminTokenSecret);
        if (verify) {
            res.status(200).send('Token valido!.');
        } else {
            res.status(206).send('Token invalido.');
        }
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            res.status(206).json({ message: 'Token invalido.' });
        } else if (error.name === 'TokenExpiredError') {
            res.status(206).json({ message: 'Su sesión expiro.' });
        } else {
            res.status(206).json({ message: 'Error en el servidor.' });
        }
    }
}

const verifyUserTokenDirect = async (req, res) => {
    const {token} = req.body;

    try {
        const verify = jwt.verify(token, userTokenSecret);
        if (verify) {
            res.status(200).send('Token valido!.');
        } else {
            res.status(206).send('Token invalido.');
        }
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            res.status(206).json({ message: 'Token invalido.' });
        } else if (error.name === 'TokenExpiredError') {
            res.status(206).json({ message: 'Su sesión expiro.' });
        } else {
            res.status(206).json({ message: 'Error en el servidor.' });
        }
    }
}

const verifyAdminToken = async (req, res, next) => {
    const {token} = req.body;

    try {
        const verify = jwt.verify(token, adminTokenSecret);
        if (verify) {
            return next()
        } else {
            res.status(206).send('Token invalido.');
        }
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            res.status(206).json({ message: 'Token invalido.' });
        } else if (error.name === 'TokenExpiredError') {
            res.status(206).json({ message: 'Su sesión expiro.' });
        } else {
            res.status(206).json({ message: 'Error en el servidor.' });
        }
    }
}

const verifyUserToken = async (req, res, next) => {
    const {token} = req.body;

    try {
        const verify = jwt.verify(token, userTokenSecret);
        if (verify) {
            return next()
        } else {
            res.status(206).send('Token invalido.');
        }
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            res.status(206).json({ message: 'Token invalido.' });
        } else if (error.name === 'TokenExpiredError') {
            res.status(206).json({ message: 'Su sesión expiro.' });
        } else {
            res.status(206).json({ message: 'Error en el servidor.' });
        }
    }
}
  

module.exports = { verifyAdminTokenDirect, verifyUserTokenDirect, verifyAdminToken, verifyUserToken }