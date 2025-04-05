import React, { useState } from "react";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import Button from "./Button";
import axios from "axios";
import { useContextApi } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import ButtonLoader from "../Loaders/ButtonLoader";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const GoogleLogin = () => {
    const [isLoading, setIsLoading] = useState(false);

    const { setErrorCallback } = useContextApi();
    const navigate = useNavigate();

    const login = useGoogleLogin({
        onSuccess: async (response) => {
            try {
                setIsLoading(true);
                const { data } = await axios.post(
                    'http://localhost:8080/api/google',
                    { token: response.access_token },
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true
                    }
                );

                if (data.jwtToken && data.userId) {
                    document.cookie = `jwtToken=${data.jwtToken}; Path=/; Secure; SameSite=None; Max-Age=${3600 * 1000}`;
                    document.cookie = `userId=${data.userId}; Path=/; Secure; SameSite=None; Max-Age=${3600 * 1000}`;
                    navigate("/");
                }
            } catch (error) {
                console.error("Error during login:", error);
                setErrorCallback("Something went wrong. Please try again later.");
            } finally {
                setIsLoading(false);
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
            {isLoading ? <ButtonLoader /> :
                <>
                    <FcGoogle className="text-xl bg-white rounded-full" />
                    <span>Continue With Google</span>
                </>
            }
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