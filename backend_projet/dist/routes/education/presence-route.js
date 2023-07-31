"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const presence_controller_1 = require("../../controllers/education/presence-controller");
const is_auth_1 = require("../../middleware/is-auth");
const roles_middleware_1 = require("../../middleware/roles-middleware");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/course/presences/student/:idStudent/', is_auth_1.isAuthenticated, roles_middleware_1.isConcernedByStudentCourse, presence_controller_1.getPresencesByStudentGET);
router.get('/course/presences/course/:idCourse/', is_auth_1.isAuthenticated, roles_middleware_1.isCourseManager, presence_controller_1.getPresencesByCourseGET);
router.put('/course/presences/', is_auth_1.isAuthenticated, roles_middleware_1.isCourseManager, presence_controller_1.updatePresencesPUT);
router.delete('/course/presences/:idPresence/', is_auth_1.isAuthenticated, roles_middleware_1.isCourseManager, presence_controller_1.deletePresenceDELETE);
router.patch('/course/presence/:idPresence/', is_auth_1.isAuthenticated, roles_middleware_1.isCourseManager, presence_controller_1.updatePresencesPatch);
module.exports = router;
//# sourceMappingURL=presence-route.js.map