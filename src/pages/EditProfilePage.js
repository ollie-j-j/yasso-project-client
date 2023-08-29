import React, { useState, useEffect } from 'react';
import EditProfileForm from '../components/EditProfileForm';
import userService from '../services/user.service';

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
        return <div>Loading...</div>;
    }

    return (
        <div>
            <EditProfileForm username={currentUser.username} email={currentUser.email} imageUrl={currentUser.profileImage} />
        </div>
    );
};

export default EditProfilePage;