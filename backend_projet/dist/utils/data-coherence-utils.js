"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPresenceDataCoherent = void 0;
const isPresenceDataCoherent = (studentPresence) => {
    const isAbsentPossibleValue = !!studentPresence.isAbsent &&
        !studentPresence.isLate &&
        !studentPresence.hasSigned;
    const isLatePossibleValue = !studentPresence.isAbsent &&
        !!studentPresence.isLate &&
        !!studentPresence.hasSigned;
    const isPresentPossibleValue = !studentPresence.isAbsent &&
        !studentPresence.isLate &&
        !!studentPresence.hasSigned;
    if (isAbsentPossibleValue || isLatePossibleValue || isPresentPossibleValue) {
        return true;
    }
    else {
        return false;
    }
};
exports.isPresenceDataCoherent = isPresenceDataCoherent;
//# sourceMappingURL=data-coherence-utils.js.map