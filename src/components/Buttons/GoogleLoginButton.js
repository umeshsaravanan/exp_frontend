import React, { useState } from "react";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import Button from "./Button";
import { useContextApi } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import ButtonLoader from "../Loaders/ButtonLoader";
import { useAxiosInstance } from "../../contexts/AxiosContext";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const GoogleLogin = () => {
    const [isLoading, setIsLoading] = useState(false);

    const { setErrorCallback, setUserCallback } = useContextApi();
    const { axiosInstance } = useAxiosInstance();
    const navigate = useNavigate();

    const login = useGoogleLogin({
        onSuccess: async (response) => {
            try {
                setIsLoading(true);
                const { data } = await axiosInstance.post(`/google`,{ token: response.access_token });

                if (data.jwtToken && data.userId) {
                    document.cookie = `jwtToken=${data.jwtToken}; Path=/; Secure; SameSite=None; Max-Age=${3600 * 1000}`;
                    document.cookie = `userId=${data.userId}; Path=/; Secure; SameSite=None; Max-Age=${3600 * 1000}`;
                    setUserCallback({name : data?.userName, email: data?.userMail});
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