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
exports.updatePasswordPATCH = exports.signup = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config = __importStar(require("../../config.json"));
const mssql_1 = __importDefault(require("mssql"));
const secret_password_json_1 = __importDefault(require("../../CONFIG-FILES/secret-password.json"));
const jwt = __importStar(require("jsonwebtoken"));
const user_model_1 = require("../../models/users/user-model");
const user_model_2 = require("../../models/users/user-model");
const etudiant_model_1 = require("../../models/users/etudiant-model");
const reprographe_model_1 = require("../../models/users/reprographe-model");
const intervenant_1 = require("../../models/users/intervenant");
const attache_promotion_model_1 = require("../../models/users/attache-promotion-model");
const resp_pedago_model_1 = require("../../models/users/resp-pedago-model");
const roles_model_1 = require("../../models/users/roles-model");
/**
 * @param request
 * @param response
 */
const signup = (request, response) => {
    const body = request.body;
    const userSqlQuery = {
        nomUtilisateur: body.nom,
        prenomUtilisateur: body.prenom,
        emailUtilisateur: body.email,
        mdp: body.mdp,
        idRole: body.idRole,
        fonction: body.fonction,
    };
    bcryptjs_1.default.hash(userSqlQuery.mdp, secret_password_json_1.default.passwordHashSalt).then((hash) => {
        mssql_1.default.connect(config).then((pool) => {
            const queryNewUser = `
      DECLARE @InsertedIDs TABLE (${user_model_1.UtilisateurEnum.PK} INT PRIMARY KEY);
      INSERT INTO 
      ${user_model_1.UtilisateurEnum.NOM_TABLE} 
      (${user_model_1.UtilisateurEnum.PRENOM}, 
        ${user_model_1.UtilisateurEnum.NOM}, 
        ${user_model_1.UtilisateurEnum.EMAIL}, 
        ${user_model_1.UtilisateurEnum.MDP}, 
        ${user_model_1.UtilisateurEnum.FK_ROLE_UTILISATEUR})
      OUTPUT INSERTED.${user_model_1.UtilisateurEnum.PK} INTO @InsertedIDs
      VALUES
      ('${userSqlQuery.prenomUtilisateur}', 
        '${userSqlQuery.nomUtilisateur}', 
        '${userSqlQuery.emailUtilisateur}', 
        '${hash}', 
        ${userSqlQuery.idRole});
      SELECT id_utilisateur FROM @InsertedIDs;
      `;
            pool
                .request()
                .query(queryNewUser)
                .then((result) => {
                const queryFonction = (0, user_model_1.newFunctionQuery)(body.fonction, result.recordset[0][user_model_1.UtilisateurEnum.PK], body);
                if (queryFonction !== null) {
                    return pool
                        .request()
                        .query(queryFonction)
                        .then(() => {
                        response.status(201).send("User was successfully created.");
                    });
                }
                else {
                    response.status(201).send("User was successfully created.");
                }
            });
        });
    });
};
exports.signup = signup;
const login = (request, response) => {
    try {
        const loginBody = request.body;
        const loginAlias = loginBody.login;
        const loginPswd = loginBody.password;
        mssql_1.default
            .connect(config)
            .then((pool) => {
            const query = `
    SELECT 
    ${user_model_1.UtilisateurEnum.PK},
    ${user_model_1.UtilisateurEnum.NOM}, 
    ${user_model_1.UtilisateurEnum.PRENOM}, 
    ${user_model_1.UtilisateurEnum.MDP}, 
    ${user_model_1.UtilisateurEnum.EMAIL}, 
    ${roles_model_1.RolesEnum.NOM_TABLE}.${roles_model_1.RolesEnum.DROITS}, 
    ${roles_model_1.RolesEnum.NOM_TABLE}.${roles_model_1.RolesEnum.LIBELLE} 
    FROM ${user_model_1.UtilisateurEnum.NOM_TABLE}
    RIGHT JOIN ${roles_model_1.RolesEnum.NOM_TABLE} 
    ON ${user_model_1.UtilisateurEnum.NOM_TABLE}.${user_model_1.UtilisateurEnum.FK_ROLE_UTILISATEUR} = ${roles_model_1.RolesEnum.NOM_TABLE}.${roles_model_1.RolesEnum.PK}
    WHERE ${user_model_1.UtilisateurEnum.EMAIL} = '${loginAlias}';
    `;
            pool
                .request()
                .query(query)
                .then((reqResult) => {
                if (reqResult.recordset[0] === undefined) {
                    throw new Error("User does not exists");
                }
                bcryptjs_1.default
                    .compare(loginPswd, reqResult.recordset[0][user_model_1.UtilisateurEnum.MDP])
                    .then((isPswdEqual) => {
                    if (isPswdEqual) {
                        return reqResult;
                    }
                    else {
                        throw new Error("Unauthorized");
                    }
                })
                    .catch((error1) => {
                    console.log(error1.message);
                    throw new Error("Unauthorized");
                })
                    .then((resultAfterPswdTested) => {
                    if (resultAfterPswdTested === undefined) {
                        throw new Error("User does not exists");
                    }
                    const resultFonctionType = resultAfterPswdTested.recordset[0][roles_model_1.RolesEnum.LIBELLE];
                    const resultIdUser = resultAfterPswdTested.recordset[0][user_model_1.UtilisateurEnum.PK];
                    pool
                        .request()
                        .query(getIdFunctionQuery(resultFonctionType, resultIdUser))
                        .then((userIdFunction) => {
                        var _a;
                        const payload = {
                            sub: loginAlias,
                            id: resultAfterPswdTested.recordset[0][user_model_1.UtilisateurEnum.PK],
                            idFunction: userIdFunction.recordset[0]
                                ? userIdFunction.recordset[0].id_function
                                : 0,
                            role: resultAfterPswdTested.recordset[0][roles_model_1.RolesEnum.LIBELLE],
                            prenom: resultAfterPswdTested.recordset[0][user_model_1.UtilisateurEnum.PRENOM],
                            nom: resultAfterPswdTested.recordset[0][user_model_1.UtilisateurEnum.NOM],
                            email: resultAfterPswdTested.recordset[0][user_model_1.UtilisateurEnum.EMAIL],
                        };
                        const claims = {
                            expiresIn: "12h",
                            audience: resultAfterPswdTested.recordset[0][roles_model_1.RolesEnum.DROITS],
                        };
                        response.status(200).json({
                            token: jwt.sign(payload, secret_password_json_1.default.passwordToken, claims),
                            userId: (_a = resultAfterPswdTested.recordset[0][user_model_1.UtilisateurEnum.PK]) === null || _a === void 0 ? void 0 : _a.toString(),
                        });
                    })
                        .catch((error2) => {
                        console.log(error2.message);
                        return response.status(401).send("Unauthorized");
                    });
                })
                    .catch((error3) => {
                    console.log(error3.message);
                    return response.status(401).send("Unauthorized");
                });
            })
                .catch((error4) => {
                return response.status(401).send("Unauthorized");
            });
        })
            .catch((error5) => {
            throw new Error("Unauthorized");
        });
    }
    catch (error) {
        return response.status(401).send("Unauthorized");
    }
};
exports.login = login;
const getIdFunctionQuery = (fonctionType, fkUtilisateur) => {
    try {
        switch (fonctionType) {
            case user_model_2.FonctionEnum.ETUDIANT:
                return `SELECT ${etudiant_model_1.EtudiantEnum.PK} AS id_function  FROM ${etudiant_model_1.EtudiantEnum.NOM_TABLE} WHERE ${etudiant_model_1.EtudiantEnum.FK_UTILISATEUR} = ${fkUtilisateur}`;
            case user_model_2.FonctionEnum.INTERVENANT:
                return `SELECT ${intervenant_1.IntervenantEnum.PK} AS id_function  FROM ${intervenant_1.IntervenantEnum.NOM_TABLE} WHERE ${intervenant_1.IntervenantEnum.FK_UTILISATEUR} = ${fkUtilisateur}`;
            case user_model_2.FonctionEnum.RESPONSABLE_PEDA:
                return `SELECT ${resp_pedago_model_1.ResponsablePedagogiqueEnum.PK} AS id_function  FROM ${resp_pedago_model_1.ResponsablePedagogiqueEnum.NOM_TABLE} WHERE ${resp_pedago_model_1.ResponsablePedagogiqueEnum.FK_UTILISATEUR} = ${fkUtilisateur}`;
            case user_model_2.FonctionEnum.REPROGRAPHE:
                return `SELECT ${reprographe_model_1.ReprographeEnum.PK} AS id_function FROM ${reprographe_model_1.ReprographeEnum.NOM_TABLE} WHERE ${reprographe_model_1.ReprographeEnum.FK_UTILISATEUR} = ${fkUtilisateur}`;
            case user_model_2.FonctionEnum.ATTACHE_PROMO:
                return `SELECT ${attache_promotion_model_1.AttachePromotionEnum.PK} AS id_function FROM ${attache_promotion_model_1.AttachePromotionEnum.NOM_TABLE} WHERE ${attache_promotion_model_1.AttachePromotionEnum.FK_UTILISATEUR} = ${fkUtilisateur}`;
            case user_model_2.FonctionEnum.ADMIN:
                return "SELECT * FROM Utilisateur WHERE id_utilisateur = 0";
            default:
                throw new Error("");
        }
        throw new Error("Error");
    }
    catch (error) {
        throw new Error("Error");
    }
};
const updatePasswordPATCH = (request, response) => {
    const body = request.body;
    const userNewPswd = body.newPswd;
    const idUser = Number(body.idUser);
    console.log(secret_password_json_1.default.passwordHashSalt);
    bcryptjs_1.default
        .hash(userNewPswd, secret_password_json_1.default.passwordHashSalt)
        .then((hash) => {
        mssql_1.default
            .connect(config)
            .then((pool) => {
            const queryPatchMdp = `
      UPDATE ${user_model_1.UtilisateurEnum.NOM_TABLE}
      SET 
        ${user_model_1.UtilisateurEnum.MDP} = '${hash}'
      WHERE ${user_model_1.UtilisateurEnum.PK} = ${idUser}
      `;
            pool
                .request()
                .query(queryPatchMdp)
                .then((result) => {
                response.status(201).send("User was updated.");
            })
                .catch((error) => {
                console.log(error.message);
                response.status(401).send("Unauthorized request.");
            });
        })
            .catch((error) => {
            console.log(error.message);
            response.status(401).send("Unauthorized request.");
        });
    })
        .catch((error) => {
        console.log(error.message);
        response.status(401).send("Unauthorized request.");
    });
};
exports.updatePasswordPATCH = updatePasswordPATCH;
//# sourceMappingURL=authentication.js.map