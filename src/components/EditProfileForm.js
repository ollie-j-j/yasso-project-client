import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './EditProfileForm.css';
import {
    Card,
    Input,
    Button,
    Typography,
    Avatar,
} from "@material-tailwind/react";
import authMethods from "../services/auth.service";

function EditProfileForm({ username, email, imageUrl }) {
    const [formData, setFormData] = useState({
        username,
        email,
        image: null,
    });
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleImageChange = (event) => {
        setFormData(prevState => ({
            ...prevState,
            image: event.target.files[0],
        }));
    };

    const handleEditProfile = (event) => {
        event.preventDefault();

        const data = new FormData();
        data.append('username', formData.username);
        data.append('email', formData.email);
        data.append('profileImage', formData.image);

        authMethods.editUser(data)
            .then(response => {
                console.log(response);
                navigate('/');
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div className="edit-profile-container">
            <Card color="transparent" shadow={false}>
                <Typography variant="h4" color="blue-gray">
                    edit profile
                </Typography>
                <Avatar
                    src={imageUrl}
                    alt="Current Profile"
                    withBorder={true}
                    className="p-0.5 avatar"
                    size="xl"
                />
                <div className="form-container">
                    <form className="-mt-9 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleEditProfile}>
                        <div className="mb-4 flex flex-col gap-6">
                            <Input
                                size="lg"
                                label="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange} />
                            <Input
                                size="lg"
                                label="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange} />
                            <input
                                type="file"
                                name="profileImage"
                                accept="image/*"
                                onChange={handleImageChange} />
                        </div>
                        <Button className="mt-6" type="submit" fullWidth>
                            save
                        </Button>
                    </form>
                </div>
            </Card>
        </div>
    );
}

export default EditProfileForm;
