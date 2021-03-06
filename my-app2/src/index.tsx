import React, { useState, useEffect, useRef, useReducer } from "react";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";
import "./index.css";
import _ from "lodash";
import Box from "@material-ui/core/Box";
import classNames from "classnames";
// import Game from "./components/Game";

interface square {
    x: number,
    y: number
}


// type snakeState = {
//     head: square,
//     body: square[]
// };

// type snakeAction = {
//     type: "move" | "glow";
// };


const Game2 = () => {
    let boardNumber: number = 5;

    const [direction, refDirection, setDirection] = useRefState('right');
    // const [head, refHead, setHead] = useRefState({ x: 2, y: 0 });
    // const [body, refBody, setBody] = useRefState([{ x: 0, y: 0 }, { x: 1, y: 0 }]);
    const [fruit, refFruit, setFruit] = useRefState(randomCoordinate(boardNumber));
    const [timerId, timerIdRef, setTimerId] = useRefState(-1);

    const snakeReducer = (state: any, action: any) => {
        if (action.type === "move") {
            let currentBody = _.cloneDeep(state.body);
            currentBody.shift();
            return {
                ...state,
                head: {
                    x: state.head.x + (refDirection.current === "right" ? 1 : refDirection.current === "left" ? -1 : 0),
                    y: state.head.y + (refDirection.current === "bottom" ? 1 : refDirection.current === "top" ? -1 : 0)
                },
                body: [...currentBody, state.head]
            }
        } else if (action.type === "glow") {
            return {
                ...state,
                head: {
                    x: state.head.x + (refDirection.current === "right" ? 1 : refDirection.current === "left" ? -1 : 0),
                    y: state.head.y + (refDirection.current === "bottom" ? 1 : refDirection.current === "top" ? -1 : 0)
                },
                body: [...state.body, state.head]
            }
        }
    }

    const snakeInitialState = {
        head: { x: 2, y: 0 },
        body: [{ x: 0, y: 0 }, { x: 1, y: 0 }]
    };

    const [currentSnakeState, snakeDispatch] = useReducer(snakeReducer, snakeInitialState);

    const start = () => {
        setTimerId(
            setInterval(() => {
                //TODO 衝突判定をreducerの中に移す？
                if (currentSnakeState.head.x >= boardNumber || currentSnakeState.head.x < 0 ||
                    currentSnakeState.head.y >= boardNumber || currentSnakeState.head.y < 0 ||
                    currentSnakeState.body.some((index: any) => index.x === currentSnakeState.head.x && index.y === currentSnakeState.head.y)) {
                    clearInterval(timerIdRef.current);
                    if (window.confirm('Restart?')) {
                        start();
                    }
                } else {

                }
                if (_.isEqual(currentSnakeState.head, refFruit.current)) {
                    setFruit(randomCoordinate(boardNumber));
                    snakeDispatch({ type: "glow" });
                } else {
                    snakeDispatch({ type: "move" });
                }
            }, 1000)
        );
    }

    useEffect(() => {
        start();
    }, []);

    useEffect(() => {
        const listener = (event: any) => {
            switch (event.keyCode) {
                case 37:
                    if (refDirection.current !== "right") {
                        setDirection("left");
                    }
                    break;
                case 38:
                    if (refDirection.current !== "bottom") {
                        setDirection("top");
                    }
                    break;
                case 39:
                    if (refDirection.current !== "left") {
                        setDirection("right");
                    }
                    break;
                case 40:
                    if (refDirection.current !== "top") {
                        setDirection("bottom");
                    }
                    break;
            }
        }
        document.addEventListener('keydown', listener)

        return () => {
            document.removeEventListener('keydown', listener)
        }
    }, [direction]);

    return (
        <Box component="span" m={1}>
            <Button onClick={start}>{`Reset`}</Button>
            {
                _.times(boardNumber, xIndex => Array(boardNumber).fill(""))
                    .map((row: string[], rowIndex: number) => {
                        return (
                            <Box key={`Y${rowIndex}`} component="div" m={1}>
                                {row.map((colValue: string, colIndex: number) => {
                                    let cellClass = classNames({
                                        'cell': true,
                                        'head': rowIndex === currentSnakeState.head.y && colIndex === currentSnakeState.head.x ? true : false,
                                        'body': currentSnakeState.body.some((index: any) => index.x === colIndex && index.y === rowIndex),
                                        'fruit': rowIndex === fruit.y && colIndex === fruit.x ? true : false
                                    });
                                    return (
                                        <Box key={`X${colIndex}`} className={cellClass} component="span" m={1}>
                                            {`${rowIndex}${colIndex}`}
                                        </Box>
                                    );
                                })}
                            </Box>
                        );
                    })
            }
        </Box>
    );
};

// useEffect内では第二引数に[]を指定しており、最初の一度しか呼ばれないため更新後のstateを利用するため、useRefを使用する必要がある
// https://qiita.com/hatakoya/items/6bd529df9b38a0a6f8ed
// 同一stateを更新するのみであれば引数に関数を渡すことで対応できる
const useRefState = (initialValue: any) => {
    const [state, setState] = useState(initialValue);
    const stateRef = useRef(state);
    useEffect(() => {
        stateRef.current = state;
    }, [state]);
    return [state, stateRef, setState];
};

const randomCoordinate = (squareNumber: number) => {
    return { x: Math.floor(Math.random() * squareNumber), y: Math.floor(Math.random() * squareNumber) };
}

ReactDOM.render(<Game2 />, document.getElementById("root"));