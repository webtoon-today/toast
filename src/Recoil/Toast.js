"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useToastAlert = exports.toastAlertAtom = void 0;
const react_1 = require("react");
const recoil_1 = require("recoil");
const types = ["success", "warning", "error", "info"];
const initialTimeout = 3000;
const toastDefault = {
    message: '', timeout: 0,
};
exports.toastAlertAtom = (0, recoil_1.atom)({
    key: "toastAlertKey",
    default: toastDefault
});
const useToastAlert = () => {
    const setToastAlertAtom = (0, recoil_1.useSetRecoilState)(exports.toastAlertAtom);
    const toastAlert = (0, react_1.useCallback)((messageOfParamsOrToastObject, timeoutOfParams, iconTypeOfParams) => {
        let message, timeout, iconType;
        if (typeof messageOfParamsOrToastObject === 'string') {
            message = messageOfParamsOrToastObject;
            timeout = timeoutOfParams;
            iconType = iconTypeOfParams;
        }
        else {
            message = messageOfParamsOrToastObject.message;
            timeout = messageOfParamsOrToastObject.timeout;
            iconType = messageOfParamsOrToastObject.iconType;
        }
        setToastAlertAtom({ message, timeout: timeout || initialTimeout, iconType });
    }, [setToastAlertAtom]);
    return ({ toastAlert });
};
exports.useToastAlert = useToastAlert;
