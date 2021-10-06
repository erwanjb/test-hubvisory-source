import React, { useState } from 'react';
import './WelcomeScreen.scss';
import { useForm } from "react-hook-form";

const WelcomeScreen = () => {
    const [displayCreate, setDisplayCreate] = useState(false);
    const { register, handleSubmit } = useForm();
    const { register: registerCreate, handleSubmit: handleSubmitCreate } = useForm();

    const onSubmit = async ({email, password}) => {

    };
    const onSubmitCreate = async ({email, password, name}) => {

    };
    return (
        <>
            <div className="center">
                <img className="logo" src="/imgs/logo.svg" alt="hubvisory logo" />
            </div>
            <h1 className="h1 center">Bienvenue au Quizz HubviMovies</h1>
            <p className="p center">Pour jouer au Quizz il faut vous connecter</p>
            <h2 className="h2 center">{!displayCreate ? 'Se connecter' : 'Créer un compte'}</h2>
            <div className="content">
                {
                !displayCreate ?
                    <>
                        <form className="form" onSubmit={handleSubmit(onSubmit)}>
                            <input type="email" required className="input top" placeholder="Email" {...register("email")} />
                            <input type="text" required className="input top" placeholder="Mot de passe" {...register("password")} />
                            <button className="button top">Se connecter</button>
                        </form>
                        <button onClick={() => setDisplayCreate(true)} className="button_secondary top">Créer un compte</button>
                    </>
                : 
                    <>
                        <form className="form" onSubmit={handleSubmitCreate(onSubmitCreate)}>
                            <input type="email" required className="input top" placeholder="Email" {...registerCreate("email")} />
                            <input type="text" required className="input top" placeholder="Mot de passe" {...registerCreate("password")} />
                            <input type="text" required className="input top" placeholder="Nom ou pseudo" {...registerCreate("name")} />
                            <button className="button top">Créer un compte</button>
                        </form>
                        <button onClick={() => setDisplayCreate(false)} className="button_secondary top">Se connecter</button>
                    </>
                }
            </div>
            <div className="center top">
                <img className="movie" src="/imgs/movie.png" alt="movie logo" />
            </div>
        </>
    );
}

export default WelcomeScreen;