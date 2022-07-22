import React, { useState } from 'react'
import { useEffect } from 'react'

const Home = () => {
    const [user, setUser] = useState({});
    useEffect(() => {
        const user_tmp = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : {}
        setUser(user_tmp);
        console.log(user);
    }, [])

    return (
        <div className="user-container">
            {!user ? 'No user'
                : <div>
                    <div>{user.firstName}</div>
                    <div>{user.lastName}</div>
                    <div>{user.birthday}</div>
                    <div>{user.phoneNumber}</div>
                    <div>{user.gender}</div>
                </div>}
        </div>
    )
}

export default Home