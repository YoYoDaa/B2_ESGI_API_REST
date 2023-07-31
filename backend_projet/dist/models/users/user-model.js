"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newFunctionQuery = exports.queryPatchUserPATCH = exports.queryDeleteFonctionUserDELETE = exports.queryDeleteUserDELETE = exports.queryPaginatedAdminGET = exports.queryPaginatedResponsablePedagogiqueGET = exports.queryPaginatedIntervenantPromoGET = exports.queryPaginatedAttachePromoGET = exports.queryPaginatedReprographeGET = exports.queryPaginatedEtudiantGET = exports.FonctionEnum = exports.utilisateurColumns = exports.UtilisateurEnum = void 0;
const attache_promotion_model_1 = require("./attache-promotion-model");
const etudiant_model_1 = require("./etudiant-model");
const intervenant_1 = require("./intervenant");
const reprographe_model_1 = require("./reprographe-model");
const resp_pedago_model_1 = require("./resp-pedago-model");
const roles_model_1 = require("./roles-model");
const student_class_model_1 = require("../education/student-class-model");
var UtilisateurEnum;
(function (UtilisateurEnum) {
    UtilisateurEnum["NOM_TABLE"] = "Utilisateur";
    UtilisateurEnum["PK"] = "id_utilisateur";
    UtilisateurEnum["NOM"] = "nom";
    UtilisateurEnum["PRENOM"] = "prenom";
    UtilisateurEnum["EMAIL"] = "adresse_email";
    UtilisateurEnum["MDP"] = "motdepasse";
    UtilisateurEnum["FK_ROLE_UTILISATEUR"] = "id_role_utilisateur";
})(UtilisateurEnum || (exports.UtilisateurEnum = UtilisateurEnum = {}));
exports.utilisateurColumns = {
    NOM: "nom",
    PRENOM: "prenom",
    EMAIL: "adresse_email",
    PK: "id_utilisateur",
};
var FonctionEnum;
(function (FonctionEnum) {
    FonctionEnum["ETUDIANT"] = "ETUDIANT";
    FonctionEnum["INTERVENANT"] = "INTERVENANT";
    FonctionEnum["ATTACHE_PROMO"] = "ATTACHE_PROMO";
    FonctionEnum["RESPONSABLE_PEDA"] = "RESPONSABLE_PEDA";
    FonctionEnum["REPROGRAPHE"] = "REPROGRAPHE";
    FonctionEnum["ADMIN"] = "ADMINISTRATEUR";
})(FonctionEnum || (exports.FonctionEnum = FonctionEnum = {}));
const queryPaginatedEtudiantGET = (page, rowsNumber, orderBy) => {
    const query = `
        DECLARE @PageNumber AS INT
        DECLARE @PageSize AS INT
        SET @PageNumber=${page}
        SET @PageSize=${rowsNumber}
        
        SELECT
        E.${etudiant_model_1.EtudiantEnum.PK},
        CL.${student_class_model_1.StudClassEnum.PK},
        U.${UtilisateurEnum.PK},
        U.${UtilisateurEnum.PRENOM},
        U.${UtilisateurEnum.NOM},
        U.${UtilisateurEnum.EMAIL}
        FROM ${etudiant_model_1.EtudiantEnum.NOM_TABLE} E
        LEFT JOIN ${UtilisateurEnum.NOM_TABLE} AS U ON E.${etudiant_model_1.EtudiantEnum.FK_UTILISATEUR} = U.${UtilisateurEnum.PK}
        LEFT JOIN ${student_class_model_1.StudClassEnum.NOM_TABLE} AS CL ON E.${etudiant_model_1.EtudiantEnum.FK_CLASSE} = CL.${student_class_model_1.StudClassEnum.PK}
        ORDER BY U.${exports.utilisateurColumns[orderBy]} ASC
        OFFSET (@PageNumber - 1) * @PageSize ROWS
        FETCH NEXT @PageSize ROWS ONLY;
        ;`;
    return query;
};
exports.queryPaginatedEtudiantGET = queryPaginatedEtudiantGET;
const queryPaginatedReprographeGET = (page, rowsNumber, orderBy) => {
    const query = `

  DECLARE @PageNumber AS INT
  DECLARE @PageSize AS INT
  SET @PageNumber=${page}
  SET @PageSize=${rowsNumber}
  
  SELECT 
  R.${reprographe_model_1.ReprographeEnum.PK},
  U.${UtilisateurEnum.PK},
  U.${UtilisateurEnum.PRENOM},
  U.${UtilisateurEnum.NOM},
  U.${UtilisateurEnum.EMAIL}
  FROM ${reprographe_model_1.ReprographeEnum.NOM_TABLE} R
  LEFT JOIN ${UtilisateurEnum.NOM_TABLE} AS U ON R.${reprographe_model_1.ReprographeEnum.FK_UTILISATEUR} = U.${UtilisateurEnum.PK}
  ORDER BY U.${exports.utilisateurColumns[orderBy]} ASC
  OFFSET (@PageNumber - 1) * @PageSize ROWS
  FETCH NEXT @PageSize ROWS ONLY;
  ;`;
    return query;
};
exports.queryPaginatedReprographeGET = queryPaginatedReprographeGET;
const queryPaginatedAttachePromoGET = (page, rowsNumber, orderBy) => {
    const query = `

  DECLARE @PageNumber AS INT
  DECLARE @PageSize AS INT
  SET @PageNumber=${page}
  SET @PageSize=${rowsNumber}
  
  SELECT 
  AP.${attache_promotion_model_1.AttachePromotionEnum.PK},
  U.${UtilisateurEnum.PK},
  U.${UtilisateurEnum.PRENOM},
  U.${UtilisateurEnum.NOM},
  U.${UtilisateurEnum.EMAIL}
  FROM ${attache_promotion_model_1.AttachePromotionEnum.NOM_TABLE} AP
  LEFT JOIN ${UtilisateurEnum.NOM_TABLE} AS U ON AP.${attache_promotion_model_1.AttachePromotionEnum.FK_UTILISATEUR} = U.${UtilisateurEnum.PK}
  ORDER BY U.${exports.utilisateurColumns[orderBy]} ASC
  OFFSET (@PageNumber - 1) * @PageSize ROWS
  FETCH NEXT @PageSize ROWS ONLY;
  ;`;
    return query;
};
exports.queryPaginatedAttachePromoGET = queryPaginatedAttachePromoGET;
const queryPaginatedIntervenantPromoGET = (page, rowsNumber, orderBy) => {
    const query = `

  DECLARE @PageNumber AS INT
  DECLARE @PageSize AS INT
  SET @PageNumber=${page}
  SET @PageSize=${rowsNumber}
  
  SELECT 
  I.${intervenant_1.IntervenantEnum.PK},
  U.${UtilisateurEnum.PK},
  U.${UtilisateurEnum.PRENOM},
  U.${UtilisateurEnum.NOM},
  U.${UtilisateurEnum.EMAIL}
  FROM ${intervenant_1.IntervenantEnum.NOM_TABLE} I
  LEFT JOIN ${UtilisateurEnum.NOM_TABLE} AS U ON I.${intervenant_1.IntervenantEnum.FK_UTILISATEUR} = U.${UtilisateurEnum.PK}
  ORDER BY U.${exports.utilisateurColumns[orderBy]} ASC
  OFFSET (@PageNumber - 1) * @PageSize ROWS
  FETCH NEXT @PageSize ROWS ONLY;
  `;
    return query;
};
exports.queryPaginatedIntervenantPromoGET = queryPaginatedIntervenantPromoGET;
const queryPaginatedResponsablePedagogiqueGET = (page, rowsNumber, orderBy) => {
    const query = `
  DECLARE @PageNumber AS INT
  DECLARE @PageSize AS INT
  SET @PageNumber=${page}
  SET @PageSize=${rowsNumber}
  
  SELECT 
  RP.${resp_pedago_model_1.ResponsablePedagogiqueEnum.PK},
  U.${UtilisateurEnum.PK},
  U.${UtilisateurEnum.PRENOM},
  U.${UtilisateurEnum.NOM},
  U.${UtilisateurEnum.EMAIL}
  FROM ${resp_pedago_model_1.ResponsablePedagogiqueEnum.NOM_TABLE} RP
  LEFT JOIN ${UtilisateurEnum.NOM_TABLE} AS U ON RP.${resp_pedago_model_1.ResponsablePedagogiqueEnum.FK_UTILISATEUR} = U.${UtilisateurEnum.PK}
  ORDER BY U.${exports.utilisateurColumns[orderBy]} ASC
  OFFSET (@PageNumber - 1) * @PageSize ROWS
  FETCH NEXT @PageSize ROWS ONLY;
  `;
    return query;
};
exports.queryPaginatedResponsablePedagogiqueGET = queryPaginatedResponsablePedagogiqueGET;
const queryPaginatedAdminGET = (page, rowsNumber, orderBy) => {
    const query = `
  DECLARE @PageNumber AS INT
  DECLARE @PageSize AS INT
  SET @PageNumber=${page}
  SET @PageSize=${rowsNumber}
  
  SELECT 
  U.${UtilisateurEnum.PK},
  U.${UtilisateurEnum.PRENOM},
  U.${UtilisateurEnum.NOM},
  U.${UtilisateurEnum.EMAIL},
  R.${roles_model_1.RolesEnum.LIBELLE},
  R.${roles_model_1.RolesEnum.DROITS},
  R.${roles_model_1.RolesEnum.PK}
  FROM ${UtilisateurEnum.NOM_TABLE} U
  LEFT JOIN ${roles_model_1.RolesEnum.NOM_TABLE} R ON U.${UtilisateurEnum.FK_ROLE_UTILISATEUR} = R.${roles_model_1.RolesEnum.PK}
  WHERE U.${UtilisateurEnum.FK_ROLE_UTILISATEUR} = 1
  ORDER BY U.${exports.utilisateurColumns[orderBy]} ASC
  OFFSET (@PageNumber - 1) * @PageSize ROWS
  FETCH NEXT @PageSize ROWS ONLY
;
  `;
    return query;
};
exports.queryPaginatedAdminGET = queryPaginatedAdminGET;
const queryDeleteUserDELETE = (idUser, fonction) => {
    const query = `
  DELETE FROM ${UtilisateurEnum.NOM_TABLE}
  WHERE ${UtilisateurEnum.PK} = ${idUser};
  `;
    return query;
};
exports.queryDeleteUserDELETE = queryDeleteUserDELETE;
const queryDeleteFonctionUserDELETE = (idUser) => {
    const query = `
      DELETE FROM ${etudiant_model_1.EtudiantEnum.NOM_TABLE}
      WHERE ${etudiant_model_1.EtudiantEnum.FK_UTILISATEUR} = ${idUser};

      DELETE FROM ${intervenant_1.IntervenantEnum.NOM_TABLE}
      WHERE ${intervenant_1.IntervenantEnum.FK_UTILISATEUR} = ${idUser};

      DELETE FROM ${attache_promotion_model_1.AttachePromotionEnum.NOM_TABLE}
      WHERE ${attache_promotion_model_1.AttachePromotionEnum.FK_UTILISATEUR} = ${idUser};

      DELETE FROM ${resp_pedago_model_1.ResponsablePedagogiqueEnum.NOM_TABLE}
      WHERE ${resp_pedago_model_1.ResponsablePedagogiqueEnum.FK_UTILISATEUR} = ${idUser};

      DELETE FROM ${reprographe_model_1.ReprographeEnum.NOM_TABLE}
      WHERE ${reprographe_model_1.ReprographeEnum.FK_UTILISATEUR} = ${idUser};
      `;
    return query;
};
exports.queryDeleteFonctionUserDELETE = queryDeleteFonctionUserDELETE;
const queryPatchUserPATCH = (idUser, bodyQuery) => {
    const query = `
  UPDATE ${UtilisateurEnum.NOM_TABLE}
  SET ${UtilisateurEnum.NOM} = '${bodyQuery.nomUtilisateur}',
  ${UtilisateurEnum.PRENOM} = '${bodyQuery.prenomUtilisateur}',
  ${UtilisateurEnum.EMAIL} = '${bodyQuery.emailUtilisateur}',
  ${UtilisateurEnum.FK_ROLE_UTILISATEUR} = ${bodyQuery.idRole}
  WHERE ${UtilisateurEnum.PK} = ${idUser};
  `;
    return query;
};
exports.queryPatchUserPATCH = queryPatchUserPATCH;
// export const queryPatchFonctionUserCREATE = (
//   idUser: number,
//   fonction: FonctionType
// ) => {
//   switch (fonction) {
//     case FonctionEnum.ETUDIANT:
//       return `
//       INSERT INTO ${EtudiantEnum.NOM_TABLE} (${EtudiantEnum.FK_UTILISATEUR})
//       VALUES (${idUser})
//       `;
//     case FonctionEnum.INTERVENANT:
//       return `
//       INSERT INTO ${IntervenantEnum.NOM_TABLE} (${IntervenantEnum.FK_UTILISATEUR})
//       VALUES (${idUser})
//       `;
//     case FonctionEnum.ATTACHE_PROMO:
//       return `
//       INSERT INTO ${AttachePromotionEnum.NOM_TABLE} (${AttachePromotionEnum.FK_UTILISATEUR})
//       VALUES (${idUser})
//       `;
//     case FonctionEnum.RESPONSABLE_PEDA:
//       return `
//       INSERT INTO ${ResponsablePedagogiqueEnum.NOM_TABLE} (${ResponsablePedagogiqueEnum.FK_UTILISATEUR})
//       VALUES (${idUser})
//       `;
//     case FonctionEnum.REPROGRAPHE:
//       return `
//       INSERT INTO ${ReprographeEnum.NOM_TABLE} (${ReprographeEnum.FK_UTILISATEUR})
//       VALUES (${idUser})
//       `;
//     default:
//       return "";
//   }
// };
const newFunctionQuery = (fonctionType, fkUtilisateur, body) => {
    try {
        let queryNewFunction = null;
        let idSalle = null;
        switch (fonctionType) {
            case FonctionEnum.ETUDIANT:
                queryNewFunction = `
      INSERT INTO ${etudiant_model_1.EtudiantEnum.NOM_TABLE} (${etudiant_model_1.EtudiantEnum.FK_UTILISATEUR}, ${etudiant_model_1.EtudiantEnum.FK_CLASSE})
      VALUES
      (${fkUtilisateur}, ${body.idClasse})
      `;
                break;
            case FonctionEnum.INTERVENANT:
                queryNewFunction = `
      INSERT INTO ${intervenant_1.IntervenantEnum.NOM_TABLE} (${intervenant_1.IntervenantEnum.FK_UTILISATEUR}, ${intervenant_1.IntervenantEnum.LIBELLE})
      VALUES
      (${fkUtilisateur}, '${body.libelleSpecialite}')
      `;
                break;
            case FonctionEnum.RESPONSABLE_PEDA:
                "idSalle" in body ? (idSalle = body.idSalle) : (idSalle = 10);
                queryNewFunction = `
      INSERT INTO ${resp_pedago_model_1.ResponsablePedagogiqueEnum.NOM_TABLE} (${resp_pedago_model_1.ResponsablePedagogiqueEnum.FK_UTILISATEUR}, ${resp_pedago_model_1.ResponsablePedagogiqueEnum.FK_SALLE})
      VALUES
      (${fkUtilisateur}, ${idSalle})
      `;
                break;
            case FonctionEnum.REPROGRAPHE:
                "idSalle" in body ? (idSalle = body.idSalle) : (idSalle = 10);
                queryNewFunction = `
      INSERT INTO ${reprographe_model_1.ReprographeEnum.NOM_TABLE} (${reprographe_model_1.ReprographeEnum.FK_UTILISATEUR}, ${reprographe_model_1.ReprographeEnum.FK_SALLE})
      VALUES
      (${fkUtilisateur}, ${idSalle})
      `;
                break;
            case FonctionEnum.ATTACHE_PROMO:
                "idSalle" in body ? (idSalle = body.idSalle) : (idSalle = 10);
                queryNewFunction = `
      INSERT INTO ${attache_promotion_model_1.AttachePromotionEnum.NOM_TABLE} (${attache_promotion_model_1.AttachePromotionEnum.FK_UTILISATEUR}, ${attache_promotion_model_1.AttachePromotionEnum.FK_SALLE})
      VALUES
      (${fkUtilisateur}, ${idSalle})
      `;
                break;
            case FonctionEnum.ADMIN:
                break;
            default:
                throw new Error("");
        }
        return queryNewFunction;
    }
    catch (error) {
        throw new Error("Error");
    }
};
exports.newFunctionQuery = newFunctionQuery;
//# sourceMappingURL=user-model.js.map