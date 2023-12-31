"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matiereColumns = exports.MatiereEnum = void 0;
var MatiereEnum;
(function (MatiereEnum) {
    MatiereEnum["NOM_TABLE"] = "Matiere";
    MatiereEnum["PK"] = "id_matiere";
    MatiereEnum["FK_INTERVENANT"] = "id_intervenant";
    MatiereEnum["LIBELLE"] = "libelle_matiere";
    MatiereEnum["FK_ECOLE"] = "id_ecole";
})(MatiereEnum || (exports.MatiereEnum = MatiereEnum = {}));
exports.matiereColumns = {
    LIBELLE: 'libelle_matiere',
    PK: 'id_matiere',
};
//# sourceMappingURL=matiere-model.js.map