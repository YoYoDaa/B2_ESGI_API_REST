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
exports.deletePresenceDELETE = exports.updatePresencesPatch = exports.getPresencesByCourseGET = exports.getPresencesByStudentGET = exports.updatePresencesPUT = void 0;
const mssql_1 = __importDefault(require("mssql"));
const config = __importStar(require("../../config.json"));
const presence_model_1 = require("../../models/education/presence-model");
const data_coherence_utils_1 = require("../../utils/data-coherence-utils");
const presence_model_2 = require("../../models/presence-model");
const course_model_1 = require("../../models/education/course-model");
const user_model_1 = require("../../models/users/user-model");
const student_class_model_1 = require("../../models/education/student-class-model");
const room_model_1 = require("../../models/infrastructure/room-model");
const matiere_model_1 = require("../../models/education/matiere-model");
const etudiant_model_1 = require("../../models/users/etudiant-model");
const updatePresencesPUT = (req, res) => {
    // A function that get value from the request body, create an sql query and create a new row in the presence table
    try {
        const body = req.body;
        const presencesToPUT = {
            idCourse: body.idCourse,
            listStudents: body.listStudents,
        };
        // Create a new row in the presence table
        mssql_1.default
            .connect(config)
            .then((pool) => {
            presencesToPUT.listStudents.forEach((studentPresence) => {
                if (!!(0, data_coherence_utils_1.isPresenceDataCoherent)(studentPresence)) {
                    pool
                        .request()
                        .query((0, presence_model_1.queryUpdatePresencePUT)(presencesToPUT.idCourse, studentPresence));
                }
                else {
                    throw new Error("Data are incoherent !");
                }
            });
        })
            .then(() => {
            res.status(200).json({ message: "Presence(s) successfully updated !" });
        })
            .catch((error) => {
            res.status(400).json({ message: error.message });
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(400).json({ message: error.message });
    }
};
exports.updatePresencesPUT = updatePresencesPUT;
const updatePresencesPATCH = (req, res) => {
    // A function that get value from the request body, create an sql query and update a row in the presence table
    try {
        const body = req.body;
        const idPresence = Number(req.params.idPresence);
        const presenceToPATCH = body;
        // Create a new row in the presence table
        mssql_1.default
            .connect(config)
            .then((pool) => {
            if (!!(0, data_coherence_utils_1.isPresenceDataCoherent)(presenceToPATCH)) {
                pool
                    .request()
                    .query((0, presence_model_1.queryUpdatePresencePATCH)(idPresence, presenceToPATCH));
            }
        })
            .then(() => {
            res.status(200).json({ message: "Presence(s) successfully updated !" });
        })
            .catch((error) => {
            console.log(error.message);
            res.status(400).json({ message: error.message });
        });
    }
    catch (error) { }
};
exports.updatePresencesPatch = updatePresencesPATCH;
const getPresencesByStudentGET = (req, res) => {
    try {
        const params = req.params;
        const idStudent = Number(params.idStudent);
        const queryGET = `
    SELECT 
    P.${presence_model_2.PresenceEnum.PK} AS id_presence,
    P.${presence_model_2.PresenceEnum.RETARD} AS en_retard,
    P.${presence_model_2.PresenceEnum.ABSENT} AS est_absent,
    P.${presence_model_2.PresenceEnum.SIGNE} AS a_signe,
    P.${presence_model_2.PresenceEnum.FK_ETUDIANT} AS id_etudiant,
    C.${course_model_1.CoursEnum.PK},
    C.${course_model_1.CoursEnum.LIBELLE},
    C.${course_model_1.CoursEnum.DATE},
    C.${course_model_1.CoursEnum.DEBUT},
    C.${course_model_1.CoursEnum.FIN},

    U1.${user_model_1.UtilisateurEnum.PK} AS id_reprographe,
    U1.${user_model_1.UtilisateurEnum.NOM} AS nom_reprographe,
    U1.${user_model_1.UtilisateurEnum.PRENOM} AS prenom_reprographe,

    U2.${user_model_1.UtilisateurEnum.PK} AS id_intervenant,
    U2.${user_model_1.UtilisateurEnum.NOM} AS nom_intervenant,
    U2.${user_model_1.UtilisateurEnum.PRENOM} AS prenom_intervenant,
    U2.${user_model_1.UtilisateurEnum.EMAIL} AS email_intervenant,

    U3.${user_model_1.UtilisateurEnum.PK} AS id_attache_de_promotion,
    U3.${user_model_1.UtilisateurEnum.NOM} AS nom_attache_de_promotion,
    U3.${user_model_1.UtilisateurEnum.PRENOM} AS prenom_attache_de_promotion,
    U3.${user_model_1.UtilisateurEnum.EMAIL} AS email_attache_de_promotion,

    U4.${user_model_1.UtilisateurEnum.PK} AS id_responsable_pedagogique,
    U4.${user_model_1.UtilisateurEnum.NOM} AS nom_responsable_pedagogique,
    U4.${user_model_1.UtilisateurEnum.PRENOM} AS prenom_responsable_pedagogique,
    U4.${user_model_1.UtilisateurEnum.EMAIL} AS email_responsable_pedagogique,

    U5.${user_model_1.UtilisateurEnum.PK} AS id_user_etudiant,
    U5.${user_model_1.UtilisateurEnum.NOM} AS nom_etudiant,
    Cl.${student_class_model_1.StudClassEnum.LIBELLE},
    S.${room_model_1.RoomEnum.LIBELLE},
    M.${matiere_model_1.MatiereEnum.LIBELLE}
    FROM 
    ${presence_model_2.PresenceEnum.NOM_TABLE} AS P
    LEFT JOIN ${course_model_1.CoursEnum.NOM_TABLE} C ON P.${presence_model_2.PresenceEnum.FK_COURS} = C.${course_model_1.CoursEnum.PK}
    LEFT JOIN Etudiant E ON P.${presence_model_2.PresenceEnum.FK_ETUDIANT} = E.${etudiant_model_1.EtudiantEnum.PK}
    LEFT JOIN Reprographe R ON C.id_reprographe = R.id_reprographe
    LEFT JOIN Intervenant I ON C.id_intervenant = I.id_intervenant
    LEFT JOIN Attache_de_promotion AP ON C.id_attache_de_promotion = AP.id_attache_de_promotion
    LEFT JOIN Responsable_pedagogique RP ON C.id_responsable_pedagogique = RP.id_responsable_pedagogique
    LEFT JOIN Classe CL ON C.id_classe = CL.id_classe
    LEFT JOIN Salle S ON C.id_salle = S.id_salle
    LEFT JOIN Matiere M ON C.id_matiere = M.id_matiere
    LEFT JOIN Utilisateur U1 ON R.id_utilisateur = U1.id_utilisateur
    LEFT JOIN Utilisateur U2 ON I.id_utilisateur = U2.id_utilisateur
    LEFT JOIN Utilisateur U3 ON AP.id_utilisateur = U3.id_utilisateur
    LEFT JOIN Utilisateur U4 ON RP.id_utilisateur = U4.id_utilisateur
    LEFT JOIN Utilisateur U5 ON E.id_utilisateur = U5.id_utilisateur
    WHERE P.${presence_model_2.PresenceEnum.FK_ETUDIANT} = ${idStudent}   
    `;
        mssql_1.default.connect(config).then((pool) => {
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
                console.log(error.message);
                res.status(405).send("Unacceptable operation.");
            });
        });
    }
    catch (error) {
        res.status(405).send("Unacceptable operation.");
    }
};
exports.getPresencesByStudentGET = getPresencesByStudentGET;
const getPresencesByCourseGET = (req, res) => {
    try {
        const params = req.params;
        const idCourse = Number(params.idCourse);
        const queryGET = `SELECT * FROM ${presence_model_2.PresenceEnum.NOM_TABLE} WHERE ${presence_model_2.PresenceEnum.FK_COURS} = ${idCourse}`;
        mssql_1.default.connect(config).then((pool) => {
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
    }
    catch (error) {
        res.status(405).send("Unacceptable operation.");
    }
};
exports.getPresencesByCourseGET = getPresencesByCourseGET;
const deletePresenceDELETE = (req, res) => {
    try {
        const params = req.params;
        const idPresence = Number(params.idPresence);
        const queryDELETE = `DELETE FROM ${presence_model_2.PresenceEnum.NOM_TABLE} WHERE ${presence_model_2.PresenceEnum.PK} = ${idPresence}`;
        mssql_1.default.connect(config).then((pool) => {
            pool
                .request()
                .query(queryDELETE)
                .then((result) => {
                if (result) {
                    res.status(200).send("Presence successfully deleted !");
                }
                else {
                    res.status(405).send("Unacceptable operation.");
                }
            })
                .catch((error) => {
                console.log(error.message);
                res.status(405).send("Unacceptable operation.");
            });
        });
    }
    catch (error) {
        res.status(405).send("Unacceptable operation.");
    }
};
exports.deletePresenceDELETE = deletePresenceDELETE;
//# sourceMappingURL=presence-controller.js.map