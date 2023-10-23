const express = require('express')
const router = express.Router();
const adminController = require('./admin.controller');
const checkAuth = require("../middleware/check-auth");

router.post('/signIn', adminController.admin_signUp);

router.get('/logIn',  adminController.admin_logIn);

router.delete('/deleteAdmin/:id', checkAuth, adminController.admin_delete);

router.patch('/updateAdmin/:id', checkAuth, adminController.admin_update);

router.get('/viewAdmin', adminController.admin_getAll);

module.exports = router;
