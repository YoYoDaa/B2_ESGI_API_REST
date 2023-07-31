"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryPresenceOfACourseGET = exports.queryUpdatePresencePATCH = exports.queryUpdatePresencePUT = exports.queryNewPresencePOST = exports.PresenceEnum = void 0;
const conversion_utils_1 = require("../../utils/conversion-utils");
const etudiant_model_1 = require("../users/etudiant-model");
const user_model_1 = require("../users/user-model");
const course_model_1 = require("./course-model");
const student_class_model_1 = require("./student-class-model");
var PresenceEnum;
(function (PresenceEnum) {
    PresenceEnum["NOM_TABLE"] = "Presence";
    PresenceEnum["PK"] = "id_presence";
    PresenceEnum["RETARD"] = "en_retard";
    PresenceEnum["ABSENT"] = "est_absent";
    PresenceEnum["FK_COURS"] = "id_cours";
    PresenceEnum["FK_ETUDIANT"] = "id_etudiant";
    PresenceEnum["SIGNE"] = "a_signe";
})(PresenceEnum || (exports.PresenceEnum = PresenceEnum = {}));
const queryNewPresencePOST = (idCourse, idStudent) => {
    const isLate = null;
    const isAbsent = null;
    const hasSigned = null;
    const query = `
  INSERT INTO 
  Presence 
  ( ${PresenceEnum.ABSENT}, ${PresenceEnum.RETARD}, ${PresenceEnum.FK_COURS}, ${PresenceEnum.FK_ETUDIANT} , ${PresenceEnum.SIGNE}) 
  VALUES (${isAbsent}, ${isLate}, ${idCourse}, ${idStudent}, ${hasSigned})`;
    return query;
};
exports.queryNewPresencePOST = queryNewPresencePOST;
const queryUpdatePresencePUT = (idCourse, studentPresence) => {
    const isLate = (0, conversion_utils_1.booleanToSqlBit)(studentPresence.isLate);
    const isAbsent = (0, conversion_utils_1.booleanToSqlBit)(studentPresence.isAbsent);
    const hasSigned = (0, conversion_utils_1.booleanToSqlBit)(studentPresence.hasSigned);
    const query = `
  UPDATE Presence 
  SET
  ${PresenceEnum.ABSENT} = ${isAbsent}, 
  ${PresenceEnum.RETARD} = ${isLate}, 
  ${PresenceEnum.SIGNE} = ${hasSigned}
  WHERE ${PresenceEnum.NOM_TABLE}.${PresenceEnum.FK_COURS} = ${idCourse} AND ${PresenceEnum.NOM_TABLE}.${PresenceEnum.FK_ETUDIANT} = ${studentPresence.idStudent}`;
    return query;
};
exports.queryUpdatePresencePUT = queryUpdatePresencePUT;
const queryUpdatePresencePATCH = (idPresence, studentPresence) => {
    const isLate = (0, conversion_utils_1.booleanToSqlBit)(studentPresence.isLate);
    const isAbsent = (0, conversion_utils_1.booleanToSqlBit)(studentPresence.isAbsent);
    const hasSigned = (0, conversion_utils_1.booleanToSqlBit)(studentPresence.hasSigned);
    const query = `
  UPDATE Presence 
  SET
  ${PresenceEnum.ABSENT} = ${isAbsent}, 
  ${PresenceEnum.RETARD} = ${isLate}, 
  ${PresenceEnum.SIGNE} = ${hasSigned}
  WHERE ${PresenceEnum.NOM_TABLE}.${PresenceEnum.PK} = ${idPresence}`;
    return query;
};
exports.queryUpdatePresencePATCH = queryUpdatePresencePATCH;
const queryPresenceOfACourseGET = (idCourse) => {
    const query = `
  SELECT 
  C.${course_model_1.CoursEnum.PK},
  C.${course_model_1.CoursEnum.DATE},
  C.${course_model_1.CoursEnum.DEBUT},
  C.${course_model_1.CoursEnum.FIN},
  C.${course_model_1.CoursEnum.LIBELLE},
  CL.${student_class_model_1.StudClassEnum.PK},
  CL.${student_class_model_1.StudClassEnum.LIBELLE},
  P.${PresenceEnum.PK},
  P.${PresenceEnum.RETARD},
  P.${PresenceEnum.ABSENT},
  P.${PresenceEnum.SIGNE},
  E.${etudiant_model_1.EtudiantEnum.PK},
  U.${user_model_1.UtilisateurEnum.PK},
  U.${user_model_1.UtilisateurEnum.PRENOM},
  U.${user_model_1.UtilisateurEnum.NOM},
  U.${user_model_1.UtilisateurEnum.EMAIL}
  FROM ${PresenceEnum.NOM_TABLE} AS P
  `;
    return query;
};
exports.queryPresenceOfACourseGET = queryPresenceOfACourseGET;
//# sourceMappingURL=presence-model.js.map