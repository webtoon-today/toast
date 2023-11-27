import React from 'react';
import { toastAlertAtom } from './Recoil/Toast';
import { useRecoilValue } from 'recoil';

export { useToastAlert } from './Recoil/Toast';

import './Toast.scss';

const Toast = () => {
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

export default Toast;