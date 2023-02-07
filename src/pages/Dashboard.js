import React, { useState, useEffect } from "react";
import firebaseConfig from "../config/config";
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

const app = initializeApp(firebaseConfig);

const Dashboard = () => {

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
                Swal.fire({
                    title: 'Sign-out successful',
                    text: 'See you',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
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
            <h1 className="text-center mt-3">Welcome</h1>
            <div className="mt-4 card mx-auto text-center" style={{width: '18em'}}>
                <div className="card-body mx-auto">
                <p>Anda Login sebagai: {user.email}</p>
            <button 
            className="mx-auto btn btn_1" 
            onClick={handleSignOut}
            >Sign Out
            </button>
            </div>
            </div>
            
        </>
    )
}

export default Dashboard;