import React, { useState } from 'react';
import './WelcomeScreen.scss';
import { useForm } from "react-hook-form";
import useAuth from '../../hooks/useAuth';
import useApi from '../../hooks/useApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WelcomeScreen = () => {
    const auth = useAuth();
    const api = useApi();
    const [displayCreate, setDisplayCreate] = useState(false);
    const { register, handleSubmit } = useForm();
    const { register: registerCreate, handleSubmit: handleSubmitCreate } = useForm();

    const onSubmit = async ({email, password}) => {
        await auth.login(email, password);
    };
    const onSubmitCreate = async ({email, password, name}) => {
        try {
            await api.post('/api/user', {
                email,
                password,
                name
            })
            toast.success('Utilisateur créé!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch {
            toast.error('Utilisateur déjà existant ou autre erreur !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
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
                            <input type="password" required className="input top" placeholder="Mot de passe" {...register("password")} />
                            <button className="button top">Se connecter</button>
                        </form>
                        <button onClick={() => setDisplayCreate(true)} className="button_secondary top">Créer un compte</button>
                    </>
                : 
                    <>
                        <form className="form" onSubmit={handleSubmitCreate(onSubmitCreate)}>
                            <input type="email" required className="input top" placeholder="Email" {...registerCreate("email")} />
                            <input type="password" required className="input top" placeholder="Mot de passe" {...registerCreate("password")} />
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
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
}

export default WelcomeScreen;