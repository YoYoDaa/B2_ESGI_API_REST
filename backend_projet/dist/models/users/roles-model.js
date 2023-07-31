"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryRoleGET = exports.isRightRoleEnum = exports.RolesEnum = exports.rolesColumns = void 0;
exports.rolesColumns = {
    LIBELLE: 'libelle_role',
    DROITS: 'droits',
    PK: 'id_role_utilisateur',
};
var RolesEnum;
(function (RolesEnum) {
    RolesEnum["NOM_TABLE"] = "Role_utilisateur";
    RolesEnum["PK"] = "id_role_utilisateur";
    RolesEnum["LIBELLE"] = "libelle_role";
    RolesEnum["DROITS"] = "droits";
})(RolesEnum || (exports.RolesEnum = RolesEnum = {}));
var isRightRoleEnum;
(function (isRightRoleEnum) {
    isRightRoleEnum["ETUDIANT"] = "ETUDIANT";
    isRightRoleEnum["INTERVENANT"] = "INTERVENANT";
    isRightRoleEnum["ATTACHE_PROMO"] = "ATTACHE_PROMO";
    isRightRoleEnum["RESPONSABLE_PEDA"] = "RESPONSABLE_PEDA";
    isRightRoleEnum["REPROGRAPHE"] = "REPROGRAPHE";
    isRightRoleEnum["ADMINISTRATEUR"] = "ADMINISTRATEUR";
})(isRightRoleEnum || (exports.isRightRoleEnum = isRightRoleEnum = {}));
const queryRoleGET = () => {
    const queryGET = `
  SELECT
  *
  FROM ${RolesEnum.NOM_TABLE}
  `;
    return queryGET;
};
exports.queryRoleGET = queryRoleGET;
//# sourceMappingURL=roles-model.js.map