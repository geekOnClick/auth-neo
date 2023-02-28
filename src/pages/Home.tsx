import { Main } from 'components/common/Main';
import { Header } from 'components/common/Header';
import { Footer } from 'components/common/Footer';
import { Page } from 'components/home-components/Page';
const Home = () => {
    return (
        <>
            <Header />
            <Main>
                <Page />
            </Main>
            <Footer />
        </>
    );
};

export { Home };
