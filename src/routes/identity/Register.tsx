import {MouseEvent, useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {JwtContext} from "../Root";
import RegisterFormView from "./RegisterFormView";
import {IRegisterData} from "../../entities/registration/IRegisterData";
import {IdentityService} from "../../services/IdentityService";

const Register = () => {
    const navigate = useNavigate();

    const [values, setInput] = useState({
        firstName: "Bob",
        lastName: "Bob",
        birthday: new Date("2023-01-01"),
        email: "a@a.re",
        phone: "+37255544433",
        password: "passw0rd",
        confirmPassword: "passw0rd",
    } as IRegisterData);

    const [validationErrors, setValidationErrors] = useState([] as string[]);

    const handleChange = (target: EventTarget & HTMLInputElement) => {
        if (target.name === 'birthday') {
            const newDate = new Date(target.value);
            setInput({...values, [target.name]: newDate});
        } else {
            setInput({...values, [target.name]: target.value});
        }
    }

    const {jwtResponse, setJwtResponse} = useContext(JwtContext);

    const identityService = new IdentityService();

    const onSubmit = async (event: MouseEvent) => {
        event.preventDefault();
        console.log('onSubmit', event);

        // error check functions
        if (values.firstName.length === 0 ||
            values.lastName.length === 0 ||
            values.email.length === 0 ||
            values.phone.length === 0 ||
            values.password.length === 0) {
            setValidationErrors(["Bad input values!"]);
            return;
        }
        if (values.email.length === 0 ||
            values.password !== values.confirmPassword) {
            setValidationErrors(["Bad password values! Password should be at least one char long and passwords should be equal!"]);
            return;
        }
        if (values.firstName.length === 0 ||
            values.lastName.length === 0
        ) {
            setValidationErrors(["Bad input values! Write your first and last name!"]);
            return;
        }
        // remove errors
        setValidationErrors([]);
        console.log("Values" + values);
        //register the user, get jwt and refresh token
        var jwtData = await identityService.register(values);

        if (jwtData == undefined) {
            setValidationErrors(["no jwt"]);
        } else {
            if (setJwtResponse) {
                setJwtResponse(jwtData);
            }
        }
        navigate("/login/");

    }
return (
    <RegisterFormView values={values} handleChange={handleChange} onSubmit={onSubmit}
                      validationErrors={validationErrors}/>
);
}
export default Register;