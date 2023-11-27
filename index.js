"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useToastAlert = void 0;
const react_1 = __importDefault(require("react"));
const Toast_1 = require("./Recoil/Toast");
const recoil_1 = require("recoil");
var Toast_2 = require("./Recoil/Toast");
Object.defineProperty(exports, "useToastAlert", { enumerable: true, get: function () { return Toast_2.useToastAlert; } });
require("./Toast.scss");
const Toast = () => {
    const toast = (0, recoil_1.useRecoilValue)(Toast_1.toastAlertAtom);
    const [show, setShow] = react_1.default.useState(false);
    react_1.default.useEffect(() => {
        if (toast.message) {
            setShow(true);
        }
        const timer = setTimeout(() => {
            setShow(false);
        }, toast.timeout);
        return () => {
            clearTimeout(timer);
        };
    }, [toast]);
    return (<div className={'ToastBackgroundArea'} style={{
            display: show ? 'block' : 'none'
        }}>
            <div className={`ToastBox ${toast && toast.iconType ? "IconToast" : ""}`}>
                {toast && toast.iconType
            ? <>
                        <img src={`https://static.webtoon.today/ddah/icon/icon_${toast.iconType}.svg`} alt={toast.iconType} width={20} height={20} style={{ marginRight: 10 }}/>
                        {toast.message}
                        <div className={'CheckButton'} onClick={() => setShow(false)}>
                            {'확인'}
                        </div>
                    </>
            : toast.message}
            </div>
        </div>);
};
exports.default = Toast;
