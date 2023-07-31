"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const is_auth_1 = require("../../middleware/is-auth");
const matiere_controller_1 = require("../../controllers/education/matiere-controller");
const roles_middleware_1 = require("../../middleware/roles-middleware");
const router = express_1.default.Router();
router.post('/matiere/new/', is_auth_1.isAuthenticated, roles_middleware_1.isEducationManager, matiere_controller_1.newMatierePOST);
router.patch('/matiere/:idMatiere/', is_auth_1.isAuthenticated, roles_middleware_1.isEducationManager, matiere_controller_1.patchMatierePATCH);
router.get('/matiere/:idMatiere/', is_auth_1.isAuthenticated, roles_middleware_1.isEducationManager, matiere_controller_1.getMatiereByIdGET);
router.get('/matieres/page/:pageNumber/rows/:rowsNumber/order/:orderBy/', is_auth_1.isAuthenticated, roles_middleware_1.isEducationManager, matiere_controller_1.getMatierePaginatedGET);
router.delete('/matiere/:idMatiere/', is_auth_1.isAuthenticated, roles_middleware_1.isEducationManager, matiere_controller_1.deleteMatiereDELETE);
module.exports = router;
//# sourceMappingURL=matiere-route.js.map