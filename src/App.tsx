import React from 'react';
import './App.css';
import TypePad from './components/TypePad'
import SetReceiver from './components/SetReceiver'
import { Layout } from 'antd'
import { GithubOutlined } from '@ant-design/icons'
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
                <Footer>Powered by <a href="http://bitcoinlake.io/" target="_blank">bitcoinlake.io</a> <a href="https://github.com/fabu21/bbw-fiat-invoices" target="_blank"><GithubOutlined /></a></Footer>
            </Layout>
        </>
    );
}

export default App;
