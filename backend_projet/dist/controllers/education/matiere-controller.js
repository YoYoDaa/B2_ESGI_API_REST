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
exports.deleteMatiereDELETE = exports.getMatierePaginatedGET = exports.getMatiereByIdGET = exports.patchMatierePATCH = exports.newMatierePOST = void 0;
const integer_model_1 = __importDefault(require("../../models/integer-model"));
const config = __importStar(require("../../config.json"));
const mssql_1 = __importDefault(require("mssql"));
const matiere_model_1 = require("../../models/education/matiere-model");
const user_model_1 = require("../../models/users/user-model");
const school_model_1 = require("../../models/infrastructure/school-model");
const newMatierePOST = (request, response) => {
    try {
        const body = request.body;
        const sqlQueryBody = {
            libelleMatiere: body.libelleMatiere,
            idEcole: body.idEcole,
            idIntervenant: body.idIntervenant,
        };
        mssql_1.default
            .connect(config)
            .then((pool) => {
            const query = `
            INSERT INTO ${matiere_model_1.MatiereEnum.NOM_TABLE}
            (${matiere_model_1.MatiereEnum.LIBELLE}, ${matiere_model_1.MatiereEnum.FK_ECOLE}, ${matiere_model_1.MatiereEnum.FK_INTERVENANT})
            VALUES
            ('${sqlQueryBody.libelleMatiere}', ${sqlQueryBody.idEcole}, ${sqlQueryBody.idIntervenant})
            `;
            return pool.request().query(query);
        })
            .then(() => {
            response.status(201).send("Matiere successfully created !");
        });
    }
    catch (error) {
        response.status(400).send("Bad Request");
    }
};
exports.newMatierePOST = newMatierePOST;
const getMatiereByIdGET = (request, response) => {
    try {
        const idMatiere = Number(request.params.idMatiere);
        if (!(0, integer_model_1.default)([idMatiere])) {
            throw new Error("Bad Request");
        }
        mssql_1.default
            .connect(config)
            .then((pool) => {
            const query = `
            SELECT *
            FROM ${matiere_model_1.MatiereEnum.NOM_TABLE}
            WHERE ${matiere_model_1.MatiereEnum.PK} = ${idMatiere}
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
    }
    catch (error) {
        return response.status(400).send("Bad Request");
    }
};
exports.getMatiereByIdGET = getMatiereByIdGET;
const getMatierePaginatedGET = (request, response) => {
    try {
        const params = request.params;
        const page = Number(params.pageNumber);
        const rowsNumber = Number(params.rowsNumber);
        const orderBy = params.orderBy;
        if (!(0, integer_model_1.default)([page, rowsNumber])) {
            throw new Error("Bad Request");
        }
        mssql_1.default
            .connect(config)
            .then((pool) => {
            const query = `

        DECLARE @PageNumber AS INT
        DECLARE @PageSize AS INT
        SET @PageNumber=${page}
        SET @PageSize=${rowsNumber}

        SELECT
        M.${matiere_model_1.MatiereEnum.PK},
        M.${matiere_model_1.MatiereEnum.LIBELLE},
        M.${matiere_model_1.MatiereEnum.FK_ECOLE},
        M.${matiere_model_1.MatiereEnum.FK_INTERVENANT},
        E.${school_model_1.SchoolEnum.LIBELLE},
        U.${user_model_1.UtilisateurEnum.NOM},
        U.${user_model_1.UtilisateurEnum.PRENOM}
        FROM ${matiere_model_1.MatiereEnum.NOM_TABLE} M
        LEFT JOIN ${school_model_1.SchoolEnum.NOM_TABLE} E ON M.${matiere_model_1.MatiereEnum.FK_ECOLE} = E.${school_model_1.SchoolEnum.PK}
        LEFT JOIN ${user_model_1.UtilisateurEnum.NOM_TABLE} U ON M.${matiere_model_1.MatiereEnum.FK_INTERVENANT} = U.${user_model_1.UtilisateurEnum.PK}
        ORDER BY M.${matiere_model_1.matiereColumns[orderBy]} ASC
        OFFSET (@PageNumber - 1) * @PageSize ROWS
        FETCH NEXT @PageSize ROWS ONLY;
        ;`;
            return pool
                .request()
                .query(query)
                .catch((error) => {
                throw new Error(error);
            });
        })
            .then((result) => {
            return response.status(200).json(result.recordset);
        })
            .catch((error) => {
            console.log(error.message);
            return response.status(400).send("Bad Request");
        });
    }
    catch (error) {
        return response.status(400).send("Bad Request");
    }
};
exports.getMatierePaginatedGET = getMatierePaginatedGET;
const patchMatierePATCH = (request, response) => {
    try {
        const body = request.body;
        const idMatiere = Number(request.params.idMatiere);
        if (!(0, integer_model_1.default)([idMatiere])) {
            throw new Error("Bad Request");
        }
        const sqlQueryBody = {
            libelleMatiere: body.libelleMatiere,
            idEcole: body.idEcole,
            idIntervenant: body.idIntervenant,
        };
        mssql_1.default
            .connect(config)
            .then((pool) => {
            const query = `
            UPDATE ${matiere_model_1.MatiereEnum.NOM_TABLE}
            SET ${matiere_model_1.MatiereEnum.LIBELLE} = '${sqlQueryBody.libelleMatiere}',
            ${matiere_model_1.MatiereEnum.FK_ECOLE} = ${sqlQueryBody.idEcole},
            ${matiere_model_1.MatiereEnum.FK_INTERVENANT} = ${sqlQueryBody.idIntervenant}
            WHERE ${matiere_model_1.MatiereEnum.PK} = ${idMatiere}
            `;
            return pool
                .request()
                .query(query)
                .catch((error) => {
                throw new Error("Bad Request");
            });
        })
            .then(() => {
            response.status(200).send("Matiere successfully updated !");
        })
            .catch((error) => {
            return response.status(400).send("Bad Request");
        });
    }
    catch (error) {
        return response.status(400).send("Bad Request");
    }
};
exports.patchMatierePATCH = patchMatierePATCH;
const deleteMatiereDELETE = (request, response) => {
    try {
        const idMatiere = Number(request.params.idMatiere);
        if (!(0, integer_model_1.default)([idMatiere])) {
            throw new Error("Bad Request");
        }
        mssql_1.default
            .connect(config)
            .then((pool) => {
            const query = `
        DELETE FROM ${matiere_model_1.MatiereEnum.NOM_TABLE}
        WHERE ${matiere_model_1.MatiereEnum.PK} = ${idMatiere}
        `;
            return pool
                .request()
                .query(query)
                .catch((error) => {
                throw new Error("Bad Request");
            });
        })
            .then(() => {
            response.status(200).send("Matiere successfully deleted !");
        })
            .catch((error) => {
            return response.status(405).send("Unacceptable operation.");
        });
    }
    catch (error) {
        return response.status(400).send("Bad Request");
    }
};
exports.deleteMatiereDELETE = deleteMatiereDELETE;
//# sourceMappingURL=matiere-controller.js.map