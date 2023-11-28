import React, { ReactNode, useCallback, useState } from 'react';

import './Toast.scss';

export const Toast = () => {
    const { toast } = useToast();
    const [show, setShow] = React.useState(false);

    React.useEffect(()=>{
        if (toast.message){
            setShow(true);
        }

        const timer = setTimeout(()=>{
            setShow(false);
        }, toast.timeout);

        return ()=>{
            clearTimeout(timer);
        }
    },[toast])

    return (
        <div className={'ToastBackgroundArea'} style={{ 
            display: show ? 'block' : 'none'
        }}>
            <div className={`ToastBox ${toast && toast.iconType?"IconToast":""}`} >
                {toast && toast.iconType
                    ?<>
                        <img src={`https://static.webtoon.today/ddah/icon/icon_${toast.iconType}.svg`} alt={toast.iconType} width={20} height={20} style={{marginRight: 10}} />
                        {toast.message}
                        <div className={'CheckButton'} onClick={()=>setShow(false)} >
                            {'확인'}
                        </div>
                    </>
                    :toast.message}
            </div>
        </div>
    )
}

const types = ["success", "warning", "error", "info"] as const
type toastIconTypes = typeof types[number];

type toastObjectType = {
    message: string | ReactNode,
    timeout?: number,
    iconType?: toastIconTypes
}
type toastAlertType = {
    (obj: toastObjectType): void;
    (message: string, timeout?: number, iconType?: toastIconTypes): void;
}

export const useToast = () => {
    const [ toast, setToast ] = useState<toastObjectType>({message: '', timeout: 3000});

    const toastAlert: toastAlertType = useCallback( (
        messageOfParamsOrToastObject: string | toastObjectType,
        timeoutOfParams?: number,
        iconTypeOfParams?: toastIconTypes
    ): void => {
        let message, timeout, iconType;

        if (typeof messageOfParamsOrToastObject === 'string') {
            message = messageOfParamsOrToastObject;
            timeout = timeoutOfParams;
            iconType = iconTypeOfParams;
        } else {
            message = messageOfParamsOrToastObject.message;
            timeout = messageOfParamsOrToastObject.timeout;
            iconType = messageOfParamsOrToastObject.iconType;
        }

        setToast({message, timeout: timeout || 3000, iconType});
    },[setToast])

    return {toast, toastAlert}
}