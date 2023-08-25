import React, { useState } from "react";
import axios from "axios";
import './SignUpForm.css';
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";

function SignUpForm() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSignUp = (event) => {
        event.preventDefault();

        axios.post('http://localhost:5005/api/signup', formData)
            .then(response => {
            })
            .catch(error => {
            });
    };

    return (
        <div className="signup-container">
            <Card color="transparent" shadow={false}>
                <Typography variant="h4" color="blue-gray">
                    sign up
                </Typography>
                <div className="form-container">
                    <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSignUp}>
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
                            <Input 
                                type="password" 
                                size="lg" 
                                label="password" 
                                name="password" 
                                value={formData.password}
                                onChange={handleChange} />
                        </div>
                        <Button className="mt-6" type="submit" fullWidth>
                            sign up
                        </Button>
                        <Typography color="gray" className="mt-4 text-center font-normal">
                            already have an account?{" "}
                            <a href="#" className="font-medium text-gray-900">
                                sign in
                            </a>
                        </Typography>
                    </form>
                </div>
            </Card>
        </div>
    );
}

export default SignUpForm;
