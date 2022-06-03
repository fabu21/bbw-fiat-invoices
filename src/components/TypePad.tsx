import React, { useState, useEffect } from 'react';
import { CaretLeftIcon } from '@bitcoin-design/bitcoin-icons-react/filled'
import { Button, Row, Col, InputNumber, Modal, Alert, Select } from 'antd';
import { getSatsAmount } from '../lib/GetSatsAmount'
import { TypePadButton } from './TypePadButton';
import GetDefaultWallet from "../lib/DefaultBitcoinBeachWallet"
import { InvoiceGenerator } from './InvoiceGenerator';
import { useParams } from 'react-router-dom'
import { AVAILABLE_CURRENCIES } from '../lib/Config';


export default function TypePad() {
    let { userName } = useParams()

    const [fiatValue, setFiatValue] = useState<string>('')
    const [fiat, setFiat] = useState<string>('GTQ')
    const [defaultUserWallet, setDefaultUserWallet] = useState<string>('')
    const [userNotFound, setuserNotFound] = useState<boolean>(false)
    const [satsAmount, setSatsAmount] = useState<number>(0)
    const [loadingSatsAmount, setLoadingSatsAmount] = useState<boolean>(false)

    const addToFiatValue = (amount: string) => {
        setFiatValue(fiatValue + amount.toString())
    }

    const removeFromFiatValue = () => {
        setFiatValue(fiatValue.substring(0, fiatValue.length - 1))
    }

    const getSatsAmountAndLoadToInvoice = () => {
        setLoadingSatsAmount(true)
        getSatsAmount(fiatValue, fiat, function (sats: number) {
            setSatsAmount(sats)
            setLoadingSatsAmount(false)
        })
    }

    const redirectToUsernameSelection = () => {
        window.location.href = '/'
    }

    const availableCurrencies = (
        <Select defaultValue={fiat} options={AVAILABLE_CURRENCIES} onChange={(e) => setFiat(e)}>
        </Select>
    )

    useEffect(() => {
        if (userName)
            GetDefaultWallet(userName)
                .then(result => setDefaultUserWallet(result))
                .catch(result => setuserNotFound(true))
    }, [userName]);

    return (
        <>
            <div className='typePad'>
                <Row>
                    <Col span={21}><InputNumber addonBefore={availableCurrencies} value={fiatValue} size='large'></InputNumber>
                    </Col>
                </Row>
                <Row>
                    <Col span={7}><TypePadButton value='1' onClickCallback={addToFiatValue}></TypePadButton></Col>
                    <Col span={7}><TypePadButton value='2' onClickCallback={addToFiatValue}></TypePadButton></Col>
                    <Col span={7}><TypePadButton value='3' onClickCallback={addToFiatValue}></TypePadButton></Col>
                </Row>
                <Row>
                    <Col span={7}><TypePadButton value='4' onClickCallback={addToFiatValue}></TypePadButton></Col>
                    <Col span={7}><TypePadButton value='5' onClickCallback={addToFiatValue}></TypePadButton></Col>
                    <Col span={7}><TypePadButton value='6' onClickCallback={addToFiatValue}></TypePadButton></Col>
                </Row>
                <Row>
                    <Col span={7}><TypePadButton value='7' onClickCallback={addToFiatValue}></TypePadButton></Col>
                    <Col span={7}><TypePadButton value='8' onClickCallback={addToFiatValue}></TypePadButton></Col>
                    <Col span={7}><TypePadButton value='9' onClickCallback={addToFiatValue}></TypePadButton></Col>
                </Row>
                <Row>
                    <Col span={7}><TypePadButton value='.' onClickCallback={addToFiatValue}></TypePadButton></Col>
                    <Col span={7}><TypePadButton value='0' onClickCallback={addToFiatValue}></TypePadButton></Col>
                    <Col span={7}><Button type='default' size='large' onClick={() => removeFromFiatValue()}> <CaretLeftIcon height={50}></CaretLeftIcon></Button></Col>
                </Row>
                <Row>
                    <Col span={21}>
                        <Button type='default' size='large' loading={defaultUserWallet === "" || loadingSatsAmount} onClick={() => getSatsAmountAndLoadToInvoice()}>Pagar a {userName}</Button>
                    </Col>
                </Row>
            </div>
            <Modal visible={satsAmount > 0} onOk={() => setSatsAmount(0)} onCancel={() => setSatsAmount(0)} destroyOnClose={true} width={340}>
                <div className='invoice'>
                    <div className='invoice__header'>
                        <Row>
                            <Col>{fiat}</Col>
                            <Col offset={1}>{fiatValue}</Col>
                            <Col offset={1}>|</Col>
                            <Col offset={1}>{satsAmount}</Col>
                            <Col offset={1}>sats</Col>
                        </Row>
                    </div>
                    <InvoiceGenerator sats={satsAmount} walletId={defaultUserWallet} onPaymentSuccess={() => setSatsAmount(0)}></InvoiceGenerator>
                </div>
            </Modal>
            <Modal visible={userNotFound} onOk={redirectToUsernameSelection} onCancel={redirectToUsernameSelection} destroyOnClose={true} width={340}>
                <Alert message={`No se ha podido encontrar al usuario ${userName}`} type='error'></Alert>
            </Modal>
        </>
    );
}