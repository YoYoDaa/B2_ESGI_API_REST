"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const is_auth_1 = require("../../middleware/is-auth");
const roles_middleware_1 = require("../../middleware/roles-middleware");
const room_controller_1 = require("../../controllers/infrastructure/room-controller");
const router = express_1.default.Router();
router.post("/room/new/", is_auth_1.isAuthenticated, roles_middleware_1.isEducationManager, room_controller_1.newRoomPOST);
router.get("/rooms/", is_auth_1.isAuthenticated, roles_middleware_1.isEducationManager, room_controller_1.getRoomsGET);
router.patch("/room/:idRoom/", is_auth_1.isAuthenticated, roles_middleware_1.isEducationManager, room_controller_1.patchRoomPATCH);
router.get("/rooms/campus/:idCampus/", is_auth_1.isAuthenticated, roles_middleware_1.isEducationManager, room_controller_1.getRoomsByCampusGET);
router.delete("/room/:idRoom/", is_auth_1.isAuthenticated, roles_middleware_1.isEducationManager, room_controller_1.deleteRoomDELETE);
module.exports = router;
//# sourceMappingURL=room-route.js.map