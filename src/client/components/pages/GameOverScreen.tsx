import React from 'react';
import './GameOverScreen';
import { useDispatch } from "react-redux";
import { clearGameOver } from "../../store/activeGameOver/actions";

const GameOverScreen = ({points, highScore}) => {
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(clearGameOver())
    }
    return (
        <>
            <h1 className="h1">GAME OVER</h1>
            <button onClick={handleClick} className="button">Refaire le Quizz</button>
        </>
    );
}

export default GameOverScreen;