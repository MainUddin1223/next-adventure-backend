"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pick = (obj, keys) => {
    const validQuries = {};
    for (const key of keys) {
        if (obj && Object.hasOwnProperty.call(obj, key)) {
            validQuries[key] = obj[key];
        }
    }
    return validQuries;
};
exports.default = pick;
