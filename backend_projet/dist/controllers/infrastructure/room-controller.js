"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoomDELETE = exports.patchRoomPATCH = exports.getRoomsByCampusGET = exports.getRoomsGET = exports.newRoomPOST = void 0;
const campus_model_1 = require("../../models/infrastructure/campus-model");
const config = __importStar(require("../../config.json"));
const mssql_1 = __importDefault(require("mssql"));
const room_model_1 = require("../../models/infrastructure/room-model");
const integer_model_1 = __importDefault(require("../../models/integer-model"));
const newRoomPOST = (request, response, next) => {
    try {
        const body = request.body;
        const sqlQueryData = {
            libelleRoom: body.libelleRoom,
            floor: body.floor,
            roomCapacity: body.roomCapacity,
            idCampus: body.idCampus,
        };
        mssql_1.default
            .connect(config)
            .then((pool) => {
            const query = `
            INSERT INTO ${room_model_1.RoomEnum.NOM_TABLE} (${room_model_1.RoomEnum.LIBELLE},${room_model_1.RoomEnum.FLOOR}, ${room_model_1.RoomEnum.CAPACITE}, ${room_model_1.RoomEnum.FK_CAMPUS})
            VALUES 
            ('${sqlQueryData.libelleRoom}', ${sqlQueryData.floor}, ${sqlQueryData.roomCapacity},${sqlQueryData.idCampus})
            `;
            return pool.request().query(query);
        })
            .then(() => {
            response.status(201).send("Room Successfully created");
        });
    }
    catch (error) {
        response.status(400).send("Bad request");
    }
};
exports.newRoomPOST = newRoomPOST;
const getRoomsGET = (request, response, next) => {
    try {
        mssql_1.default
            .connect(config)
            .then((pool) => {
            const query = `
            SELECT * FROM ${room_model_1.RoomEnum.NOM_TABLE}
            WHERE ${room_model_1.RoomEnum.PK} != 10
            `;
            return pool.request().query(query);
        })
            .catch((error) => {
            response.status(405).send("Unacceptable operation.");
        })
            .then((result) => {
            if (result) {
                response.status(200).send(result.recordset);
            }
            else {
                throw new Error("Unacceptable operation.");
            }
        })
            .catch((error) => {
            console.log(error.message);
            response.status(405).send("Unacceptable operation.");
        });
    }
    catch (error) {
        return response.status(400).send("Bad request");
    }
};
exports.getRoomsGET = getRoomsGET;
const getRoomsByCampusGET = (request, response, next) => {
    try {
        const params = request.params;
        const idCampus = Number(params.idCampus);
        console.log(params);
        mssql_1.default.connect(config).then((pool) => {
            const query = `
            SELECT
            ${room_model_1.RoomEnum.NOM_TABLE}.${room_model_1.RoomEnum.PK} AS id_salle,
            ${room_model_1.RoomEnum.NOM_TABLE}.${room_model_1.RoomEnum.LIBELLE} AS libelle_classe,
            ${room_model_1.RoomEnum.NOM_TABLE}.${room_model_1.RoomEnum.FLOOR} AS etage,
            ${room_model_1.RoomEnum.NOM_TABLE}.${room_model_1.RoomEnum.CAPACITE} AS capacite_salle,
            ${campus_model_1.CampusEnum.NOM_TABLE}.${campus_model_1.CampusEnum.PK} AS id_campus,
            ${campus_model_1.CampusEnum.NOM_TABLE}.${campus_model_1.CampusEnum.LIBELLE} AS libelle_campus,
            ${campus_model_1.CampusEnum.NOM_TABLE}.${campus_model_1.CampusEnum.ADRESSE} AS adresse_campus,
            ${campus_model_1.CampusEnum.NOM_TABLE}.${campus_model_1.CampusEnum.CODEPOSTAL} AS codepostal_campus

            FROM ${room_model_1.RoomEnum.NOM_TABLE} 
            LEFT JOIN ${campus_model_1.CampusEnum.NOM_TABLE} ON ${room_model_1.RoomEnum.NOM_TABLE}.${room_model_1.RoomEnum.FK_CAMPUS} = ${campus_model_1.CampusEnum.NOM_TABLE}.${campus_model_1.CampusEnum.PK}
            WHERE ${room_model_1.RoomEnum.NOM_TABLE}.${room_model_1.RoomEnum.FK_CAMPUS} = ${idCampus} AND ${room_model_1.RoomEnum.NOM_TABLE}.${room_model_1.RoomEnum.PK} != 10
            `;
            pool
                .request()
                .query(query)
                .then((result) => {
                if (result) {
                    return response.status(200).send(result.recordset);
                }
                else {
                    throw new Error("Bad request");
                }
            })
                .catch((error) => {
                console.log(error.message);
                return response.status(400).send("Bad request");
            });
        });
    }
    catch (error) {
        return response.status(400).send("Bad request");
    }
};
exports.getRoomsByCampusGET = getRoomsByCampusGET;
const patchRoomPATCH = (request, response, next) => {
    try {
        const body = request.body;
        const params = request.params;
        const idRoom = Number(params.idRoom);
        if (!(0, integer_model_1.default)([idRoom])) {
            throw new Error("Bad Request");
        }
        const sqlQueryData = {
            libelleRoom: body.libelleRoom,
            floor: body.floor,
            roomCapacity: body.roomCapacity,
            idCampus: body.idCampus,
        };
        mssql_1.default
            .connect(config)
            .then((pool) => {
            const query = `
            UPDATE ${room_model_1.RoomEnum.NOM_TABLE}
            SET ${room_model_1.RoomEnum.LIBELLE} = '${sqlQueryData.libelleRoom}', ${room_model_1.RoomEnum.FLOOR} = ${sqlQueryData.floor}, ${room_model_1.RoomEnum.CAPACITE} = ${sqlQueryData.roomCapacity}, ${room_model_1.RoomEnum.FK_CAMPUS} = ${sqlQueryData.idCampus}
            WHERE ${room_model_1.RoomEnum.PK} = ${idRoom}
            `;
            return pool
                .request()
                .query(query)
                .then(() => {
                return response.status(200).send("Room Successfully updated");
            });
        })
            .catch((error) => {
            console.log(error.message);
            return response.status(400).send("Bad request");
        });
    }
    catch (error) {
        return response.status(400).send("Bad request");
    }
};
exports.patchRoomPATCH = patchRoomPATCH;
const deleteRoomDELETE = (request, response, next) => {
    try {
        const params = request.params;
        const idRoom = Number(params.idRoom);
        if (!(0, integer_model_1.default)([idRoom])) {
            throw new Error("Bad Request");
        }
        mssql_1.default
            .connect(config)
            .then((pool) => {
            const query = `
            DELETE FROM ${room_model_1.RoomEnum.NOM_TABLE}
            WHERE ${room_model_1.RoomEnum.PK} = ${idRoom}
            `;
            return pool
                .request()
                .query(query)
                .then(() => {
                return response.status(200).send("Room Successfully deleted");
            })
                .catch((error) => {
                console.log(error.message);
                return response.status(405).send("Unacceptable operation.");
            });
        })
            .catch((error) => {
            console.log(error.message);
            return response.status(405).send("Unacceptable operation.");
        });
    }
    catch (error) {
        return response.status(400).send("Bad request");
    }
};
exports.deleteRoomDELETE = deleteRoomDELETE;
//# sourceMappingURL=room-controller.js.map