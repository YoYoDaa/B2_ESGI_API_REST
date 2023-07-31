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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isModifyingUserPswdRight = exports.isAuthenticated = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const secretPass = __importStar(require("../CONFIG-FILES/secret-password.json"));
const roles_model_1 = require("../models/users/roles-model");
const config = __importStar(require("../config.json"));
const mssql_1 = __importDefault(require("mssql"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = require("../models/users/user-model");
const isAuthenticated = (request, response, next) => {
    try {
        const authHeader = request.get('Authorization');
        if (!authHeader) {
            response.status(401).send('Error unauthorized');
        }
        const token = authHeader.replace('Bearer ', '');
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, secretPass.passwordToken);
            next();
        }
        catch (error) {
            response.status(401).send('Error unauthorized');
        }
    }
    catch (error) {
        response.status(401).send('Error unauthorized');
    }
};
exports.isAuthenticated = isAuthenticated;
const isModifyingUserPswdRight = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.get('Authorization');
        const formerPswd = req.body.formerPswd;
        const idUser = req.body.idUser;
        yield hasTheRightsToModiFyPswd(authHeader, formerPswd, idUser)
            .then((isRightRole) => {
            if (isRightRole) {
                // return res.send(isRightRole)
                next();
            }
            else {
                res.status(401).send('Unauthorized request.');
            }
        })
            .catch((error) => {
            console.log(error.message);
            res.status(403).send('Forbidden request parameters.');
        });
    }
    catch (error) {
        res.status(403).send('Forbidden request parameters.');
    }
});
exports.isModifyingUserPswdRight = isModifyingUserPswdRight;
const hasTheRightsToModiFyPswd = (authHeader, formerPswd, idUser) => __awaiter(void 0, void 0, void 0, function* () {
    const token = authHeader.replace('Bearer ', '');
    return yield decodeToken(token).then((decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
        return yield isUserToUser(idUser, decodedToken, formerPswd).then((isRightUser) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(isRightUser);
            console.log(decodedToken);
            console.log(decodedToken.aud);
            console.log(roles_model_1.isRightRoleEnum.ADMINISTRATEUR);
            console.log(yield hasTheRights(authHeader, [roles_model_1.isRightRoleEnum.ADMINISTRATEUR]));
            if (yield hasTheRights(authHeader, [roles_model_1.isRightRoleEnum.ADMINISTRATEUR])) {
                return true;
            }
            else if (isRightUser) {
                return true;
            }
            else {
                return false;
            }
        }));
    }));
});
function isUserToUser(idUser, decodedToken, formerPswd) {
    return __awaiter(this, void 0, void 0, function* () {
        if (idUser === decodedToken.id) {
            const query = `SELECT * FROM ${user_model_1.UtilisateurEnum.NOM_TABLE} WHERE ${user_model_1.UtilisateurEnum.PK} = ${decodedToken.id}`;
            return yield mssql_1.default.connect(config).then((pool) => __awaiter(this, void 0, void 0, function* () {
                return yield pool.request().query(query).then((result) => __awaiter(this, void 0, void 0, function* () {
                    return bcryptjs_1.default.compare(formerPswd, result.recordset[0][user_model_1.UtilisateurEnum.MDP]).then((isSame) => __awaiter(this, void 0, void 0, function* () {
                        return isSame;
                    }));
                }));
            }));
        }
        else {
            return false;
        }
    });
}
const hasTheRights = (authHeader, roles) => __awaiter(void 0, void 0, void 0, function* () {
    const token = authHeader.replace('Bearer ', '');
    return yield decodeToken(token).then((decodedToken) => {
        if (roles.includes(decodedToken.aud)) {
            return true;
        }
        else {
            return false;
        }
    });
});
function decodeToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const decodedToken = jwt.verify(token, secretPass.passwordToken);
        return decodedToken;
    });
}
//# sourceMappingURL=is-auth.js.map