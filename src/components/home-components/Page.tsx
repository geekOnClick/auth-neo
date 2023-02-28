import kendoka from '../../assets/img/kendoka.svg';
import okImg from '../../assets/img/ok.svg';
import { RootState } from 'store';
import { useSelector } from 'react-redux';
import { selectIsAuth, selectIsWindowOpen } from '../../features/auth/auth-selectors';
import { Window } from '@progress/kendo-react-dialogs';
import { AuthForm } from 'components/auth-components/AuthForm';
import { useAppDispatch } from 'store';
import { changeWindowOpen, discardChanges } from '../../features/auth/auth-slice';
const Page = () => {
    const isAuth = useSelector((state: RootState) => selectIsAuth(state));
    const windowOpen = useSelector((state: RootState) => selectIsWindowOpen(state));
    const dispatch = useAppDispatch();

    return (
        <>
            {isAuth && (
                <div className='App-header'>
                    <img src={okImg} className='App-logo' alt='ok' />
                    <p className='app-text'>Вы успешно увидели чудо.</p>
                </div>
            )}
            {!isAuth && (
                <div className='App-header'>
                    <img src={kendoka} className='App-logo' alt='kendoka' />
                    <p className='app-text'>Войдите, чтобы увидеть чудо.</p>
                </div>
            )}
            {windowOpen && (
                <Window
                    title={null}
                    className={'auth__form'}
                    modal
                    initialHeight={580}
                    initialWidth={480}
                    resizable={false}
                    draggable={false}
                    minimizeButton={() => null}
                    maximizeButton={() => null}
                    restoreButton={() => null}
                    onClose={() => {
                        dispatch(changeWindowOpen(false));
                        dispatch(discardChanges(true));
                    }}
                >
                    <AuthForm />
                </Window>
            )}
        </>
    );
};
export { Page };
