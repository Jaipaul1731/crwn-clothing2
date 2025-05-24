import { useState } from "react";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInCrateAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import FromInput from "../form_input/form.input.component";
import "./sign-in.style.scss";
import Button from "../button/button.component";

const SignIN = () => {
  const defaultFormFields = {
    email: "",
    password: "",
  };
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  console.log(formFields);

  const SignInwithGoogle = async () => {
    console.log("▶ Google handler start");
    try {
      const { user } = await signInWithGooglePopup();
      console.log("✔ Popup succeeded", user);
      await createUserDocumentFromAuth(user);
    } catch (err) {
      console.error("✖ Popup failed", err);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await signInCrateAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(response);
      resetFormfield();
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        alert("Check you email and password");
      }

      console.log(error.message);
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
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign In with your email and password</span>
      <form onSubmit={handleSubmit}>
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
            Password must be Greater than at least 6 characters
          </p>
        )}
        <div className="button-wrapper">
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              SignInwithGoogle();
            }}
            buttonType="google"
          >
            Google Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
};
export default SignIN;
