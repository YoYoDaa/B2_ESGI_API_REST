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
exports.coursesAllPagesGET = exports.patchCoursePATCH = exports.courseByIdGET = exports.deleteCourseDELETE = exports.coursesStudentGET = exports.coursesPagesGET = exports.newCoursePOST = void 0;
const course_model_1 = require("../../models/education/course-model");
const integer_model_1 = __importDefault(require("../../models/integer-model"));
const string_regex_1 = require("../../Regex/string-regex");
const config = __importStar(require("../../config.json"));
const mssql_1 = __importDefault(require("mssql"));
const user_model_1 = require("../../models/users/user-model");
const etudiant_model_1 = require("../../models/users/etudiant-model");
const attache_promotion_model_1 = require("../../models/users/attache-promotion-model");
const reprographe_model_1 = require("../../models/users/reprographe-model");
const intervenant_1 = require("../../models/users/intervenant");
const resp_pedago_model_1 = require("../../models/users/resp-pedago-model");
const roles_model_1 = require("../../models/users/roles-model");
const course_model_2 = require("../../models/education/course-model");
const presence_model_1 = require("../../models/education/presence-model");
const newCoursePOST = (request, response, next) => {
    const body = request.body;
    const startCourse = new Date(body.startCourse).toISOString();
    const endCourse = new Date(body.endCourse).toISOString();
    const courseDate = new Date(body.courseDate).toISOString();
    const allIdsToTest = [
        body.idTeacher,
        body.idRespFormation,
        body.idAttacheFormation,
        body.idReprographe,
        body.idClassRoom,
        body.idCourseSubject,
        body.idClass,
    ];
    if ((0, integer_model_1.default)(allIdsToTest) && (0, string_regex_1.onlyLowercaseRegExp)([body.courseLabel])) {
        const sqlQueryBodyData = {
            courseLabel: body.courseLabel,
            courseDate,
            startCourse,
            endCourse,
            idTeacher: body.idTeacher,
            idRespPedago: body.idRespPedago,
            idAttachePromotion: body.idAttachePromotion,
            idReprographe: body.idReprographe,
            idClassRoom: body.idClassRoom,
            idCourseSubject: body.idCourseSubject,
            idClass: body.idClass,
        };
        try {
            const queryPOSTCourses = (0, course_model_1.queryNewCoursesPOST)(sqlQueryBodyData);
            mssql_1.default
                .connect(config)
                .then((pool) => {
                return {
                    result: pool.request().query(queryPOSTCourses),
                    poolValue: pool,
                };
            })
                .then((returnedValueWhenInserted) => __awaiter(void 0, void 0, void 0, function* () {
                if ((yield returnedValueWhenInserted.result).rowsAffected[0] === 1) {
                    returnedValueWhenInserted.poolValue
                        .request()
                        .query((0, course_model_1.queryGetCourseAndStudentsGET)((yield returnedValueWhenInserted.result).recordset[0].id_cours))
                        .then((result) => {
                        result.recordset.forEach((element) => {
                            returnedValueWhenInserted.poolValue
                                .request()
                                .query((0, presence_model_1.queryNewPresencePOST)(element.idCours, element.idEtudiant));
                        });
                    })
                        .then(() => {
                        response
                            .status(201)
                            .send({ message: "New course was successfully created !" });
                    });
                }
                else {
                    throw new Error("Unacceptable operation.");
                }
            }));
        }
        catch (error) {
            response.status(405).send(error);
        }
    }
    else {
        response.status(405).send("Unacceptable operation.");
    }
};
exports.newCoursePOST = newCoursePOST;
const coursesPagesGET = (request, response) => {
    try {
        const params = request.params;
        const sqlQueryBodyData = {
            startDate: params.startDate,
            numberOfDays: Number(params.numberOfDays),
            idUser: Number(params.idUser),
        };
        mssql_1.default
            .connect(config)
            .then((pool) => {
            const queryRole = (0, course_model_1.coursesUserGETQuery)(sqlQueryBodyData.idUser);
            return { queryRole, pool };
        })
            .then((coursesUserGETQueryResult) => {
            coursesUserGETQueryResult.pool
                .request()
                .query(coursesUserGETQueryResult.queryRole)
                .then((result) => {
                const userConcernedCourses = userFonctionTable(result.recordset[0][roles_model_1.RolesEnum.LIBELLE], sqlQueryBodyData.idUser, sqlQueryBodyData.startDate, sqlQueryBodyData.numberOfDays);
                return userConcernedCourses;
            })
                .then((userConcernedCoursesQuery) => {
                return coursesUserGETQueryResult.pool
                    .request()
                    .query(userConcernedCoursesQuery);
            })
                .then((result) => {
                response.status(200).send(result.recordsets[0]);
            });
        });
    }
    catch (error) {
        response.status(400).send(error);
    }
};
exports.coursesPagesGET = coursesPagesGET;
const coursesAllPagesGET = (request, response) => {
    try {
        const params = request.params;
        const startDate = params.startDate;
        const numberOfDays = Number(params.numberOfDays);
        mssql_1.default.connect(config).then((pool) => {
            const query = (0, course_model_1.queryCoursesGET)(startDate, numberOfDays);
            console.log(query);
            pool
                .request()
                .query(query)
                .then((result) => {
                return response.status(200).send(result.recordsets[0]);
            })
                .catch((error) => {
                console.log(error.message);
                return response.status(400).send("Bad request");
            });
        });
    }
    catch (error) {
        return response.status(400).send(error);
    }
};
exports.coursesAllPagesGET = coursesAllPagesGET;
const courseByIdGET = (req, res, next) => {
    try {
        const params = req.params;
        mssql_1.default.connect(config).then((pool) => {
            const query = `
      SELECT * FROM ${course_model_1.CoursEnum.NOM_TABLE}
      WHERE ${course_model_1.CoursEnum.PK} = ${params.idCourse}
      `;
            pool
                .request()
                .query(query)
                .then((result) => {
                if (result) {
                    return res.status(200).send(result.recordset);
                }
                else {
                    return res.status(405).send("Unacceptable operation.");
                }
            })
                .catch((error) => {
                return res.status(405).send("Unacceptable operation.");
            });
        });
    }
    catch (error) {
        return res.status(400).send("Bad Request");
    }
};
exports.courseByIdGET = courseByIdGET;
const userFonctionTable = (roleUser, idUser, startDate, numberOfDays) => {
    switch (roleUser) {
        case user_model_1.FonctionEnum.ETUDIANT:
            return (0, course_model_1.coursesUserFunctionIdGETQuery)(etudiant_model_1.EtudiantEnum.FK_CLASSE, etudiant_model_1.EtudiantEnum.NOM_TABLE, etudiant_model_1.EtudiantEnum.FK_UTILISATEUR, idUser, startDate, numberOfDays);
        case user_model_1.FonctionEnum.ATTACHE_PROMO:
            return (0, course_model_1.coursesUserFunctionIdGETQuery)(attache_promotion_model_1.AttachePromotionEnum.PK, attache_promotion_model_1.AttachePromotionEnum.NOM_TABLE, attache_promotion_model_1.AttachePromotionEnum.FK_UTILISATEUR, idUser, startDate, numberOfDays);
        case user_model_1.FonctionEnum.REPROGRAPHE:
            return (0, course_model_1.coursesUserFunctionIdGETQuery)(reprographe_model_1.ReprographeEnum.PK, reprographe_model_1.ReprographeEnum.NOM_TABLE, reprographe_model_1.ReprographeEnum.FK_UTILISATEUR, idUser, startDate, numberOfDays);
        case user_model_1.FonctionEnum.INTERVENANT:
            return (0, course_model_1.coursesUserFunctionIdGETQuery)(intervenant_1.IntervenantEnum.PK, intervenant_1.IntervenantEnum.NOM_TABLE, intervenant_1.IntervenantEnum.FK_UTILISATEUR, idUser, startDate, numberOfDays);
        case user_model_1.FonctionEnum.RESPONSABLE_PEDA:
            return (0, course_model_1.coursesUserFunctionIdGETQuery)(resp_pedago_model_1.ResponsablePedagogiqueEnum.PK, resp_pedago_model_1.ResponsablePedagogiqueEnum.NOM_TABLE, resp_pedago_model_1.ResponsablePedagogiqueEnum.FK_UTILISATEUR, idUser, startDate, numberOfDays);
        // case ADMIN
        default:
            throw new Error("");
            break;
    }
};
// get all students that asisted to a course
const coursesStudentGET = (request, response, next) => {
    try {
        const params = request.params;
        mssql_1.default
            .connect(config)
            .then((pool) => {
            const sqlQueryBodyData = (0, course_model_2.allStudentsOfACourseGETQuery)(Number(params.idCourse));
            return { sqlQueryBodyData, pool };
        })
            .then((courseStudentsGETQueryResult) => {
            courseStudentsGETQueryResult.pool
                .request()
                .query(courseStudentsGETQueryResult.sqlQueryBodyData)
                .then((result) => {
                return result.recordset;
            })
                .then((resultList) => {
                return response.status(200).send(resultList);
            });
        });
    }
    catch (error) {
        response.status(400).send(error);
    }
};
exports.coursesStudentGET = coursesStudentGET;
const deleteCourseDELETE = (request, response, next) => {
    try {
        const params = request.params;
        mssql_1.default
            .connect(config)
            .then((pool) => {
            const sqlDeleteQueryBodyData = (0, course_model_1.queryDeleteCourseAndPresencesDELETE)(Number(params.idCourse));
            return { sqlDeleteQueryBodyData, pool };
        })
            .then((courseStudentsGETQueryResult) => {
            courseStudentsGETQueryResult.pool
                .request()
                .query(courseStudentsGETQueryResult.sqlDeleteQueryBodyData)
                .then((result) => {
                return response.status(200).send(result.recordset);
            })
                .catch((error) => {
                return response.status(400).send("Bad request");
            });
        })
            .catch((error) => {
            return response.status(400).send("Bad request");
        });
    }
    catch (error) {
        return response.status(400).send("Bad request");
    }
};
exports.deleteCourseDELETE = deleteCourseDELETE;
const patchCoursePATCH = (request, response, next) => {
    try {
        const params = request.params;
        const body = request.body;
        mssql_1.default
            .connect(config)
            .then((pool) => {
            const sqlDeleteQuery = (0, course_model_1.queryPatchCoursePATCH)(Number(params.idCourse), body);
            return { sqlDeleteQuery, pool };
        })
            .then((courseStudentsGETQueryResult) => {
            courseStudentsGETQueryResult.pool
                .request()
                .query(courseStudentsGETQueryResult.sqlDeleteQuery)
                .then((result) => {
                return response.status(200).send(result.recordset);
            })
                .catch((error) => {
                console.log(error.message);
                return response.status(400).send("Bad request");
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
exports.patchCoursePATCH = patchCoursePATCH;
//# sourceMappingURL=course-controller.js.map