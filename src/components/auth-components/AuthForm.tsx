import { Form, Field, FormElement, FieldRenderProps, FormRenderProps } from '@progress/kendo-react-form';
import { Input } from '@progress/kendo-react-inputs';
import axios from 'axios';
import { Button } from '@progress/kendo-react-buttons';
import img from '../../assets/img/pict.png';
import err from '../../assets/img/sad.png';
import question from '../../assets/img/request.png';
import checkedImg from '../../assets/img/checked.png';
import { RootState, useAppDispatch } from 'store';
import {
    changeAuthStatus,
    changeWindowOpen,
    restorePassword,
    registrateNewUser,
    changeErrorStatus,
} from '../../features/auth/auth-slice';
import { useSelector } from 'react-redux';
import {
    selectIsClientError,
    selectIsServerError,
    selectIsNewUser,
    selectIsRestorePass,
} from '../../features/auth/auth-selectors';
import { useState } from 'react';

const AuthForm = () => {
    const clientError = useSelector((state: RootState) => selectIsClientError(state));
    const serverError = useSelector((state: RootState) => selectIsServerError(state));
    const newUser = useSelector((state: RootState) => selectIsNewUser(state));
    const restorePass = useSelector((state: RootState) => selectIsRestorePass(state));
    const dispatch = useAppDispatch();

    const mockData = true; // POST request
    const mockServerError = false;
    const mockClientError = false;
    const mockNewUser = false;
    const mockRestorePass = false;

    const [restoreSent, setRestoreSent] = useState(false);
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const confirmPasswordValidationMessage: string = 'Введенные пароли не совпадают.';

    const handlePassChange = (event: any) => {
        if (event.target.name === 'password') {
            setPassword(event.target.value);
        } else if (event.target.name === 'confirmPassword') {
            setConfirmPassword(event.target.value);
        }
    };

    const fieldValidator = (value: string) => (value && value.length > 0 ? '' : 'Error');
    const FieldInput = (fieldRenderProps: FieldRenderProps) => {
        const { validationMessage, visited, ...others } = fieldRenderProps;
        return (
            <div>
                <Input {...others} className={`auth__input ${visited && validationMessage ? 'auth__error' : ''}`} />
            </div>
        );
    };
    const FieldPassInput = (fieldRenderProps: FieldRenderProps) => {
        const { validationMessage, visited, ...others } = fieldRenderProps;
        return (
            <div>
                <Input
                    {...others}
                    type='password'
                    className={`auth__input ${visited && validationMessage ? 'auth__error' : ''}`}
                />
            </div>
        );
    };
    const showRestorePassForm = () => {
        dispatch(changeErrorStatus({ error: 200 }));
        dispatch(restorePassword(true));
    };
    const showRegistrationForm = () => {
        dispatch(changeErrorStatus({ error: 200 }));
        dispatch(registrateNewUser(true));
    };
    const handleSubmit = async (dataItem: { [name: string]: any }) => {
        await axios
            .post('/login', dataItem)
            .then((data) => {
                dispatch(changeErrorStatus({ error: 200 }));
                dispatch(changeAuthStatus(true));
                dispatch(changeWindowOpen(false));
            })
            .catch((err) => {
                if (err.response.status >= 400 && err.response.status < 500) dispatch(changeErrorStatus({ error: 400 }));
                if (err.response.status >= 500) dispatch(changeErrorStatus({ error: 500 }));
            });
        // if (mockData) {
        //     dispatch(changeAuthStatus(true));
        //     dispatch(changeWindowOpen(false));
        // }
    };
    const handleRestorePass = async (dataItem: { [name: string]: any }) => {
        console.log(dataItem);

        await axios
            .post('/forget', dataItem)
            .then((data) => {
                dispatch(changeErrorStatus({ error: 200 }));
                setRestoreSent(true);
            })
            .catch((err) => {
                console.log(err);

                if (err.response.status >= 400 && err.response.status < 500) dispatch(changeErrorStatus({ error: 400 }));
                if (err.response.status >= 500) dispatch(changeErrorStatus({ error: 500 }));
            });
    };
    const handleNewUser = async (dataItem: { [name: string]: any }) => {
        await axios
            .post('/create', {
                firstName: dataItem.login,
                lastName: dataItem.login,
                email: dataItem.login,
                password: password,
            })
            .then((data) => {
                setPassword('');
                setConfirmPassword('');
                dispatch(changeErrorStatus({ error: 200 }));
                dispatch(registrateNewUser(false));
            })
            .catch((err) => {
                if (err.response.status >= 400 && err.response.status < 500) dispatch(changeErrorStatus({ error: 400 }));
                if (err.response.status >= 500) dispatch(changeErrorStatus({ error: 500 }));
            });
    };

    return (
        <div className='auth'>
            {!serverError && !newUser && !restorePass && (
                <>
                    <img src={img} alt='study' />
                    <h2 className='auth__title'>Войти</h2>
                    <h2 className='auth__title'>в личный кабинет</h2>
                    {clientError && <h5 className='auth__warning'>неверный логин и/или пароль</h5>}
                    <Form
                        onSubmit={handleSubmit}
                        render={(formRenderProps: FormRenderProps) => (
                            <FormElement>
                                <fieldset className={'k-form-fieldset'}>
                                    <div className='mt-10 mb-3'>
                                        <Field
                                            name={'email'}
                                            component={FieldInput}
                                            label={'Введите логин'}
                                            validator={fieldValidator}
                                        />
                                    </div>

                                    <div className='mb-10'>
                                        <Field
                                            name={'password'}
                                            component={FieldPassInput}
                                            label={'Введите пароль'}
                                            validator={fieldValidator}
                                        />
                                    </div>
                                </fieldset>
                                <div className='k-form-buttons'>
                                    <Button
                                        type={'submit'}
                                        rounded='large'
                                        className='w-100'
                                        themeColor={'tertiary'}
                                        size={'large'}
                                        disabled={!formRenderProps.allowSubmit}
                                    >
                                        Войти
                                    </Button>
                                </div>
                            </FormElement>
                        )}
                    />
                    <h5 className='auth__options' onClick={showRestorePassForm}>
                        Забыли пароль?
                    </h5>
                    <h5 className='auth__options' onClick={showRegistrationForm}>
                        Регистрация
                    </h5>
                </>
            )}
            {serverError && (
                <div className='auth__server-err'>
                    <img src={err} alt='err' />
                    <h2 className='auth__title'>Упс...</h2>
                    <h5 className='auth__options'>У нас что-то сломалось,</h5>
                    <h5 className='auth__options'>попробуйте войти позже!</h5>
                </div>
            )}
            {restorePass && !restoreSent && (
                <div className='auth__restore'>
                    <img src={question} alt='question' />
                    <h2 className='auth__title'>Забыли пароль?</h2>
                    {clientError && <h5 className='auth__warning'>Пользователь с таким логином или e-mail не найден</h5>}
                    <Form
                        onSubmit={handleRestorePass}
                        render={(formRenderProps: FormRenderProps) => (
                            <FormElement>
                                <fieldset className={'k-form-fieldset'}>
                                    <div className='mt-10 mb-3'>
                                        <Field
                                            name={'email'}
                                            component={FieldInput}
                                            label={'Введите логин или email'}
                                            validator={fieldValidator}
                                        />
                                    </div>
                                </fieldset>
                                <div className='k-form-buttons'>
                                    <Button
                                        type={'submit'}
                                        rounded='large'
                                        className='w-100'
                                        themeColor={'tertiary'}
                                        size={'large'}
                                        disabled={!formRenderProps.allowSubmit}
                                    >
                                        Восстановить пароль
                                    </Button>
                                </div>
                            </FormElement>
                        )}
                    />
                </div>
            )}
            {restorePass && restoreSent && !serverError && (
                <div className='auth__restore__sent'>
                    <img src={checkedImg} alt='question' />
                    <h2 className='auth__title'>Восстановление доступа</h2>
                    <div>
                        <h5 className='auth__options'>На email указанный при</h5>
                        <h5 className='auth__options'>регистрации, высланы инструкции</h5>
                        <h5 className='auth__options'>по восстанановлению пароля</h5>
                    </div>
                </div>
            )}
            {newUser && (
                <>
                    <img src={img} alt='study' />
                    <h2 className='auth__title'>Регистрация</h2>
                    {clientError && <h5 className='auth__warning'>ошибка регистрации</h5>}
                    <Form
                        onSubmit={handleNewUser}
                        render={(formRenderProps: FormRenderProps) => (
                            <FormElement>
                                <fieldset className={'k-form-fieldset'}>
                                    <div className='mt-10 mb-3'>
                                        <Field
                                            name={'login'}
                                            component={FieldInput}
                                            label={'Введите логин'}
                                            validator={fieldValidator}
                                        />
                                    </div>
                                    <div className='mb-10'>
                                        <Input
                                            value={password}
                                            className={`auth__input`}
                                            onChange={handlePassChange}
                                            name='password'
                                            type='password'
                                            label='Пароль'
                                            required={true}
                                        />
                                    </div>
                                    <div className='mb-10'>
                                        <Input
                                            value={confirmPassword}
                                            className={`auth__input`}
                                            onChange={handlePassChange}
                                            name='confirmPassword'
                                            type='password'
                                            valid={password === confirmPassword}
                                            label='Повторите пароль'
                                            required={true}
                                            validationMessage={confirmPasswordValidationMessage}
                                        />
                                    </div>
                                </fieldset>
                                <div className='k-form-buttons'>
                                    <Button
                                        type={'submit'}
                                        rounded='large'
                                        className='w-100'
                                        themeColor={'tertiary'}
                                        size={'large'}
                                        disabled={!formRenderProps.allowSubmit}
                                    >
                                        Зарегистрироваться
                                    </Button>
                                </div>
                            </FormElement>
                        )}
                    />
                </>
            )}
        </div>
    );
};
export { AuthForm };
