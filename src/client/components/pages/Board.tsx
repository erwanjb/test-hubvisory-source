import React, { useState, useEffect } from 'react';
import './Board.scss';
import ContentLoader from "react-content-loader";
import useApi from '../../hooks/useApi';
import { useDispatch } from "react-redux";
import { setGameOver } from "../../store/activeGameOver/actions";
import useAuth from "../../hooks/useAuth";

const Board = () => {
    const api = useApi();
    const dispatch = useDispatch();
    const [pending, setPending] = useState(true);
    const [reload, setReload] = useState(false);
    const [actor, setActor] = useState(null);
    const [movie, setMovie] = useState(null);
    const [points, setPoints] = useState(0);

    const auth = useAuth();

    const handleDisco = () => {
        auth.logout();
    }

    useEffect(() => {
        setPending(true);
        api.get('/api/theMovieDB/getActorAndMovieRandom').then(res => {
            setActor((res.data as any).actor);
            setMovie((res.data as any).movie);
            setPoints((res.data as any).points);
        })
    }, [reload]);

    useEffect(() => {
        if (actor && movie) {
            setPending(false);
        }
    }, [actor, movie]);

    const [activeRight, setActiveRight] = useState(false);
    const [activeLeft, setActiveLeft] = useState(false);
    const [moveRight, setMoveRight] = useState(null);
    const [moveLeft, setMoveLeft] = useState(null);

    const getAndHandleResponse = async (response: boolean) => {
        const getResponse = await api.post('/api/theMovieDB/verifyResponse', {response});
        const responseSend = getResponse.data.response;
        if (responseSend) {
            setReload(!reload);
        } else {
            dispatch(setGameOver((getResponse.data as any).points, (getResponse.data as any).highScore))
        }
    }

    const handleClickRight = (response: boolean) => {
        if (!activeRight) {
            setActiveRight(true);
            setMoveRight(true);
            getAndHandleResponse(response);
            setTimeout(() => {
                setMoveRight(false)
                setActiveRight(false);
            }, 1000);
        }
    };

    const handleClickLeft = (response: boolean) => {
        if (!activeLeft) {
            setActiveLeft(true);
            setMoveLeft(true);
            getAndHandleResponse(response);
            setTimeout(() => {
                setMoveLeft(false);
                setActiveLeft(false);
            }, 1000);
        }
    };

    return (
        <>
            <h1 className="h1 center">Quizz</h1>
            <p className="p center">points : {points}</p>
            {pending ?
                <div className="contentImg">
                    <div className="img">
                        <ContentLoader
                            speed={2}
                            width={200}
                            height={200}
                            viewBox="0 0 200 200"
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb"
                        >
                            <rect x="0" y="0" rx="3" ry="3" width="200" height="200" />
                        </ContentLoader>
                    </div>
                    <div className="img left">
                        <ContentLoader
                            speed={2}
                            width={200}
                            height={200}
                            viewBox="0 0 200 200"
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb"
                        >
                            <rect x="0" y="0" rx="3" ry="3" width="200" height="200" />
                        </ContentLoader>
                    </div>
                </div>
                :
                <div className="contentImg">
                    <div className="img" style={{ backgroundImage: `url("https://image.tmdb.org/t/p/original/${actor.picture}")` }}></div>
                    <div className="img left" style={{ backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.picture}")` }}></div>
                </div>
            }
            {pending ?
                <div className="contentQuestion">
                    <ContentLoader
                        speed={2}
                        width={200}
                        height={50}
                        viewBox="0 0 200 50"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                    >
                        <rect x="0" y="0" rx="3" ry="3" width="200" height="50" />
                    </ContentLoader>
                </div> :
                <p className="p center">Est ce que {actor.name} a joué dans {movie.title} ?</p>
            }
            <div className="content_response">
                <span onClick={handleClickLeft.bind(null, true)} className={`response ${activeLeft ? 'oui_move' : 'oui'}`}>OUI</span>
                <span onClick={handleClickRight.bind(null, false)} className={`response ${activeRight ? 'non_move' : 'non'}`}>NON</span>
            </div>
            <div className="center_board margin_top_board"> 
                <button onClick={handleDisco} className="button">Se déconnecter</button>
            </div>
        </>
    );
}

export default Board