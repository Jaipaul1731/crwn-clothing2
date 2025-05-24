import SignUp from "../../components/sign-up-form/sign-up.component";
import SignIN from "../../components/sign-in-form/sign-in.component";
import "./authentication.style.scss";

const Authentication = () => {
  return (
    <div className="authentication-container">
      {/* <button onClick={logGoggleUser}>signIn with Google</button> */}
      <SignIN />
      <SignUp />
    </div>
  );
};

export default Authentication;
