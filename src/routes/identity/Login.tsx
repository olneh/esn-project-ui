import { MouseEvent, useContext, useState } from "react";
import LoginFormView from "./LoginFormView";
import { useNavigate } from "react-router-dom";
import { ILoginData } from "../../entities/registration/ILoginData";
import { JwtContext } from "../Root";
import {IdentityService} from "../../services/IdentityService";

// to be improved with actual jwt data
const Login = () => {
    const navigate = useNavigate();

    const [values, setInput] = useState({
        email: "marc.dolcet@example.com",
        password: "qwerty",
    } as ILoginData);

    const [validationErrors, setValidationErrors] = useState([] as string[]);

    const handleChange = (target: EventTarget & HTMLInputElement) => {
        // debugger;
        console.log(target.name, target.value, target.type)

        setInput({ ...values, [target.name]: target.value });
    }

    const {
        // jwtResponse,
        setJwtResponse} = useContext(JwtContext);

    const identityService = new IdentityService();

    const onSubmit = async (event: MouseEvent) => {
        console.log('onSubmit', event);
        event.preventDefault();

        if (values.email.length === 0 || values.password.length === 0) {
            setValidationErrors(["Bad input values!"]);
            return;
        }
        // remove errors
        setValidationErrors([]);

        const data = await identityService.login(values);

        if (data === undefined) {
            setValidationErrors(["no response"]);
            return;
        } else {
            if (setJwtResponse){
                setJwtResponse(data);
                navigate("/");
            }
        }
    }

    return (
        <LoginFormView
            handleChange={handleChange} onSubmit={onSubmit} validationErrors={validationErrors}  values={values}/>
    );
}

export default Login;