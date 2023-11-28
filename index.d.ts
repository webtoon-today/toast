import * as react_jsx_runtime from 'react/jsx-runtime';
import styleInject from '/home/youngjinpark/toast/node_modules/style-inject/dist/style-inject.es.js';
import { ReactNode } from 'react';

var css_248z = ".ToastBackgroundArea {\n  z-index: 2000;\n  font-size: 1rem;\n  position: fixed;\n  top: 100px;\n  text-align: center;\n  width: 100vw;\n  min-height: 50px;\n}\n.ToastBackgroundArea .ToastBox {\n  display: inline-flex;\n  justify-content: center;\n  padding: 15px 22px;\n  margin: 0 auto;\n  border-radius: 5px;\n  background: rgba(1, 1, 1, 0.8);\n  color: rgb(255, 255, 255);\n  white-space: pre-line;\n  word-break: keep-all;\n  text-align: start;\n  max-width: 600px;\n}\n@media (max-width: 700px) {\n  .ToastBackgroundArea .ToastBox {\n    max-width: calc(100% - 62px);\n  }\n}\n.ToastBackgroundArea .ToastBox.IconToast {\n  align-items: flex-start;\n  gap: 10px;\n}\n.ToastBackgroundArea .ToastBox .CheckButton {\n  color: rgb(61, 106, 255);\n  margin-left: 10px;\n  cursor: pointer;\n  align-self: flex-end;\n}";
styleInject(css_248z);

declare const Toast: () => react_jsx_runtime.JSX.Element;

declare const types: readonly ["success", "warning", "error", "info"];
type toastIconTypes = typeof types[number];
type toastObjectType = {
    message: string | ReactNode;
    timeout?: number;
    iconType?: toastIconTypes;
};
type toastAlertType = {
    (obj: toastObjectType): void;
    (message: string, timeout?: number, iconType?: toastIconTypes): void;
};
declare const useToastAlert: () => {
    toastAlert: toastAlertType;
};

export { Toast, useToastAlert };
