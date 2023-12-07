import React, { useState } from "react";
import { useNavigate } from "react-router";
import ButtonComponent from "../components/form/button";
import NavbarComponent from "../components/navbar";
export default function Login() {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const navigate = useNavigate();

    async function loginUser(credentials) {
        return fetch(process.env.REACT_APP_BACKEND_SERVER+'/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
            .then(data => data.json())
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const response = await loginUser({
            "userName":username,
            "userPassword":password
        });
        if (response.token) {
            sessionStorage.setItem('token', response.token);

            setError('');
            //navigate('/home');
        }
        else{
            setError(response.error);
        }
    }
    return (
        <div>
            <NavbarComponent/>
            <div className="Auth-form-container">
                <div className="Auth-form">
                    <form onSubmit={handleSubmit}>
                        <div className="Auth-form-content">
                            <h3 className="Auth-form-title">Sign In</h3>
                            <div className="form-group mt-3">
                                <label>Email username</label>
                                <input
                                    type="text"
                                    className="form-control mt-1"
                                    placeholder="Enter username"
                                    onChange={e => setUserName(e.target.value)}
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control mt-1"
                                    placeholder="Enter password"
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="d-grid gap-2 mt-3">
                                <ButtonComponent text="Submit" class="btn btn-primary" type="submit" />
                            </div>
                        </div>
                    </form>
                    {error ?
                        <div className="d-flex justify-content-center text-danger">{error}</div>
                        : ""
                    }
                </div>
            </div>
        </div>
    );
}