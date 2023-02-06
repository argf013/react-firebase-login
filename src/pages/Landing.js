import React, { useState, useEffect } from "react";
import firebaseConfig from "../config/config";
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const app = initializeApp(firebaseConfig);

const Landing = () => {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth(app);
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                navigate('/');
                console.log('u must login first')
            } else {
                setUser(currentUser);
            }
        });
        return () => unsubscribe();
    }, [navigate])
    const handleSignOut = () => {
        const auth = getAuth(app);
        signOut(auth)
            .then(() => {
                console.log("Sign-out successful");
                navigate('/');
            })
            .catch((error) => {
                console.error(error.message);
            });
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <h1>Welcome</h1>
            <button onClick={handleSignOut}>Sign Out</button>
        </>
    )
}

export default Landing;