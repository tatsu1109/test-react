import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";
import "./index.css";
import _ from "lodash";
import Box from "@material-ui/core/Box";
import classNames from "classnames";
// import Game from "./components/Game";

const Game2 = () => {
    let boardNumber: number = 5;
    const [board, setBoard] = useState(
        _.times(boardNumber, xIndex => {
            return Array(boardNumber).fill("");
        })
    );

    const [direction, refDirection, setDirection] = useRefState('right');
    const [head, refHead, setHead] = useRefState({ x: 2, y: 0 });
    const [body, refBody, setBody] = useRefState([{ x: 0, y: 0 }, { x: 1, y: 0 }]);
    const [fruit, refFruit, setFruit] = useRefState({ x: Math.floor(Math.random() * boardNumber), y: Math.floor(Math.random() * boardNumber) });
    const [timerId, timerIdRef, setTimerId] = useRefState(-1);

    useEffect(() => {
        setTimerId(
            setInterval(() => {
                if (refHead.current.x >= boardNumber ||
                    refHead.current.y >= boardNumber ||
                    refBody.current.some((index: any) => index.x === refHead.current.x && index.y === refHead.current.y)) {
                    clearInterval(timerIdRef.current);
                }

                if (_.isEqual(refHead.current, refFruit.current)) {
                    setFruit({ x: Math.floor(Math.random() * boardNumber), y: Math.floor(Math.random() * boardNumber) });
                    setBody([...refBody.current, refHead.current]);
                } else {
                    refBody.current.shift();
                    setBody([...refBody.current, refHead.current]);
                }
                
                setHead({
                    x: refHead.current.x + (refDirection.current === "right" ? 1 : refDirection.current === "left" ? -1 : 0),
                    y: refHead.current.y + (refDirection.current === "bottom" ? 1 : refDirection.current === "top" ? -1 : 0)
                });
            }, 1000)
        );

        const [KEY_LEFT, KEY_UP, KEY_RIGHT, KEY_DOWN] = [37, 38, 39, 40];
        const listener = (event: any) => {
            switch (event.keyCode) {
                case KEY_LEFT:
                    setDirection("left");
                    break;
                case KEY_UP:
                    setDirection("top");
                    break;
                case KEY_RIGHT:
                    setDirection("right");
                    break;
                case KEY_DOWN:
                    setDirection("bottom");
                    break;
            }
        }
        document.addEventListener('keydown', listener)

        return () => {
            document.removeEventListener('keydown', listener)
        }
    }, []);

    return (
        <Box component="span" m={1}>
            <Button>{`Start${head.x}`}</Button>
            {
                board.map((row: string[], rowIndex: number) => {
                    return (
                        <Box key={`Y${rowIndex}`} component="div" m={1}>
                            {row.map((colValue: string, colIndex: number) => {
                                let cellClass = classNames({
                                    'cell': true,
                                    'head': rowIndex === head.y && colIndex === head.x ? true : false,
                                    'body': body.some((index: any) => index.x === colIndex && index.y === rowIndex),
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
                })}
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

ReactDOM.render(<Game2 />, document.getElementById("root"));