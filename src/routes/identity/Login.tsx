import { MouseEvent, useContext, useState } from "react";
import LoginFormView from "./LoginFormView";
import { useNavigate } from "react-router-dom";
import { ILoginData } from "../../entities/registration/ILoginData";
import { JwtContext } from "../Root";
import {IdentityService} from "../../services/IdentityService";


const Login = () => {
    const navigate = useNavigate();

    const [values, setInput] = useState({
        email: "admin@app.com",
        password: "Foo.bar.1",
    } as ILoginData);

    const [validationErrors, setValidationErrors] = useState([] as string[]);

    const handleChange = (target: EventTarget & HTMLInputElement) => {
        // debugger;
        console.log(target.name, target.value, target.type)

        setInput({ ...values, [target.name]: target.value });
    }

    const {jwtResponse, setJwtResponse} = useContext(JwtContext);

    const identityService = new IdentityService();

    const onSubmit = async (event: MouseEvent) => {
        console.log('onSubmit', event);
        event.preventDefault();

        if (values.email.length == 0 || values.password.length == 0) {
            setValidationErrors(["Bad input values!"]);
            return;
        }
        // remove errors
        setValidationErrors([]);

        var jwtData = await identityService.login(values);

        if (jwtData == undefined) {
            // TODO: get error info
            setValidationErrors(["no jwt"]);
            return;
        }

        if (setJwtResponse){
             setJwtResponse(jwtData);
             navigate("/");
        }
    }

    return (
        <LoginFormView
            // values={values}
            // values={null}
            handleChange={handleChange} onSubmit={onSubmit} validationErrors={validationErrors} />
    );
}

export default Login;