import React, { useState, useReducer } from 'react';
// 設定系はpixijs本体から引っ張ってくる
// import { TextStyle } from 'pixi.js';
// componentとして使うものはinletの方から
import { Sprite, Container, useTick } from '@inlet/react-pixi';

// 引数でContainerの配置先やサイズを指定
export const CircleContainer = ({ x = 150, y = 150, width = 100, height = 100 }) => (
    <Container x={x} y={y} width={width} height={height} >
        <Bunny />
    </Container>
)

const Bunny = () => {
    // states
    const initialState = { angleRad: 1, speed: 1, radius: 100 };
    const [state, dispatch] = useReducer(circulateReducer, initialState);
    const [bound, setBound] = useState(getRand(state.radius, -1 * state.radius));
    const [action, setAction] = useState('clockwise');
    // const [rotation, setRotation] = useState(0);

    // custom ticker
    useTick(delta => {
        if (action === "clockwise" && 0 < Math.round(state.x) && 0 < Math.round(state.y)) {
            setAction("counterclockwise")
            setBound(getRand(state.radius, -1 * state.radius))
        } else if (action === "counterclockwise" && 0 > Math.round(state.x) && 0 < Math.round(state.y)) {
            setAction("clockwise")
            setBound(getRand(state.radius, -1 * state.radius));
        }
        dispatch({ type: action });
        // setRotation(-10 + Math.sin(rotation / 10 + Math.PI * 2) * 10);
    });

    return (
        <Sprite
            image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png"
            anchor={0.5}
            x={state.x}
            y={state.y}
        // rotation={rotation}
        />
    );
}

const circulateReducer = (state, action) => {
    // console.log(state)
    switch (action.type) {
        case 'clockwise':
            return {
                speed: state.speed,
                radius: state.radius,
                angleRad: state.angleRad + (state.speed * Math.PI / 180),
                x: Math.cos(state.angleRad) * state.radius,
                y: Math.sin(state.angleRad) * state.radius,
            };
        case 'counterclockwise':
            return {
                speed: state.speed,
                radius: state.radius,
                angleRad: state.angleRad - (state.speed * Math.PI / 180),
                x: Math.cos(state.angleRad) * state.radius,
                y: Math.sin(state.angleRad) * state.radius,
            };
        default:
            throw new Error();
    }
}

const getRand = (max, min) => {
    return Math.round(Math.random() * max - min) + min;
}
