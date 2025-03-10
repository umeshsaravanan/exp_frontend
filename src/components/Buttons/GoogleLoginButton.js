import React from "react";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import Button from "./Button";
import axios from "axios";
import { useContextApi } from "../../contexts/AuthContext";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const GoogleLogin = () => {
    const { setErrorCallback } = useContextApi();
    const login = useGoogleLogin({
        onSuccess: async (response) => {
            try {
                // const { data } =
                 await axios.post(
                    'http://localhost:8080/api/google',
                    { token: response.access_token },
                    { headers: { "Content-Type": "application/json" } }
                );
            } catch (error) {
                console.error("Error during login:", error);
                setErrorCallback("Something went wrong. Please try again later.");
            } finally {
            }
        },
        onError: (error) => {
            console.error({ Login_Failed: error });
            setErrorCallback("Login failed. Please try again.");
        },
        scope: "openid email profile",
        flow: "implicit",
    });

    return (
        <Button
            type="google"
            onClick={login}
        >
            <>
                <FcGoogle className="text-xl bg-white rounded-full" />
                <span>Continue With Google</span>
            </>
        </Button>
    );
};

const GoogleLoginButton = () => {
    return (
        <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin />
        </GoogleOAuthProvider>
    );
};

export default GoogleLoginButton;