"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const is_auth_1 = require("../../middleware/is-auth");
const roles_middleware_1 = require("../../middleware/roles-middleware");
const student_class_controller_1 = require("../../controllers/education/student-class-controller");
const router = express_1.default.Router();
router.post("/class/new/", is_auth_1.isAuthenticated, roles_middleware_1.isEducationManager, student_class_controller_1.newClassPOST);
router.get("/classes/", is_auth_1.isAuthenticated, roles_middleware_1.isEducationManager, student_class_controller_1.getAllClassGET);
router.patch("/class/update/:idClass/", is_auth_1.isAuthenticated, roles_middleware_1.isEducationManager, student_class_controller_1.patchClassPOST);
router.get("/class/:id/", is_auth_1.isAuthenticated, roles_middleware_1.isEducationManager, student_class_controller_1.getOneClassGET);
router.delete("/class/:idClass/", is_auth_1.isAuthenticated, roles_middleware_1.isEducationManager, student_class_controller_1.deleteClassDELETE);
module.exports = router;
//# sourceMappingURL=student-class-route.js.map