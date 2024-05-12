import {MouseEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import RegisterFormView from "./RegisterFormView";
import {IRegisterData} from "../../entities/registration/IRegisterData";
import {IdentityService} from "../../services/IdentityService";

const Register = () => {
    const navigate = useNavigate();

    const [values, setInput] = useState({
        firstName: "Bob",
        lastName: "Bob",
        birthday: new Date("2023-01-01"),
        email: "qwerty",
        phone: "+37255544433",
        password: "qwerty",
        confirmPassword: "qwerty",
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

    const identityService = new IdentityService();

    const onSubmit = async (event: MouseEvent) => {
        event.preventDefault();
        console.log('onSubmit', event);

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
        setValidationErrors([]);
        const response = await identityService.register(values);
        try {
            if (response) {
                alert("Your profile has been successfully registered! You can now log in.");
                navigate("/login/");
            } else {
                alert("This email is already registered. Please use a different email.");
            }
        } catch (error) {
            alert("Registration failed. Please try again.");
            console.error('Registration error:', error);
        }

    }

    return (
        <RegisterFormView values={values} handleChange={handleChange} onSubmit={onSubmit}
                          validationErrors={validationErrors}/>
    );
}
export default Register;