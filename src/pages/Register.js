import React, { useState, useEffect } from "react";
import { onAuthStateChanged, getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import firebaseConfig from "../config/config";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const app = initializeApp(firebaseConfig);
const Regist = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth(app);
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                navigate('/dashboard');
                console.log('Cant go there man')
            } else {
                setUser(!currentUser);
            }
        });
        return () => unsubscribe();
    }, [navigate])

    const handleSubmit = (e) => {
        e.preventDefault();

        const auth = getAuth(app);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential.user);
                Swal.fire({
                    title: 'Register Success',
                    text: 'Welcome.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                navigate('/');
            })
            .catch((error) => {
                console.error(error.message);
                Swal.fire({
                    title: 'Login failed',
                    text: error,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <h2 className="text-center mt-4">Register Page</h2>
            <form style={{ width: '18em' }}
                className="card mx-auto mt-4"
                onSubmit={handleSubmit}>
                <div className="card-body">
                    <input className="form-control mb-3"
                        type="email"
                        placeholder="Email"
                        autoComplete="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input className="form-control mb-3"
                        type="password"
                        autoComplete="current-password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="btn btn_1" 
                    style={{width: '16em'}}
                    type="submit">Sign up</button>
                    <h6 className="mt-3">
                    Already have an account? <Link to="/">Login</Link>
                    </h6>
                </div>
            </form>
        </>
    );
};

export default Regist;
