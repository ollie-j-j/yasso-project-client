import React, { useState } from "react";
import { useRef } from "react";
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
import UpdateProfileDialog from "./UpdateProfileDialog";

function EditProfileForm({ username, email, imageUrl }) {
    const [formData, setFormData] = useState({
        username,
        email,
        image: null,
    });
    const navigate = useNavigate();

    const [dialogOpen, setDialogOpen] = useState(false);

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
                setDialogOpen(true);
                navigate('/edit-profile');
            })
            .catch(error => {
                console.error(error);
            });
    };

    const inputFile = useRef(null);

    const handleButtonClick = () => {
        inputFile.current.click();
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
                                ref={inputFile}
                                name="profileImage"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{ display: 'none' }} />
                            <Button variant="gradient" className="flex items-center justify-center gap-3" onClick={handleButtonClick}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="h-5 w-5"
                                    fullWidth
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                                    />
                                </svg>
                                Choose File
                            </Button>
                        </div>
                            <Button className="mt-6" type="submit" fullWidth>
                                save
                            </Button>
                    </form>
                </div>
            </Card>
            <UpdateProfileDialog open={dialogOpen} handleOpen={() => setDialogOpen(!dialogOpen)} />
        </div>
    );
}

export default EditProfileForm;
