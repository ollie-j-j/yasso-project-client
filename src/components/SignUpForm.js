import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import authMethods from "../services/auth.service";
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import './SignUpForm.css';
import { Link } from 'react-router-dom';


const SignUpForm = () => {
    const [user, setUser] = useState({username: '', password: '', email: ''});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        
        setUser(user => ({...user, [name]: value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        authMethods.signUp(user)
            .then(() => navigate('/login'))
            .catch(err => console.error(err));
    }

    return (
        <div className='signup-container'>
            <Card color="transparent" shadow={false}>
                <Typography variant="h4" color="blue-gray">
                    sign up
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    enter your details to register
                </Typography>
                <div className='form-container'>
                    <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                        <div className="mb-4 flex flex-col gap-6">
                            <Input
                                size="lg"
                                label="username"
                                name="username"
                                value={user.username}
                                onChange={handleChange}
                            />
                            <Input
                                size="lg"
                                label="email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                            />
                            <Input
                                type="password"
                                size="lg"
                                label="password"
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                            />
                        </div>
                        <Button className="mt-6 lowercase text-sm" fullWidth type="submit">
                            register
                        </Button>
                        <Typography color="gray" className="mt-4 text-center font-normal">
                            already have an account?{" "}
                            <Link to="/login" className="font-medium text-gray-900">
                                log In
                            </Link>
                        </Typography>
                    </form>
                </div>
            </Card>
        </div>
    );
}

export default SignUpForm;
