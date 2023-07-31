"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryPatchPromotionPATCH = exports.queryDeletePromotionDELETE = exports.queryGetPaginatedPromotionsBySchoolGET = exports.queryGetPaginatedPromotionGET = exports.queryPromotionByIdGET = exports.promotionColumns = exports.PromotionEnum = void 0;
const school_model_1 = require("../infrastructure/school-model");
var PromotionEnum;
(function (PromotionEnum) {
    PromotionEnum["NOM_TABLE"] = "Promotion";
    PromotionEnum["PK"] = "id_promotion";
    PromotionEnum["LIBELLE"] = "libelle_promotion";
    PromotionEnum["ANNEE"] = "annee_promotion";
    PromotionEnum["DOMAINE"] = "domaine_promotion";
    PromotionEnum["SPECIALITE_PROMOTION"] = "specialite_promotion";
    PromotionEnum["DIPLOME"] = "diplome_promotion";
    PromotionEnum["NIVEAU_ETUDE"] = "niveau_etude";
    PromotionEnum["FK_ECOLE"] = "id_ecole";
})(PromotionEnum || (exports.PromotionEnum = PromotionEnum = {}));
exports.promotionColumns = {
    LIBELLE: "libelle_promotion",
    ANNEE: "annee_promotion",
    DOMAINE: "domaine_promotion",
    SPECIALITE_PROMOTION: "specialite_promotion",
    DIPLOME: "diplome_promotion",
    NIVEAU_ETUDE: "niveau_etude",
};
const queryPromotionByIdGET = (idPromotion) => {
    const query = `
  SELECT
  ${PromotionEnum.NOM_TABLE}.${PromotionEnum.PK} AS id_promotion,
  ${PromotionEnum.NOM_TABLE}.${PromotionEnum.LIBELLE} AS libelle_promotion,
  ${PromotionEnum.NOM_TABLE}.${PromotionEnum.ANNEE} AS annee_promotion,
  ${PromotionEnum.NOM_TABLE}.${PromotionEnum.DOMAINE} AS domaine_promotion,
  ${PromotionEnum.NOM_TABLE}.${PromotionEnum.SPECIALITE_PROMOTION} AS specialite_promotion,
  ${PromotionEnum.NOM_TABLE}.${PromotionEnum.DIPLOME} AS diplome_promotion,
  ${PromotionEnum.NOM_TABLE}.${PromotionEnum.NIVEAU_ETUDE} AS niveau_etude,
  ${school_model_1.SchoolEnum.NOM_TABLE}.${school_model_1.SchoolEnum.PK} AS id_ecole,
  ${school_model_1.SchoolEnum.NOM_TABLE}.${school_model_1.SchoolEnum.LIBELLE} AS libelle_ecole,
  ${school_model_1.SchoolEnum.NOM_TABLE}.${school_model_1.SchoolEnum.DOMAINE} AS domaine_ecole
  FROM ${PromotionEnum.NOM_TABLE}

  LEFT JOIN ${school_model_1.SchoolEnum.NOM_TABLE} ON ${school_model_1.SchoolEnum.NOM_TABLE}.${school_model_1.SchoolEnum.PK} = ${PromotionEnum.NOM_TABLE}.${PromotionEnum.FK_ECOLE}
  WHERE ${PromotionEnum.NOM_TABLE}.${PromotionEnum.PK} = ${idPromotion}
  `;
    return query;
};
exports.queryPromotionByIdGET = queryPromotionByIdGET;
const queryGetPaginatedPromotionGET = (page, rowsNumber, orderBy) => {
    const query = `
  DECLARE @PageNumber AS INT
  DECLARE @PageSize AS INT
  SET @PageNumber=${page}
  SET @PageSize=${rowsNumber}
  SELECT
  ${PromotionEnum.NOM_TABLE}.${PromotionEnum.PK} AS id_promotion,
  ${PromotionEnum.NOM_TABLE}.${PromotionEnum.LIBELLE} AS libelle_promotion,
  ${PromotionEnum.NOM_TABLE}.${PromotionEnum.ANNEE} AS annee_promotion,
  ${PromotionEnum.NOM_TABLE}.${PromotionEnum.DOMAINE} AS domaine_promotion,
  ${PromotionEnum.NOM_TABLE}.${PromotionEnum.SPECIALITE_PROMOTION} AS specialite_promotion,
  ${PromotionEnum.NOM_TABLE}.${PromotionEnum.DIPLOME} AS diplome_promotion,
  ${PromotionEnum.NOM_TABLE}.${PromotionEnum.NIVEAU_ETUDE} AS niveau_etude,
  ${school_model_1.SchoolEnum.NOM_TABLE}.${school_model_1.SchoolEnum.PK} AS id_ecole,
  ${school_model_1.SchoolEnum.NOM_TABLE}.${school_model_1.SchoolEnum.LIBELLE} AS libelle_ecole,
  ${school_model_1.SchoolEnum.NOM_TABLE}.${school_model_1.SchoolEnum.DOMAINE} AS domaine_ecole
  FROM ${PromotionEnum.NOM_TABLE}
  LEFT JOIN ${school_model_1.SchoolEnum.NOM_TABLE} ON ${school_model_1.SchoolEnum.NOM_TABLE}.${school_model_1.SchoolEnum.PK} = ${PromotionEnum.NOM_TABLE}.${PromotionEnum.FK_ECOLE}
  ORDER BY ${PromotionEnum.NOM_TABLE}.${exports.promotionColumns[orderBy]} ASC
  OFFSET (@PageNumber - 1) * @PageSize ROWS
  FETCH NEXT @PageSize ROWS ONLY;
  `;
    return query;
};
exports.queryGetPaginatedPromotionGET = queryGetPaginatedPromotionGET;
const queryGetPaginatedPromotionsBySchoolGET = (page, rowsNumber, orderBy, idSchool) => {
    const query = `
  DECLARE @PageNumber AS INT
  DECLARE @PageSize AS INT
  SET @PageNumber=${page}
  SET @PageSize=${rowsNumber}
  SELECT
  ${PromotionEnum.NOM_TABLE}.${PromotionEnum.PK} AS id_promotion,
  ${PromotionEnum.NOM_TABLE}.${PromotionEnum.LIBELLE} AS libelle_promotion,
  ${PromotionEnum.NOM_TABLE}.${PromotionEnum.ANNEE} AS annee_promotion,
  ${PromotionEnum.NOM_TABLE}.${PromotionEnum.DOMAINE} AS domaine_promotion,
  ${PromotionEnum.NOM_TABLE}.${PromotionEnum.SPECIALITE_PROMOTION} AS specialite_promotion,
  ${PromotionEnum.NOM_TABLE}.${PromotionEnum.DIPLOME} AS diplome_promotion,
  ${PromotionEnum.NOM_TABLE}.${PromotionEnum.NIVEAU_ETUDE} AS niveau_etude,
  ${school_model_1.SchoolEnum.NOM_TABLE}.${school_model_1.SchoolEnum.PK} AS id_ecole,
  ${school_model_1.SchoolEnum.NOM_TABLE}.${school_model_1.SchoolEnum.LIBELLE} AS libelle_ecole,
  ${school_model_1.SchoolEnum.NOM_TABLE}.${school_model_1.SchoolEnum.DOMAINE} AS domaine_ecole
  FROM ${PromotionEnum.NOM_TABLE}
  LEFT JOIN ${school_model_1.SchoolEnum.NOM_TABLE} ON ${school_model_1.SchoolEnum.NOM_TABLE}.${school_model_1.SchoolEnum.PK} = ${PromotionEnum.NOM_TABLE}.${PromotionEnum.FK_ECOLE}
  WHERE ${PromotionEnum.NOM_TABLE}.${PromotionEnum.FK_ECOLE} = ${idSchool}
  ORDER BY ${PromotionEnum.NOM_TABLE}.${exports.promotionColumns[orderBy]} ASC
  OFFSET (@PageNumber - 1) * @PageSize ROWS
  FETCH NEXT @PageSize ROWS ONLY;
  `;
    return query;
};
exports.queryGetPaginatedPromotionsBySchoolGET = queryGetPaginatedPromotionsBySchoolGET;
const queryDeletePromotionDELETE = (idPromotion) => {
    const query = `
  DELETE FROM ${PromotionEnum.NOM_TABLE}
  WHERE ${PromotionEnum.PK} = ${idPromotion}
  `;
    return query;
};
exports.queryDeletePromotionDELETE = queryDeletePromotionDELETE;
const queryPatchPromotionPATCH = (idPromotion, sqlQueryBodyData) => {
    const query = `
  UPDATE ${PromotionEnum.NOM_TABLE}
  SET ${PromotionEnum.LIBELLE} = '${sqlQueryBodyData.libellePromotion}',
  ${PromotionEnum.ANNEE} = '${sqlQueryBodyData.anneePromotion}',
  ${PromotionEnum.DOMAINE} = '${sqlQueryBodyData.domainePromotion}',
  ${PromotionEnum.SPECIALITE_PROMOTION} = '${sqlQueryBodyData.specialitePromotion}',
  ${PromotionEnum.DIPLOME} = '${sqlQueryBodyData.diplomePromotion}',
  ${PromotionEnum.NIVEAU_ETUDE} = '${sqlQueryBodyData.niveauEtude}'
  WHERE ${PromotionEnum.PK} = ${idPromotion}
  `;
    return query;
};
exports.queryPatchPromotionPATCH = queryPatchPromotionPATCH;
//# sourceMappingURL=promotion-model.js.map