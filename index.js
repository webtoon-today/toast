'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var recoil = require('recoil');

const initialTimeout = 3000;
const toastDefault = {
    message: '', timeout: 0,
};
const toastAlertAtom = recoil.atom({
    key: "toastAlertKey",
    default: toastDefault
});
const useToastAlert = () => {
    const setToastAlertAtom = recoil.useSetRecoilState(toastAlertAtom);
    const toastAlert = React.useCallback((messageOfParamsOrToastObject, timeoutOfParams, iconTypeOfParams) => {
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

const Toast = () => {
    const toast = recoil.useRecoilValue(toastAlertAtom);
    const [show, setShow] = React.useState(false);
    React.useEffect(() => {
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
    return (jsxRuntime.jsx(recoil.RecoilRoot, { children: jsxRuntime.jsx("div", { className: 'ToastBackgroundArea', style: {
                display: show ? 'block' : 'none'
            }, children: jsxRuntime.jsx("div", { className: `ToastBox ${toast && toast.iconType ? "IconToast" : ""}`, children: toast && toast.iconType
                    ? jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx("img", { src: `https://static.webtoon.today/ddah/icon/icon_${toast.iconType}.svg`, alt: toast.iconType, width: 20, height: 20, style: { marginRight: 10 } }), toast.message, jsxRuntime.jsx("div", { className: 'CheckButton', onClick: () => setShow(false), children: '확인' })] })
                    : toast.message }) }) }));
};

exports.Toast = Toast;
exports.useToastAlert = useToastAlert;
