import React, { useState, useEffect } from 'react';
import EditProfileForm from '../components/EditProfileForm';
import userService from '../services/user.service';
import { Spinner } from "@material-tailwind/react";

const EditProfilePage = () => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        userService.getProfile()
            .then(response => {
                setCurrentUser(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    if (!currentUser) {
        return (
            <div className="spinner-container">
                <Spinner className="h-10 w-10" />
            </div>
        )
    }

    return (
        <div>
            <EditProfileForm username={currentUser.username} email={currentUser.email} imageUrl={currentUser.profileImage} />
        </div>
    );
};

export default EditProfilePage;