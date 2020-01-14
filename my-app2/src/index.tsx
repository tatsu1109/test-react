import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";
import "./index.css";
import _ from "lodash";
import Box from "@material-ui/core/Box";
// import Game from "./components/Game";

const Game2 = () => {
    let boardNumber: number = 10;
    const [board, boardRef, setBoard] = useRefState(
        _.times(boardNumber, xIndex => {
            return Array(boardNumber).fill("");
        })
    );

    const [direction, directionRef, setDirection] = useRefState("right");
    const [head, headRef, setHead] = useRefState({ x: 1, y: 1 });
    //   const [body, setBody] = useState([{ x: 0, y: 1 }]);
    const [fruit, fruitRef, setFruit] = useRefState({ x: 3, y: 3 });
    const [timerId, timerIdRef, setTimerId] = useRefState(-1);

    const currentBoard = board.slice();
    currentBoard[head.y][head.x] = "head";
    // currentBoard[body.y][body.x] = "body";
    currentBoard[fruit.y][fruit.x] = "fruit";
    //   setBoard([...board, ...currentBoard]);
    //   setHead({ x: Math.floor(Math.random() * boardNumber), y: Math.floor(Math.random() * boardNumber) });
    //   console.log(count);
    //   let timerId: any;
    //   const stop = () => {
    //     console.log(timerId);
    //     clearInterval(timerId);
    //   };

    useEffect(() => {
        setTimerId(
            setInterval(() => {
                console.log(`${headRef.current.x}:${boardNumber}`);
                if (headRef.current.x >= boardNumber - 1) {
                    clearInterval(timerIdRef.current);
                } else {
                    setHead({
                        x: headRef.current.x + (directionRef.current === "right" ? 1 : directionRef.current === "left" ? -1 : 0),
                        y: headRef.current.y + (directionRef.current === "bottom" ? 1 : directionRef.current === "top" ? -1 : 0)
                    });
                }
            }, 1000)
        );
    }, []);

    return (
        <Box component="span" m={1}>
            <Button onClick={() => clearInterval(timerId)}>{`Start${head.x}`}</Button>
            {board.map((row: string[], rowIndex: number) => {
                return (
                    <Box key={`Y${rowIndex}`} component="div" m={1}>
                        {row.map((colValue: string, colIndex: number) => {
                            return (
                                <Box key={`X${colIndex}`} className={`cell ${colValue}`} component="span" m={1}>
                                    {`${rowIndex}${colIndex}`}
                                    {/* {colValue ? `${colValue}` : `${rowIndex}${colIndex}`} */}
                                </Box>
                            );
                        })}
                    </Box>
                );
            })}
        </Box>
    );
};

const useRefState = (initialValue: any) => {
    const [state, setState] = useState(initialValue);
    const stateRef = useRef(state);
    useEffect(() => {
        stateRef.current = state;
    }, [state]);
    return [state, stateRef, setState];
};

ReactDOM.render(<Game2 />, document.getElementById("root"));