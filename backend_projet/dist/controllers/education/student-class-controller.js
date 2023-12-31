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
exports.getOneClassByCampusGET = exports.getOneClassByPromoGET = exports.getOneClassGET = exports.getAllClassGET = exports.deleteClassDELETE = exports.patchClassPOST = exports.newClassPOST = void 0;
const config = __importStar(require("../../config.json"));
const mssql_1 = __importDefault(require("mssql"));
const student_class_model_1 = require("../../models/education/student-class-model");
const newClassPOST = (req, res) => {
    try {
        const body = req.body;
        const sqlQueryBody = {
            libelleClasse: body.libelleClasse,
            idPromotion: body.idPromotion,
            idCampus: body.idCampus,
        };
        mssql_1.default
            .connect(config)
            .then((pool) => {
            const query = `
            INSERT INTO ${student_class_model_1.StudClassEnum.NOM_TABLE}
            (${student_class_model_1.StudClassEnum.LIBELLE}, ${student_class_model_1.StudClassEnum.FK_CAMPUS}, ${student_class_model_1.StudClassEnum.FK_PROMOTION})
            VALUES
            ('${sqlQueryBody.libelleClasse}', '${sqlQueryBody.idCampus}', '${sqlQueryBody.idPromotion}')
            `;
            return pool.request().query(query);
        })
            .then(() => {
            res.status(201).send("Class successfully created !");
        });
    }
    catch (error) {
        res.status(400).send("Bad Request");
    }
};
exports.newClassPOST = newClassPOST;
const patchClassPOST = (req, res) => {
    try {
        const body = req.body;
        const idClass = req.params.idClass;
        const sqlQueryBody = {
            libelleClasse: body.libelleClasse,
            idPromotion: body.idPromotion,
            idCampus: body.idCampus,
        };
        mssql_1.default
            .connect(config)
            .then((pool) => {
            const query = `
            UPDATE ${student_class_model_1.StudClassEnum.NOM_TABLE}
            SET ${student_class_model_1.StudClassEnum.LIBELLE} = '${sqlQueryBody.libelleClasse}', 
            ${student_class_model_1.StudClassEnum.FK_CAMPUS} = ${sqlQueryBody.idCampus}, 
            ${student_class_model_1.StudClassEnum.FK_PROMOTION} = ${sqlQueryBody.idPromotion}
            WHERE ${student_class_model_1.StudClassEnum.PK} = ${idClass}
            `;
            pool.request().query(query)
                .then(() => {
                return res.status(201).send("Class successfully updated !");
            }).catch((err) => {
                console.log(err.message);
                return res.status(400).send("Bad Request");
            });
        }).catch((err) => {
            console.log(err.message);
            return res.status(400).send("Bad Request");
        });
    }
    catch (error) {
        res.status(400).send("Bad Request");
    }
};
exports.patchClassPOST = patchClassPOST;
const deleteClassDELETE = (req, res) => {
    try {
        const body = req.body;
        const idClass = req.params.idClass;
        mssql_1.default
            .connect(config)
            .then((pool) => {
            const query = `
            DELETE FROM ${student_class_model_1.StudClassEnum.NOM_TABLE}
            WHERE ${student_class_model_1.StudClassEnum.PK} = '${idClass}'
            `;
            return pool.request().query(query);
        })
            .then(() => {
            res.status(201).send("Class successfully deleted !");
        });
    }
    catch (error) {
        res.status(400).send("Bad Request");
    }
};
exports.deleteClassDELETE = deleteClassDELETE;
const getAllClassGET = (req, res) => {
    try {
        mssql_1.default
            .connect(config)
            .then((pool) => {
            const query = `
            SELECT * FROM ${student_class_model_1.StudClassEnum.NOM_TABLE}
            `;
            return pool.request().query(query);
        })
            .then((result) => {
            res.status(200).send(result.recordset);
        });
    }
    catch (error) {
        res.status(400).send("Bad Request");
    }
};
exports.getAllClassGET = getAllClassGET;
const getOneClassGET = (req, res) => {
    try {
        mssql_1.default
            .connect(config)
            .then((pool) => {
            const query = (0, student_class_model_1.queryGetOneClassGET)(req.params.id);
            return pool.request().query(query);
        })
            .then((result) => {
            res.status(200).send(result.recordset);
        });
    }
    catch (error) {
        res.status(400).send("Bad Request");
    }
};
exports.getOneClassGET = getOneClassGET;
const getOneClassByPromoGET = (req, res) => {
    try {
        mssql_1.default
            .connect(config)
            .then((pool) => {
            const query = `

            SELECT * FROM ${student_class_model_1.StudClassEnum.NOM_TABLE}
            WHERE ${student_class_model_1.StudClassEnum.FK_PROMOTION} = '${req.params.id}'
            `;
            return pool.request().query(query);
        })
            .then((result) => {
            res.status(200).send(result.recordset);
        });
    }
    catch (error) {
        res.status(400).send("Bad Request");
    }
};
exports.getOneClassByPromoGET = getOneClassByPromoGET;
const getOneClassByCampusGET = (req, res) => {
    try {
        mssql_1.default
            .connect(config)
            .then((pool) => {
            const query = `
            SELECT * FROM ${student_class_model_1.StudClassEnum.NOM_TABLE}
            WHERE ${student_class_model_1.StudClassEnum.FK_CAMPUS} = '${req.params.idCampus}'
            `;
            return pool.request().query(query);
        })
            .then((result) => {
            res.status(200).send(result.recordset);
        });
    }
    catch (error) {
        res.status(400).send("Bad Request");
    }
};
exports.getOneClassByCampusGET = getOneClassByCampusGET;
//# sourceMappingURL=student-class-controller.js.map