import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import authMethods from "../services/auth.service";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import './LogInForm.css';

const LogInForm = () => {
    const [user, setUser] = useState({ username: '', password: '' });
    const navigate = useNavigate();
    const { storeToken, authenticateUser } = useContext(AuthContext);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser(user => ({ ...user, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        authMethods.logIn(user)
            .then((tokenObject) => {
                console.log("Server Response:", tokenObject);
                storeToken(tokenObject.authToken)
                authenticateUser()
                navigate("/")
            })
            .catch(err => console.error(err))
    }

    return (
        <div className="login-container">
            <Card color="transparent" shadow={false}>
                <Typography variant="h4" color="blue-gray">
                    login
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    enter your credentials to login
                </Typography>
                <div className="form-container">
                    <form className="-mt-9 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
                        <div className="mb-4 flex flex-col gap-6">
                            <Input size="lg" label="Username" name="username" value={user.username} onChange={handleChange} />
                            <Input type="password" size="lg" label="Password" name="password" value={user.password} onChange={handleChange} />
                        </div>
                        <Button className="mt-6" fullWidth type="submit">
                            login
                        </Button>
                        <Typography color="gray" className="mt-4 text-center font-normal">
                            don't have an account?{" "}
                            <Link to="/signup" className="font-medium text-gray-900">
                                sign up
                            </Link>
                        </Typography>
                    </form>
                </div>
            </Card>
        </div>
    )
}

export default LogInForm;
