"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const authentication_1 = require("../../controllers/auth/authentication");
const is_auth_1 = require("../../middleware/is-auth");
const router = express_1.default.Router();
router.post('/signup/', authentication_1.signup);
router.post('/login/', authentication_1.login);
router.patch('/pswd/', is_auth_1.isAuthenticated, is_auth_1.isModifyingUserPswdRight, authentication_1.updatePasswordPATCH);
module.exports = router;
//# sourceMappingURL=auth-route.js.map