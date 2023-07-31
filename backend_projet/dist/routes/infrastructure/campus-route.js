"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const is_auth_1 = require("../../middleware/is-auth");
const roles_middleware_1 = require("../../middleware/roles-middleware");
const campus_controller_1 = require("../../controllers/infrastructure/campus-controller");
const router = express_1.default.Router();
router.post("/campus/new/", is_auth_1.isAuthenticated, roles_middleware_1.isEducationManager, campus_controller_1.newCampusPOST);
router.get("/campus/", is_auth_1.isAuthenticated, roles_middleware_1.isEducationManager, campus_controller_1.getCampusGET);
router.patch("/campus/:idCampus/", is_auth_1.isAuthenticated, roles_middleware_1.isEducationManager, campus_controller_1.patchCampusPATCH);
router.delete("/campus/:idCampus/", is_auth_1.isAuthenticated, roles_middleware_1.isEducationManager, campus_controller_1.deleteCampusDELETE);
module.exports = router;
//# sourceMappingURL=campus-route.js.map