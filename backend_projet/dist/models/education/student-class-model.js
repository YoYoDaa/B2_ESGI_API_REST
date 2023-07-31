"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.querySelectStudentsInClass = exports.queryGetOneClassGET = exports.querygetAllClassGET = exports.courseColumns = exports.StudClassEnum = void 0;
const etudiant_model_1 = require("../users/etudiant-model");
const user_model_1 = require("../users/user-model");
var StudClassEnum;
(function (StudClassEnum) {
    StudClassEnum["NOM_TABLE"] = "Classe";
    StudClassEnum["PK"] = "id_classe";
    StudClassEnum["LIBELLE"] = "libelle_classe";
    StudClassEnum["FK_PROMOTION"] = "id_promotion";
    StudClassEnum["FK_CAMPUS"] = "id_campus";
})(StudClassEnum || (exports.StudClassEnum = StudClassEnum = {}));
exports.courseColumns = {
    LIBELLE: 'libelle_cours',
    DATE: 'date_cours',
    HEURE_DEBUT: 'heure_debut',
    HEURE_FIN: 'heure_fin',
};
const querygetAllClassGET = (page, rowsNumber, orderBy) => {
    const query = `

  DECLARE @PageNumber AS INT
  DECLARE @PageSize AS INT
  SET @PageNumber=${page}
  SET @PageSize=${rowsNumber}
  SELECT
  ${StudClassEnum.PK} AS idClass,
  ${user_model_1.UtilisateurEnum.PK} AS idUtilisateur,
  ${etudiant_model_1.EtudiantEnum.PK} AS idEtudiant,
  ${StudClassEnum.LIBELLE} AS libelleClass,
  ${user_model_1.UtilisateurEnum.NOM} AS nomUtilisateur,
  ${user_model_1.UtilisateurEnum.PRENOM} AS prenomUtilisateur,
  ${user_model_1.UtilisateurEnum.EMAIL} AS emailUtilisateur,
  FROM ${StudClassEnum.NOM_TABLE}
  LEFT JOIN ${etudiant_model_1.EtudiantEnum.NOM_TABLE} ON ${etudiant_model_1.EtudiantEnum.FK_CLASSE} = ${StudClassEnum.PK}
  LEFT JOIN ${user_model_1.UtilisateurEnum.NOM_TABLE} ON ${user_model_1.UtilisateurEnum.NOM_TABLE}.${user_model_1.UtilisateurEnum.PK} = ${etudiant_model_1.EtudiantEnum.NOM_TABLE}.${etudiant_model_1.EtudiantEnum.FK_UTILISATEUR}
  ORDER BY U.${exports.courseColumns[orderBy]} ASC
  OFFSET (@PageNumber - 1) * @PageSize ROWS
  FETCH NEXT @PageSize ROWS ONLY;
  `;
    return query;
};
exports.querygetAllClassGET = querygetAllClassGET;
const queryGetOneClassGET = (idClass) => {
    const query = `
  SELECT
  ${StudClassEnum.NOM_TABLE}.${StudClassEnum.PK} AS idClass,
  ${user_model_1.UtilisateurEnum.NOM_TABLE}.${user_model_1.UtilisateurEnum.PK} AS idUtilisateur,
  ${etudiant_model_1.EtudiantEnum.NOM_TABLE}.${etudiant_model_1.EtudiantEnum.PK} AS idEtudiant,
  ${StudClassEnum.NOM_TABLE}.${StudClassEnum.LIBELLE} AS libelleClass,
  ${user_model_1.UtilisateurEnum.NOM_TABLE}.${user_model_1.UtilisateurEnum.NOM} AS nomUtilisateur,
  ${user_model_1.UtilisateurEnum.NOM_TABLE}.${user_model_1.UtilisateurEnum.PRENOM} AS prenomUtilisateur,
  ${user_model_1.UtilisateurEnum.NOM_TABLE}.${user_model_1.UtilisateurEnum.EMAIL} AS emailUtilisateur
  FROM ${StudClassEnum.NOM_TABLE}
  LEFT JOIN ${etudiant_model_1.EtudiantEnum.NOM_TABLE} ON ${etudiant_model_1.EtudiantEnum.NOM_TABLE}.${etudiant_model_1.EtudiantEnum.FK_CLASSE} = ${StudClassEnum.NOM_TABLE}.${StudClassEnum.PK}
  LEFT JOIN ${user_model_1.UtilisateurEnum.NOM_TABLE} ON ${user_model_1.UtilisateurEnum.NOM_TABLE}.${user_model_1.UtilisateurEnum.PK} = ${etudiant_model_1.EtudiantEnum.NOM_TABLE}.${etudiant_model_1.EtudiantEnum.FK_UTILISATEUR}
  WHERE ${StudClassEnum.NOM_TABLE}.${StudClassEnum.PK} = '${idClass}'
  `;
    return query;
};
exports.queryGetOneClassGET = queryGetOneClassGET;
const querySelectStudentsInClass = (idClass) => {
    const query = `
  SELECT
  *
  FROM ${etudiant_model_1.EtudiantEnum.NOM_TABLE}
  WHERE ${etudiant_model_1.EtudiantEnum.FK_CLASSE} = '${idClass}'
  `;
    return query;
};
exports.querySelectStudentsInClass = querySelectStudentsInClass;
//# sourceMappingURL=student-class-model.js.map