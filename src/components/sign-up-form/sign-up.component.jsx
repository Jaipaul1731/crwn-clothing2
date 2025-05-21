import { useState } from "react";
import {
  crateAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import FromInput from "../form_input/form.input.component";
import "./sign-up.style.scss";
import Button from "../button/button.component";

const SignUp = () => {
  const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  console.log(formFields);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("password donot matched");
      return;
    }
    try {
      const { user } = await crateAuthUserWithEmailAndPassword(email, password);
      console.log(user);
      await createUserDocumentFromAuth(user, { displayName });
      resetFormfield();
    } catch (error) {
      if (error.code == "auth/email-already-in-use") {
        alert("email is already in use");
      }
      console.log("error crated at email ans paasword user", error);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormfield = () => {
    setFormFields(defaultFormFields);
  };
  const isPasswordToShort = password.length > 0 && password.length < 6;

  return (
    <div className="sign-up-contaner">
      <h2>Don't have an account?</h2>
      <span>Sign Up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FromInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

        <FromInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FromInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        {isPasswordToShort && (
          <p style={{ color: "red", margin: "4px 0" }}>
            Password must be at least 6 characters
          </p>
        )}

        <FromInput
          label="Confirm password"
          type="password"
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        <Button type="submit" disabled={isPasswordToShort}>
          Sign Up
        </Button>
      </form>
    </div>
  );
};
export default SignUp;
