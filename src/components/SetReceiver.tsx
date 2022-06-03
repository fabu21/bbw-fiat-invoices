import React, { useState } from 'react';
import { Button, Input, Row, Col } from 'antd'
import { useNavigate } from "react-router-dom";

export default function SetReceiver() {
    let navigate = useNavigate();
    const [username, setUsername] = useState<string>("")

    const redirectToTypePad = function () {
        navigate(`${username}`, { replace: true });
    }

    return (
        <>
            <Row className='typePad'>
                <Col span={21}>
                    <Input placeholder='pagar a quien? (Nombre de usuario en Bitcoin Beach Wallet)' value={username} onChange={e => setUsername(e.target.value)} size={'large'} onPressEnter={redirectToTypePad}></Input>
                    <Button onClick={redirectToTypePad} size={'large'}>OK</Button>
                </Col>
            </Row>
        </>
    )
}
