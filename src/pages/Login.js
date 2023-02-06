/* eslint-disable no-restricted-globals */
import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import firebaseConfig from "../config/config";
import { Link, useNavigate } from 'react-router-dom';

const app = initializeApp(firebaseConfig);

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential.user);
                navigate('/landing');
            })
            .catch((error) => {
                console.error(error.message);
            });
    };

    return (
        <>
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
            <button><Link to="/regist">Regist</Link></button>
            
        </form>
        </>
    );
};

export default Login;