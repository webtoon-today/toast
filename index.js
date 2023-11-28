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

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".ToastBackgroundArea {\n  z-index: 2000;\n  font-size: 1rem;\n  position: fixed;\n  top: 100px;\n  text-align: center;\n  width: 100vw;\n  min-height: 50px;\n}\n.ToastBackgroundArea .ToastBox {\n  display: inline-flex;\n  justify-content: center;\n  padding: 15px 22px;\n  margin: 0 auto;\n  border-radius: 5px;\n  background: rgba(1, 1, 1, 0.8);\n  color: rgb(255, 255, 255);\n  white-space: pre-line;\n  word-break: keep-all;\n  text-align: start;\n  max-width: 600px;\n}\n@media (max-width: 700px) {\n  .ToastBackgroundArea .ToastBox {\n    max-width: calc(100% - 62px);\n  }\n}\n.ToastBackgroundArea .ToastBox.IconToast {\n  align-items: flex-start;\n  gap: 10px;\n}\n.ToastBackgroundArea .ToastBox .CheckButton {\n  color: rgb(61, 106, 255);\n  margin-left: 10px;\n  cursor: pointer;\n  align-self: flex-end;\n}";
styleInject(css_248z);

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