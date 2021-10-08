import React from 'react';
import WelcomeScreen from './components/pages/WelcomeScreen';
import Board from './components/pages/Board';
import GameOverScreen from './components/pages/GameOverScreen';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import './App.css';
import useAuth from "./hooks/useAuth";
import useActiveGameOver from "./hooks/useActiveGameOver";

const ConnexionRoute = ({...props}) => {
    const auth = useAuth();
    return  auth.isLogged ? <Redirect to={'/board'} /> : <Route {...props} />;
  }

  const BoardRoute = ({...props}) => {
    const auth = useAuth();
    const activeGameOver = useActiveGameOver();
    return  (!auth.isLogged ? <Redirect to='/' />  : (activeGameOver ? <Redirect to='/gameover' /> : <Route {...props} component={Board} />));
  }

  const GameOverRoute = ({...props}) => {
    const auth = useAuth();
    const activeGameOver = useActiveGameOver();
    console.log(activeGameOver)
    return  (!auth.isLogged ? <Redirect to='/' />  : (!activeGameOver ? <Redirect to='/board' /> : <Route {...props} component={GameOverScreen.bind(null, {points: activeGameOver.points, highScore: activeGameOver.highScore})} />));
  }

const App = () => {
    return(
        <Router>
            <Switch>
                <ConnexionRoute exact path="/" component={WelcomeScreen} />
                <BoardRoute exact path="/board" component={Board} />
                <GameOverRoute exact path="/gameover" component={GameOverScreen} />
            </Switch>
        </Router>
    );
};

export default App;