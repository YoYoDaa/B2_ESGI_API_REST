"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqlBitToBoolean = exports.booleanToSqlBit = void 0;
const booleanToSqlBit = (boolToConvert) => {
    if (boolToConvert) {
        return 1;
    }
    else {
        return 0;
    }
};
exports.booleanToSqlBit = booleanToSqlBit;
const sqlBitToBoolean = (sqlBitToConvert) => {
    if (sqlBitToConvert === 1) {
        return true;
    }
    else {
        return false;
    }
};
exports.sqlBitToBoolean = sqlBitToBoolean;
//# sourceMappingURL=conversion-utils.js.map