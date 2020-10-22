import React, { useState } from "react";
import { authService } from "fbase";

const AuthFrom = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccout, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const onChange = (event) => {
        const {
            target: { name, value },
        } = event;

        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            if (newAccout) {
                //Create new accout
                data = await authService.createUserWithEmailAndPassword(
                    email,
                    password
                );
            } else {
                //log in
                data = await authService.signInWithEmailAndPassword(
                    email,
                    password
                );
            }
            console.log(data);
        } catch (error) {
            setError(error.message);
        }
    };

    const toggleAccount = () => setNewAccount((prev) => !prev);
    return (
        <>
            <form onSubmit={onSubmit} className="container">
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={onChange}
                    className="authInput"
                />
                <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={onChange}
                    className="authInput"
                />
                <input
                    type="submit"
                    className="authInput authSubmit"
                    value={newAccout ? "Create Accout" : "Log In"}
                />
                {error && <span className="authError">{error}</span>}
            </form>
            <span onClick={toggleAccount} className="authSwitch">
                {newAccout ? "Sign In" : "Create Account"}
            </span>
        </>
    );
};
export default AuthFrom;
