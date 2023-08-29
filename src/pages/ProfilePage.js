import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import userService from '../services/user.service';
import { Avatar } from "@material-tailwind/react";
import "./ProfilePage.css"

const ProfilePage = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        userService.getProfile()
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    if (!user) {
        return (
            <div className='spinner-container'>
                <Spinner className="h-12 w-12" />
            </div>
        )
    }

return (
    <div>
        <div className='container'>
            <h1>Hello, {user.username}</h1>
            <Avatar
                src={user.profileImage}
                alt={`${user.username}'s avatar`}
                withBorder={true}
                className="p-0.5"
                size="xl"
            />
            <Link to="/edit-profile">
                <Button className='button'>Edit Profile</Button>
            </Link>
        </div>
    </div>
);
};

export default ProfilePage;
