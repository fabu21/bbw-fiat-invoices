import React from 'react';
import { Button} from 'antd';

interface TypePadButtonProbs {
    value: string
    onClickCallback: CallableFunction
}

export function TypePadButton(props:TypePadButtonProbs ) { 
    return <Button type='default' size='large' onClick={() => props.onClickCallback(props.value)}>{props.value}</Button>
}
