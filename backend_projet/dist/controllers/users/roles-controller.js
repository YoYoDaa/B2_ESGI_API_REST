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
exports.getAllUsersGET = exports.adminGETList = exports.patchUserPATCH = exports.deleteUserDELETE = exports.paginatedRoleGET = exports.responsablePedagogiqueGETList = exports.intervenantGETList = exports.attachePromoGETList = exports.etudiantGETList = exports.reprographeGETList = exports.newRolePOST = void 0;
const config = __importStar(require("../../config.json"));
const mssql_1 = __importDefault(require("mssql"));
const roles_model_1 = require("../../models/users/roles-model");
const user_model_1 = require("../../models/users/user-model");
const roles_model_2 = require("../../models/users/roles-model");
const integer_model_1 = __importDefault(require("../../models/integer-model"));
const newRolePOST = (request, response) => {
    const body = request.body;
    const sqlBody = {
        libelleRole: body.libelleRole,
        droits: body.droits,
    };
    try {
        mssql_1.default
            .connect(config)
            .then((pool) => {
            const queryGET = `INSERT INTO ${roles_model_1.RolesEnum.NOM_TABLE} (${roles_model_1.RolesEnum.LIBELLE}, ${roles_model_1.RolesEnum.DROITS}) VALUES ('${sqlBody.libelleRole}', '${sqlBody.droits}')`;
            return pool.request().query(queryGET);
        })
            .then((result) => {
            if (result) {
                response.status(201).send("New role was successfully created !");
            }
            else {
                throw new Error("Unacceptable operation.");
            }
        });
    }
    catch (error) {
        response.status(405).send(error);
    }
};
exports.newRolePOST = newRolePOST;
const paginatedRoleGET = (req, res) => {
    mssql_1.default.connect(config).then((pool) => {
        const queryGET = (0, roles_model_2.queryRoleGET)();
        pool
            .request()
            .query(queryGET)
            .then((result) => {
            if (result) {
                res.status(200).send(result.recordset);
            }
            else {
                res.status(405).send("Unacceptable operation.");
            }
        })
            .catch((error) => {
            res.status(405).send("Unacceptable operation.");
        });
    });
};
exports.paginatedRoleGET = paginatedRoleGET;
const reprographeGETList = (request, response) => {
    try {
        const params = request.params;
        const page = params.pageNumber;
        const rowsNumber = params.rowsNumber;
        const orderBy = params.orderBy;
        mssql_1.default.connect(config).then((pool) => {
            const queryGET = (0, user_model_1.queryPaginatedReprographeGET)(page, rowsNumber, orderBy);
            pool
                .request()
                .query(queryGET)
                .then((result) => {
                if (result) {
                    response.status(200).send(result.recordset);
                }
                else {
                    response.status(405).send("Unacceptable operation.");
                }
            });
        });
    }
    catch (error) {
        response.status(405).send("Unacceptable operation.");
    }
};
exports.reprographeGETList = reprographeGETList;
const etudiantGETList = (request, response) => {
    try {
        const params = request.params;
        const page = params.pageNumber;
        const rowsNumber = params.rowsNumber;
        const orderBy = params.orderBy;
        mssql_1.default.connect(config).then((pool) => {
            const queryGET = (0, user_model_1.queryPaginatedEtudiantGET)(page, rowsNumber, orderBy);
            pool
                .request()
                .query(queryGET)
                .then((result) => {
                if (result) {
                    response.status(200).send(result.recordset);
                }
                else {
                    response.status(405).send("Unacceptable operation.");
                }
            });
        });
    }
    catch (error) {
        response.status(405).send("Unacceptable operation.");
    }
};
exports.etudiantGETList = etudiantGETList;
const attachePromoGETList = (request, response) => {
    try {
        const params = request.params;
        const page = params.pageNumber;
        const rowsNumber = params.rowsNumber;
        const orderBy = params.orderBy;
        mssql_1.default.connect(config).then((pool) => {
            const queryGET = (0, user_model_1.queryPaginatedAttachePromoGET)(page, rowsNumber, orderBy);
            pool
                .request()
                .query(queryGET)
                .then((result) => {
                if (result) {
                    response.status(200).send(result.recordset);
                }
                else {
                    response.status(405).send("Unacceptable operation.");
                }
            });
        });
    }
    catch (error) {
        response.status(405).send("Unacceptable operation.");
    }
};
exports.attachePromoGETList = attachePromoGETList;
const intervenantGETList = (request, response) => {
    try {
        const params = request.params;
        const page = params.pageNumber;
        const rowsNumber = params.rowsNumber;
        const orderBy = params.orderBy;
        mssql_1.default.connect(config).then((pool) => {
            const queryGET = (0, user_model_1.queryPaginatedIntervenantPromoGET)(page, rowsNumber, orderBy);
            pool
                .request()
                .query(queryGET)
                .then((result) => {
                if (result) {
                    response.status(200).send(result.recordset);
                }
                else {
                    response.status(405).send("Unacceptable operation.");
                }
            });
        });
    }
    catch (error) {
        response.status(405).send("Unacceptable operation.");
    }
};
exports.intervenantGETList = intervenantGETList;
const responsablePedagogiqueGETList = (request, response) => {
    try {
        const params = request.params;
        const page = params.pageNumber;
        const rowsNumber = params.rowsNumber;
        const orderBy = params.orderBy;
        mssql_1.default.connect(config).then((pool) => {
            const queryGET = (0, user_model_1.queryPaginatedResponsablePedagogiqueGET)(page, rowsNumber, orderBy);
            pool
                .request()
                .query(queryGET)
                .then((result) => {
                if (result) {
                    response.status(200).send(result.recordset);
                }
                else {
                    response.status(405).send("Unacceptable operation.");
                }
            });
        });
    }
    catch (error) {
        response.status(405).send("Unacceptable operation.");
    }
};
exports.responsablePedagogiqueGETList = responsablePedagogiqueGETList;
const adminGETList = (request, response) => {
    try {
        const params = request.params;
        const page = params.pageNumber;
        const rowsNumber = params.rowsNumber;
        const orderBy = params.orderBy;
        mssql_1.default.connect(config).then((pool) => {
            const queryGET = (0, user_model_1.queryPaginatedAdminGET)(page, rowsNumber, orderBy);
            pool
                .request()
                .query(queryGET)
                .then((result) => {
                if (result) {
                    response.status(200).send(result.recordset);
                }
                else {
                    response.status(405).send("Unacceptable operation.");
                }
            });
        });
    }
    catch (error) {
        response.status(405).send("Unacceptable operation.");
    }
};
exports.adminGETList = adminGETList;
const deleteUserDELETE = (request, response) => {
    try {
        const params = request.params;
        const idUser = Number(params.idUser);
        const fonctionUser = params.functionUser;
        console.log(idUser, fonctionUser);
        if (!(0, integer_model_1.default)([idUser])) {
            throw new Error("Bad Request");
        }
        console.log((0, user_model_1.queryDeleteFonctionUserDELETE)(idUser), "\n\n\n");
        mssql_1.default.connect(config).then((pool) => {
            pool
                .request()
                .query((0, user_model_1.queryDeleteFonctionUserDELETE)(idUser))
                .then(() => {
                const query = (0, user_model_1.queryDeleteUserDELETE)(idUser, fonctionUser);
                return pool.request().query(query);
            })
                .then(() => {
                return response.status(201).send("User successfully deleted !");
            })
                .catch((error) => {
                console.log(error.message);
                return response.status(405).send("Can't delete user");
            });
        });
    }
    catch (error) {
        return response.status(400).send("Bad Request");
    }
};
exports.deleteUserDELETE = deleteUserDELETE;
const patchUserPATCH = (request, response) => {
    try {
        const params = request.params;
        const body = request.body;
        const idUser = Number(params.idUser);
        const fonctionParameters = body.fonctionParameters;
        const ancienneFonction = body.ancienneFonction;
        const bodyQuery = {
            nomUtilisateur: body.nom,
            prenomUtilisateur: body.prenom,
            emailUtilisateur: body.email,
            mdp: "",
            idRole: body.idRole,
            fonction: body.fonction,
        };
        if (!(0, integer_model_1.default)([idUser, bodyQuery.idRole])) {
            throw new Error("Bad Request");
        }
        console.log(bodyQuery);
        if (ancienneFonction !== bodyQuery.fonction) {
            mssql_1.default.connect(config).then((pool) => {
                const queryDELETE = (0, user_model_1.queryDeleteFonctionUserDELETE)(idUser);
                pool
                    .request()
                    .query(queryDELETE)
                    .then(() => {
                    const queryPATCH = (0, user_model_1.queryPatchUserPATCH)(idUser, bodyQuery);
                    pool
                        .request()
                        .query(queryPATCH)
                        .catch((error) => {
                        console.log(error.message);
                        return response.status(405).send("Error while updating user");
                    })
                        .then(() => {
                        const queryNewFunction = (0, user_model_1.newFunctionQuery)(bodyQuery.fonction, idUser, fonctionParameters);
                        if (queryNewFunction !== null) {
                            pool
                                .request()
                                .query(queryNewFunction)
                                .then(() => {
                                return response
                                    .status(201)
                                    .send("User successfully updated !");
                            })
                                .catch((error) => {
                                console.log(error.message);
                                return response
                                    .status(405)
                                    .send("Error while updating user");
                            });
                        }
                    });
                })
                    .catch((error) => {
                    console.log(error.message);
                    return response.status(405).send("Can't delete user");
                });
            });
        }
        else {
            const queryPATCH = (0, user_model_1.queryPatchUserPATCH)(idUser, bodyQuery);
            mssql_1.default.connect(config).then((pool) => {
                pool
                    .request()
                    .query(queryPATCH)
                    .then(() => {
                    return response.status(201).send("User successfully updated !");
                })
                    .catch((error) => {
                    console.log(error.message);
                    return response.status(405).send("Error while updating user");
                });
            });
        }
    }
    catch (error) {
        return response.status(400).send("Bad Request");
    }
};
exports.patchUserPATCH = patchUserPATCH;
const getAllUsersGET = (request, response) => {
    try {
        mssql_1.default
            .connect(config)
            .then((pool) => {
            const queryGET = `SELECT 
      ${user_model_1.UtilisateurEnum.PK} AS idUser,
      ${user_model_1.UtilisateurEnum.NOM} AS nomUser,
      ${user_model_1.UtilisateurEnum.PRENOM} AS prenomUser,
      ${user_model_1.UtilisateurEnum.EMAIL} AS emailUser
      FROM ${user_model_1.UtilisateurEnum.NOM_TABLE}`;
            pool
                .request()
                .query(queryGET)
                .then((result) => {
                if (result) {
                    return response.status(200).send(result.recordset);
                }
                else {
                    return response.status(405).send("Unacceptable operation.");
                }
            })
                .catch((error) => {
                console.log(error.message);
                return response.status(405).send("Error while getting users");
            });
        })
            .catch((error) => {
            console.log(error.message);
            return response.status(405).send("Error while getting users");
        });
    }
    catch (error) {
        response.status(405).send("Unacceptable operation.");
    }
};
exports.getAllUsersGET = getAllUsersGET;
//# sourceMappingURL=roles-controller.js.map