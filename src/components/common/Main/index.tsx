import { IMain } from 'types/common';

const Main = ({ children }: IMain) => {
    return <main className='main d-flex flex-grow-1 flex-column'>{children}</main>;
};
export { Main };
