import React, { useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithPopup,
    signOut,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";

import { auth, googleProvider } from "../firebase";

interface UserCredentials {
    email: string;
    password: string;
}

const Login = () => {
    const [firebaseUserLoggedInData] = useAuthState(auth);
    const [signOut, signOutLoading] = useSignOut(auth);

    const [userCredentials, setUserCredentials] = useState<UserCredentials>({
        email: "",
        password: "",
    });

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserCredentials({
            ...userCredentials,
            email: e.target.value,
        });
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserCredentials({
            ...userCredentials,
            password: e.target.value,
        });
    };

    const handleFormSubmit = () => {
        try {
            signInWithEmailAndPassword(
                auth,
                userCredentials?.email,
                userCredentials?.password
            ).catch((error) => {
                console.error(error);
            });
        } catch (error) {
            console.error(error);
        }
    };

    // const handleFormSubmit = async () => {
    //   try {
    //     createUserWithEmailAndPassword(
    //       auth,
    //       userCredentials?.email,
    //       userCredentials?.password
    //     );
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };

    const handleSignInWithGoogle = () => {
        try {
            signInWithPopup(auth, googleProvider).catch((error) => {
                console.error(error);
            });
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div>
            <h3>
                {firebaseUserLoggedInData?.displayName ||
                    firebaseUserLoggedInData?.email}{" "}
                {firebaseUserLoggedInData && `is logged in currently.`}
            </h3>
            {firebaseUserLoggedInData ? (
                <button onClick={() => signOut()}> Log out</button>
            ) : (
                <>
                    <label htmlFor="email"> Email</label>
                    <input type="email" onChange={handleEmailChange} />
                    <br />
                    <br />
                    <label htmlFor="password"> Password</label>
                    <input type="password" onChange={handlePasswordChange} />
                    <br />
                    <br />
                    <button onClick={handleFormSubmit}>
                        {" "}
                        Login / Create an account
                    </button>
                    <br />
                    <br />
                    <button onClick={handleSignInWithGoogle}>
                        {" "}
                        Sign in with google
                    </button>
                    <br />
                    <br />
                    <br />
                </>
            )}
            {signOutLoading && <h3>Signing out</h3>}
        </div>
    );
};

export default Login;
