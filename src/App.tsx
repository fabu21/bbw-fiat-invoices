import React from 'react';
import './App.css';
import TypePad from './components/TypePad'
import SetReceiver from './components/SetReceiver'
import { Layout } from 'antd'
import { useParams } from 'react-router-dom'
const { Header, Footer, Content } = Layout;

function App() {
    let { userName } = useParams()

    return (
        <>
            <Layout>
                <Header><img src={require('./assets/Lago_Bitcoin_logo.jpg')} alt="Logo" className='logo'></img></Header>
                <Content>
                    {!userName ?
                        <SetReceiver />
                        :
                        <TypePad />
                    }
                </Content>
                <Footer>Powered by <a href="http://bitcoinlake.io/">bitcoinlake.io</a></Footer>
            </Layout>
        </>
    );
}

export default App;
