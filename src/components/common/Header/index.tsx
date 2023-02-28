import { Button } from '@progress/kendo-react-buttons';
import avatar from '../../../assets/img/avatar.svg';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../../features/auth/auth-selectors';
import { RootState, useAppDispatch } from 'store';
import { changeWindowOpen } from '../../../features/auth/auth-slice';
const Header = () => {
    const dispatch = useAppDispatch();
    const isAuth = useSelector((state: RootState) => selectIsAuth(state));

    return (
        <header data-testid='header' className='header w-100 p-20 position-fixed d-flex justify-content-end'>
            {isAuth && <img src={avatar} className='app-btn' alt='avatar' />}
            {!isAuth && (
                <Button
                    className='app-btn'
                    themeColor={'tertiary'}
                    size={'large'}
                    onClick={() => dispatch(changeWindowOpen(true))}
                >
                    Войти
                </Button>
            )}
        </header>
    );
};
export { Header };
