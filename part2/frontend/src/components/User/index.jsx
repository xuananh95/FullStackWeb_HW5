import React from 'react'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const User = () => {
    const navigate = useNavigate();
    const initialUser = {
        firstName: "",
        lastName: "",
        birthday: "",
        gender: "male",
        email: "",
        phoneNumber: "",
    };
    const [user, setUser] = useState(initialUser);
    const handleSubmit = (e) => {
        e.preventDefault();
        fetchAPI();
    };
    const [errors, setErrors] = useState(null);

    const fetchAPI = async () => {
        const response = await fetch("http://localhost:5000/api/user", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        if (response.status === 400) {
            const returnedErrors = await response.json();
            setErrors(returnedErrors);
        }
        else {
            const users = await response.json();
            localStorage.setItem('users', JSON.stringify(users))
            navigate("/home");
        }
    };
    return (
        <form className="user-form" onSubmit={handleSubmit}>
            <h2>Registration Form</h2>
            <div className="element-container">
                <div className="element">
                    <label>First Name</label>
                    <input
                        type="text"
                        value={user.firstName}
                        onChange={(e) =>
                            setUser({ ...user, firstName: e.target.value })
                        }
                    />
                    {errors &&
                        errors.details.some(
                            (el) => el.path[0] === "firstName"
                        ) && (
                            <p className="error-message">
                                {
                                    errors.details.find(
                                        (el) => el.path[0] === "firstName"
                                    ).message
                                }
                            </p>
                        )}
                </div>
                <div className="element">
                    <label>Last Name</label>
                    <input
                        type="text"
                        value={user.lastName}
                        onChange={(e) =>
                            setUser({ ...user, lastName: e.target.value })
                        }
                    />
                    {errors &&
                        errors.details.some(
                            (el) => el.path[0] === "lastName"
                        ) && (
                            <p className="error-message">
                                {
                                    errors.details.find(
                                        (el) => el.path[0] === "lastName"
                                    ).message
                                }
                            </p>
                        )}
                </div>
                <div className="element">
                    <label>Birthday</label>
                    <input
                        type="text"
                        value={user.birthday}
                        onChange={(e) =>
                            setUser({ ...user, birthday: e.target.value })
                        }
                    />
                    {errors &&
                        errors.details.some(
                            (el) => el.path[0] === "birthday"
                        ) && (
                            <p className="error-message">
                                {
                                    errors.details.find(
                                        (el) => el.path[0] === "birthday"
                                    ).message
                                }
                            </p>
                        )}
                </div>
                <div className="element">
                    <label>Gender</label>
                    <select>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    {errors &&
                        errors.details.some(
                            (el) => el.path[0] === "gender"
                        ) && (
                            <p className="error-message">
                                {
                                    errors.details.find(
                                        (el) => el.path[0] === "gender"
                                    ).message
                                }
                            </p>
                        )}
                </div>
                <div className="element">
                    <label>Email</label>
                    <input
                        type="text"
                        value={user.email}
                        onChange={(e) =>
                            setUser({ ...user, email: e.target.value })
                        }
                    />
                    {errors &&
                        errors.details.some(
                            (el) => el.path[0] === "email"
                        ) && (
                            <p className="error-message">
                                {
                                    errors.details.find(
                                        (el) => el.path[0] === "email"
                                    ).message
                                }
                            </p>
                        )}
                </div>
                <div className="element">
                    <label>Phone number</label>
                    <input
                        type="text"
                        value={user.phoneNumber}
                        onChange={(e) =>
                            setUser({
                                ...user,
                                phoneNumber: e.target.value,
                            })
                        }
                    />
                    {errors &&
                        errors.details.some(
                            (el) => el.path[0] === "phoneNumber"
                        ) && (
                            <p className="error-message">
                                {
                                    errors.details.find(
                                        (el) => el.path[0] === "phoneNumber"
                                    ).message
                                }
                            </p>
                        )}
                </div>
            </div>

            <button type="submit" className="submit-btn">
                Submit
            </button>
        </form>
    );
}

export default User