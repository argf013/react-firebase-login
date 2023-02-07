/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from "react";
import { onAuthStateChanged, getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import firebaseConfig from "../config/config";
import { Link, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
const app = initializeApp(firebaseConfig);

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const auth = getAuth(app);

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential.user);
                setLoading(false);
                Swal.fire({
                    title: 'Login Succes',
                    text: 'Welcome.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                navigate('/dashboard');
            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    title: 'Login failed',
                    text: error,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                setLoading(false);
            });
    };

    const handleForgotPassword = (e) => {
        e.preventDefault();
        const auth = getAuth(app);

        sendPasswordResetEmail(auth, email)
            .then(() => {
                Swal.fire({
                    title: 'Email Sent',
                    text: 'Please check your email for password reset instructions.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    title: 'Failed to send email',
                    text: error,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    };

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        const auth = getAuth(app);
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                navigate('/dashboard');
            } else {
                setUser(!currentUser);
            }
        });
        return () => unsubscribe();
    }, [navigate])

    if (!user) {
        return <div>Loading...</div>;
    }


    return (
        <>
            <h2 className="text-center mt-4">Login Page</h2>
            <form className="card mx-auto mt-4" style={{ width: '20em' }} onSubmit={handleSubmit}>
                <div className="card-body text-center">
                    <input
                        className="form-control mb-3"
                        type="email"
                        autoComplete="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <div className="input-group mb-4">
                        <input
                            className="form-control"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />

                        <button 
                        type="button" 
                        className="btn btn-outline-secondary"
                        onClick={togglePasswordVisibility}>
                            {showPassword ? "hide" : "show"}
                        </button>
                    </div>
                    
                    
                    <button
                        style={{ width: '18em' }}
                        className="btn btn_1 mt-2 mx-auto text-center"
                        type="submit"
                        disabled={loading}>
                        {loading ? 'Loading...' : 'Login'}
                    </button>
                    <br />
                    <button 
                    className="btn btn-outline-secondary mt-3" 
                    style={{ width: '18em' }} 
                    onClick={handleForgotPassword}>Forgot Password?</button>

                    <h6 className="mt-3 mx-auto">
                        Don't have an account? <br /><Link to="/regist">Register here</Link>
                    </h6>

                </div>
            </form>
        </>
    );
};

export default Login;
