import {Header} from '../Header/Header';
import {Footer} from '../Footer/Footer';

export const SharedLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <div
            style={{display: 'flex', flexDirection: 'column', height: '100dvh'}}
        >
            <Header/>

            <main style={{flex: 1, minHeight: 0, overflowY: 'auto',}}>{children}</main>

            <Footer/>
        </div>
    );
};
