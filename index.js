'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');

const Toast = () => {
    const { toast } = useToast();
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
    return (jsxRuntime.jsx("div", { className: 'ToastBackgroundArea', style: {
            display: show ? 'block' : 'none'
        }, children: jsxRuntime.jsx("div", { className: `ToastBox ${toast && toast.iconType ? "IconToast" : ""}`, children: toast && toast.iconType
                ? jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx("img", { src: `https://static.webtoon.today/ddah/icon/icon_${toast.iconType}.svg`, alt: toast.iconType, width: 20, height: 20, style: { marginRight: 10 } }), toast.message, jsxRuntime.jsx("div", { className: 'CheckButton', onClick: () => setShow(false), children: '확인' })] })
                : toast.message }) }));
};
const useToast = () => {
    const [toast, setToast] = React.useState({ message: '', timeout: 3000 });
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
        setToast({ message, timeout: timeout || 3000, iconType });
    }, [setToast]);
    return { toast, toastAlert };
};

exports.Toast = Toast;
exports.useToast = useToast;
