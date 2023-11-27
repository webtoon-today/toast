import { ReactNode, useCallback } from "react";
import { atom, useSetRecoilState } from "recoil";


const types = ["success", "warning", "error", "info"] as const
export type toastIconTypes = typeof types[number];

type toastObjectType = {
    message: ReactNode,
    timeout?: number,
    iconType?: toastIconTypes
}
export type toastAlertType = {
    (obj: toastObjectType): void;
    (message: ReactNode, timeout?: number, iconType?: toastIconTypes): void;
}

const initialTimeout = 3000;
const toastDefault: toastObjectType = {
    message: '', timeout: 0,
}
export const toastAlertAtom = atom({
    key: "toastAlertKey",
    default: toastDefault
})


export const useToastAlert = () => {
    const setToastAlertAtom = useSetRecoilState(toastAlertAtom);

    const toastAlert: toastAlertType = useCallback( (
        messageOfParamsOrToastObject: ReactNode | toastObjectType,
        timeoutOfParams?: number,
        iconTypeOfParams?: toastIconTypes
    ): void => {
        let message: ReactNode, timeout: number | undefined, iconType: toastIconTypes | undefined;

        if (typeof messageOfParamsOrToastObject === 'object'
            && messageOfParamsOrToastObject
            && 'message' in messageOfParamsOrToastObject
            && 'timeout' in messageOfParamsOrToastObject
            && 'iconType' in messageOfParamsOrToastObject ) {

            message = messageOfParamsOrToastObject.message;
            timeout = messageOfParamsOrToastObject.timeout;
            iconType = messageOfParamsOrToastObject.iconType;
        } else {
            message = messageOfParamsOrToastObject as unknown as ReactNode;
            timeout = timeoutOfParams;
            iconType = iconTypeOfParams;
        }

        setToastAlertAtom({message, timeout: timeout || initialTimeout, iconType});
    },[setToastAlertAtom])


    return ({ toastAlert })
}