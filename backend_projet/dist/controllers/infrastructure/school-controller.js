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
exports.deleteSchoolDELETE = exports.patchSchoolPATCH = exports.getSchoolByIdGET = exports.getSchoolGET = exports.newSchoolPOST = void 0;
const school_model_1 = require("../../models/infrastructure/school-model");
const config = __importStar(require("../../config.json"));
const mssql_1 = __importDefault(require("mssql"));
const integer_model_1 = __importDefault(require("../../models/integer-model"));
const newSchoolPOST = (request, response, next) => {
    try {
        const body = request.body;
        const sqlQueryData = {
            libelleEcole: body.libelleEcole,
            domaineEcole: body.domaineEcole,
        };
        mssql_1.default
            .connect(config)
            .then((pool) => {
            const query = `
        INSERT INTO ${school_model_1.SchoolEnum.NOM_TABLE} (${school_model_1.SchoolEnum.LIBELLE}, ${school_model_1.SchoolEnum.DOMAINE})
        VALUES 
        ('${sqlQueryData.libelleEcole}', '${sqlQueryData.domaineEcole}')
        `;
            return pool.request().query(query);
        })
            .catch((error) => {
            return response.status(400).send("Bad Request");
        })
            .then(() => {
            return response.status(201).send("School Successfully created");
        })
            .catch((error) => {
            return response.status(400).send("Bad Request");
        });
    }
    catch (error) {
        return response.status(400).send("Bad Request");
    }
};
exports.newSchoolPOST = newSchoolPOST;
const getSchoolGET = (request, response, next) => {
    mssql_1.default
        .connect(config)
        .then((pool) => {
        const query = `

            SELECT * FROM ${school_model_1.SchoolEnum.NOM_TABLE}
            `;
        return pool.request().query(query);
    })
        .then((result) => {
        if (result) {
            return response.status(200).send(result.recordset);
        }
        else {
            return response.status(405).send("Unacceptable operation.");
        }
    })
        .catch((error) => {
        return response.status(405).send("Unacceptable operation.");
    });
};
exports.getSchoolGET = getSchoolGET;
const getSchoolByIdGET = (request, response, next) => {
    const idSchool = Number(request.params.idSchool);
    if (!(0, integer_model_1.default)([idSchool])) {
        throw new Error("Bad Request");
    }
    mssql_1.default
        .connect(config)
        .then((pool) => {
        const query = `
            SELECT * FROM ${school_model_1.SchoolEnum.NOM_TABLE}
            WHERE ${school_model_1.SchoolEnum.PK} = ${idSchool}
            `;
        return pool
            .request()
            .query(query)
            .catch((error) => {
            throw new Error("Bad Request");
        })
            .then((result) => {
            return response.status(200).json(result.recordset);
        })
            .catch((error) => {
            return response.status(400).send("Bad Request");
        });
    })
        .catch((error) => {
        return response.status(400).send("Bad Request");
    });
};
exports.getSchoolByIdGET = getSchoolByIdGET;
const patchSchoolPATCH = (request, response, next) => {
    const body = request.body;
    const params = request.params;
    const sqlQueryData = {
        libelleEcole: body.libelleEcole,
        domaineEcole: body.domaineEcole,
    };
    const idSchool = Number(params.idSchool);
    if (!(0, integer_model_1.default)([idSchool])) {
        throw new Error("Bad Request");
    }
    mssql_1.default
        .connect(config)
        .then((pool) => {
        const query = `
            UPDATE ${school_model_1.SchoolEnum.NOM_TABLE}
            SET ${school_model_1.SchoolEnum.LIBELLE} = '${sqlQueryData.libelleEcole}', ${school_model_1.SchoolEnum.DOMAINE} = '${sqlQueryData.domaineEcole}'
            WHERE ${school_model_1.SchoolEnum.PK} = ${idSchool}
            `;
        return pool.request().query(query);
    })
        .then(() => {
        return response.status(200).send("School successfully updated !");
    })
        .catch((error) => {
        return response.status(400).send("Bad Request");
    });
};
exports.patchSchoolPATCH = patchSchoolPATCH;
const deleteSchoolDELETE = (request, response, next) => {
    try {
        const params = request.params;
        const idSchool = Number(params.idSchool);
        if (!(0, integer_model_1.default)([idSchool])) {
            throw new Error("Bad Request");
        }
        mssql_1.default
            .connect(config)
            .then((pool) => {
            const query = `
            DELETE FROM ${school_model_1.SchoolEnum.NOM_TABLE}
            WHERE ${school_model_1.SchoolEnum.PK} = ${idSchool}
            `;
            return pool
                .request()
                .query(query)
                .then(() => {
                return response.status(200).send("School successfully deleted !");
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
        return response.status(400).send("Bad Request");
    }
};
exports.deleteSchoolDELETE = deleteSchoolDELETE;
//# sourceMappingURL=school-controller.js.map