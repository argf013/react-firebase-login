import React from "react";
import { Link } from "react-router-dom";

const NoPage = () => {
    return (
        <>
        <h1 className="text-center mt-4">404 Not Found</h1>
        <div className="container mx-auto text-center">
            <Link to= '/dashboard'>
                Back to home
            </Link>
        </div>
        
        </>
    )
}

export default NoPage;