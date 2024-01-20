import {
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import * as Yup from "yup";
import React, { useState } from "react";
import { useFormik } from "formik";
import { IconBrandGoogleFilled } from "@tabler/icons-react";

import "./index.scss";
import Planner from "../../assets/images/planner.jpg";

import { auth, googleProvider } from "../../firebase";
import { FormValues, LoginPageBodyProps } from "../../interface";

export const Login = () => {
    const [isLoginTrue, setIsLoginTrue] = useState<boolean>(true);

    const formik = useFormik<FormValues>({
        enableReinitialize: true,
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().trim().email().required("Email is required."),
            password: Yup.string().required("Password is required."),
        }),
        onSubmit: (values: FormValues) => {
            if (isLoginTrue) {
                signInWithEmailAndPassword(
                    auth,
                    values?.email,
                    values?.password
                ).catch((error) => {
                    console.error(error);
                });
            } else if (!isLoginTrue) {
                createUserWithEmailAndPassword(
                    auth,
                    values?.email,
                    values?.password
                ).catch((error) => {
                    console.error(error);
                });
            }
        },
    });

    return (
        <div className="login">
            <div className="login_image_container">
                <div className="login_image_container-text">
                    Plan your to-do list
                </div>
                <img src={Planner} alt="" />
            </div>

            <LoginPageBody
                // @ts-expect-error formik issue
                formik={formik}
                isLoginTrue={isLoginTrue}
                setIsLoginTrue={setIsLoginTrue}
            />
        </div>
    );
};

export const LoginPageBody: React.FC<LoginPageBodyProps> = (props) => {
    // @ts-expect-error formik issue
    const { formik, isLoginTrue, setIsLoginTrue } = props;

    const renderLoginPageItems = () => {
        return isLoginTrue;
    };

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
        <div className="login_form_contnainer">
            <header className="login_header">
                <h1>Welcome</h1>

                <h1>
                    {renderLoginPageItems()
                        ? "Sign into your account"
                        : "Create a new account"}
                </h1>
            </header>

            <form className="login_form" onSubmit={formik.handleSubmit}>
                <label htmlFor="email" id="email">
                    {" "}
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    onChange={formik.handleChange}
                    placeholder="Enter your email"
                />
                {formik.touched.email && formik.errors.email ? (
                    <span className="error">{formik.errors.email}</span>
                ) : null}

                <label htmlFor="password" id="password">
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    onChange={formik.handleChange}
                    placeholder="Enter your password"
                />
                {formik.touched.password && formik.errors.password ? (
                    <span className="error">{formik.errors.password}</span>
                ) : null}

                <div className="login_buttons">
                    <button
                        className="login_buttons_sign_up login_buttons_sign_up_hover"
                        type="submit"
                    >
                        {renderLoginPageItems()
                            ? "Login"
                            : "Create your account"}
                    </button>

                    <h3 className="text_or">
                        <span>or</span>
                    </h3>

                    <button
                        onClick={handleSignInWithGoogle}
                        className="login_buttons_sign_up login_buttons_sign_up_hover login_with_google"
                    >
                        <IconBrandGoogleFilled />

                        {renderLoginPageItems()
                            ? "Login in with google"
                            : "Sign in with google"}
                    </button>
                </div>

                <br />
                <hr />

                <div className="login_form_container_new_user">
                    {renderLoginPageItems() ? (
                        <>
                            <span>New user ? Register</span>
                            <button
                                onClick={() => setIsLoginTrue(false)}
                                className="register_here_btn"
                            >
                                here
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setIsLoginTrue(true)}
                            className="go_back_btn"
                        >
                            Go back
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};
