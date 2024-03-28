import { MouseEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { IRegisterData } from "../../dto/IRegisterData";
// import { IdentityService } from "../../services/IdentityService";
// import { JwtContext } from "../Root";
import RegisterFormView from "./RegisterFormView";

const Register = () => {
    const navigate = useNavigate();

    // const [values, setInput] = useState({
    //     password: "bobbobbbb11111.K",
    //     confirmPassword: "bobbobbbb11111.K",
    //     email: "a@a.re",
    //     firstName: "Bob",
    //     lastName: "Bob",
    // } as IRegisterData);

    const [validationErrors, setValidationErrors] = useState([] as string[]);

    const handleChange = (target: EventTarget & HTMLInputElement) => {
        // debugger;
        // console.log(target.name, target.value, target.type)

        // setInput({ ...values, [target.name]: target.value });
    }

    // const {jwtResponse, setJwtResponse} = useContext(JwtContext);

    // const identityService = new IdentityService();

    const onSubmit = async (event: MouseEvent) => {
        console.log('onSubmit', event);

        console.log("values")
        // console.log(values)
        event.preventDefault();

        // error check functions
        // if (values.firstName.length == 0 || values.lastName.length == 0 || values.email.length == 0 || values.password.length == 0) {
        //     setValidationErrors(["Bad input values!"]);
        //     return;
        // }
        // if ( values.email.length == 0 || values.password != values.confirmPassword) {
        //     setValidationErrors(["Bad password values! Password should be at least one char long and passwords should be equal!"]);
        //     return;
        // }
        // if (values.firstName.length == 0 || values.lastName.length == 0) {
        //     setValidationErrors(["Bad input values! Write your first and last name!"]);
        //     return;
        // }
        // remove errors
        setValidationErrors([]);

        // var jwtData = await identityService.register(values);

        // if (jwtData == undefined) {
        //     setValidationErrors(["no jwt || or some wrong data input"]);
        //     return;
        // }

       //  if (setJwtResponse){
       //      setJwtResponse(jwtData);
       //      navigate("/");
       // }
    }
    return (
        <RegisterFormView
            // values={values}
            handleChange={handleChange} onSubmit={onSubmit} validationErrors={validationErrors} />
    );
}
export default Register;