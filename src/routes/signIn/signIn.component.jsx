import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import SignUp from "../../components/sign-up-form/sign-up.component";

const SignIn = () => {
  const logGoggleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
    // console.log(user);
  };

  return (
    <div>
      <h1>I am sign component</h1>
      <button onClick={logGoggleUser}>signIn with Google</button>
      <SignUp />
    </div>
  );
};

export default SignIn;
