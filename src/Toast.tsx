import React from 'react';
import { toastAlertAtom } from './Recoil/Toast';
import { RecoilRoot, useRecoilValue } from 'recoil';

import './Toast.scss';

export const Toast = () => {
    const toast = useRecoilValue(toastAlertAtom);
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
        <RecoilRoot>
            <div className={`ToastBackgroundArea ${show ? 'Open' : 'Close'}`} style={{ 
                animationDuration: `${toast.timeout || 300}ms`,
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
        </RecoilRoot>
    )
}