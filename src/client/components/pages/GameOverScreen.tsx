import React, { useEffect, useState } from 'react';
import './GameOverScreen.scss';
import { useDispatch } from "react-redux";
import { clearGameOver } from '../../store/activeGameOver/actions';
import useAuth from "../../hooks/useAuth";
import useApi from "../../hooks/useApi";
import {
    FacebookShareButton,
    TwitterShareButton,
    FacebookIcon,
    TwitterIcon,
} from "react-share";

const GameOverScreen = ({points, highScore}) => {
    const [highScoreDb, setHighScoreDb] = useState(0);
    const api = useApi();
    const dispatch = useDispatch();
    const auth = useAuth();

    useEffect(() => {
        const start = async () => {
            const getData = await api.get('/api/user/highScore');
            setHighScoreDb(getData.data)
        }
        start();
    }, [])
    const handleClick = () => {
        dispatch(clearGameOver());
    }

    const handleDisco = () => {
        auth.logout();
    }

    return (
        <>
            <h1 className="h1 center_game_over">GAME OVER</h1>
            <p className="p center_game_over">Vous avez eu {points} point(s)</p>
            <p className="p center_game_over">Votre meilleur score cette session est de {highScore} point(s)</p>
            <p className="p center_game_over">Votre meilleur score enregistré est de {highScoreDb} point(s)</p>
            <div className="center_game_over margin_top"> 
                <button onClick={handleClick} className="button">Refaire le Quizz</button>
                <button onClick={handleDisco} className="button margin_top">Se déconnecter</button>
            </div>
            <div className="center_game_over margin_top">
                <FacebookShareButton url="https://hubvisory.com/"><FacebookIcon size={32} round={true} /></FacebookShareButton>
                <TwitterShareButton url="https://hubvisory.com/"><TwitterIcon size={32} round={true} /></TwitterShareButton>
            </div>
        </>
    );
}

export default GameOverScreen;