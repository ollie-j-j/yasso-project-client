import React, { useState } from "react";
import './SignInForm.css';
import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import authMethods from "../services/auth.service";

function SignInForm() {
    const [formData, setFormData] = useState({
        identifier: '',
        password: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSignIn = (event) => {
        event.preventDefault();

        authMethods.signIn(formData)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div className="signin-container">
            <Card color="transparent" shadow={false}>
                <Typography variant="h4" color="blue-gray">
                    sign in
                </Typography>
                <div className="form-container">
                <form className="-mt-9 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSignIn}>
                        <div className="mb-4 flex flex-col gap-6">
                            <Input 
                                size="lg" 
                                label="username/email" 
                                name="identifier"
                                value={formData.identifier}
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
                            sign in
                        </Button>
                        <Typography color="gray" className="mt-4 text-center font-normal">
                            don't have an account?{" "}
                            <a href="#" className="font-medium text-gray-900">
                                sign up
                            </a>
                        </Typography>
                    </form>
                </div>
            </Card>
        </div>
    );
}

export default SignInForm;
