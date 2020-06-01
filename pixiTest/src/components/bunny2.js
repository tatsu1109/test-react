import React, { useState, useReducer } from 'react';
// 設定系はpixijs本体から引っ張ってくる
import { TextStyle } from 'pixi.js';
// componentとして使うものはinletの方から
import { Sprite, Container, useTick } from '@inlet/react-pixi';

// 引数でContainerの配置先やサイズを指定
export const CircleContainer2 = ({ x = 150, y = 150, width = 100, height = 100 }) => {

    const initialState = { x: width / 2, y: height / 2, speed: Math.PI / 30, radius: Math.min(width / 2, height / 2) * 0.8, angleRad: 0 };
    const [state, dispatch] = useReducer(bunnyReducer, initialState);
    let [action, setAction] = useState('plus');

    useTick(delta => {
        // setAction((action === 'plus' && height - 20 > state.y) || (action === 'minus' && -1 * (height - 20) > state.y) ? 'plus' : 'minus');
        dispatch({ type: action });
    });

    return (
        <Container x={x} y={y} width={width} height={height} >
            <Bunny2 x={state.x} y={state.y} rotation={state.angleRad} />
        </Container>
    )
}

export const Bunny2 = props => {
    return (
        <Sprite
            image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png"
            x={props.x}
            y={props.y}
            anchor={0.5}
            angle={props.rotation}
        />)
}

const bunnyReducer = (state, action) => {
    console.log(Math.cos(state.angleRad) * state.radius * state.speed)
    switch (action.type) {
        case 'plus':
            return {
                x: Math.cos(state.angleRad) * state.radius,
                y: Math.sin(state.angleRad) * state.radius,
                speed: state.speed,
                angleRad: state.angleRad + 1,
                radius: state.radius
            };
        default:
            throw new Error();
    }
}
