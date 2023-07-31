"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const is_auth_1 = require("../../middleware/is-auth");
const roles_middleware_1 = require("../../middleware/roles-middleware");
const course_controller_1 = require("../../controllers/education/course-controller");
const router = express_1.default.Router();
router.post('/courses/new/', is_auth_1.isAuthenticated, roles_middleware_1.isEducationManager, course_controller_1.newCoursePOST);
router.get('/courses/page/start-date/:startDate/number-of-days/:numberOfDays/', is_auth_1.isAuthenticated, roles_middleware_1.isEducationManager, course_controller_1.coursesAllPagesGET);
router.get('/courses/page/user/:idUser/start-date/:startDate/number-of-days/:numberOfDays/', is_auth_1.isAuthenticated, roles_middleware_1.isConcernedByStudentCourse, course_controller_1.coursesPagesGET);
router.get('/course/:idCourse/', is_auth_1.isAuthenticated, roles_middleware_1.isConcernedByStudentCourse, course_controller_1.courseByIdGET);
router.get('/courses/course/:idCourse/page/students/', is_auth_1.isAuthenticated, roles_middleware_1.isConcernedByStudentCourse, course_controller_1.coursesStudentGET);
router.delete('/courses/course/:idCourse/', is_auth_1.isAuthenticated, roles_middleware_1.isEducationManager, course_controller_1.deleteCourseDELETE);
router.patch('/courses/course/:idCourse/', is_auth_1.isAuthenticated, roles_middleware_1.isCourseManager, course_controller_1.patchCoursePATCH);
module.exports = router;
//# sourceMappingURL=course-route.js.map