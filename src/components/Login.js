import React, { useState, useRef } from "react";
import Header from "./Header";
import { validateEmailPassword } from "../utils/validation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  if (user) navigate("/browse");

  const handleSignInForm = () => setIsSignInForm(!isSignInForm);
  const handleForm = () => {
    const message = validateEmailPassword(
      email.current.value,
      password.current.value
    );
    setErrorMsg(message);

    if (message) return false;

    if (!isSignInForm) {
      // Sign up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          updateProfile(auth.currentUser, {
            displayName: name.current.value,
            photoURL: "https://avatars.githubusercontent.com/u/147234546?v=4",
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(addUser({ uid, email, displayName, photoURL }));
              navigate("/browse");
            })
            .catch((error) => {
              setErrorMsg(error.message);
            });
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(`${errorCode} - ${errorMessage}`);
          // ..
        });
    } else {
      // Sign in logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          navigate("/browse");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(`${errorCode} - ${errorMessage}`);
        });
    }
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="Netflix"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="p-12 text-white bg-black absolute w-3/12 my-36 mx-auto right-0 left-0 rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? " Sign In " : " Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            ref={name}
            placeholder="Full Name "
            className="p-4 my-4 w-full bg-gray-700"
          />
        )}
        <input
          type="email"
          ref={email}
          placeholder="email"
          className="p-4 my-4 w-full bg-gray-700"
        />
        <input
          type="password"
          ref={password}
          placeholder="Password "
          className="p-4 my-4 w-full bg-gray-700"
        />

        <p className="font-bold text-red-500 text-lg py-4">{errorMsg}</p>

        <button
          onClick={handleForm}
          className="p-4 my-6 bg-red-700 w-full rounded-lg"
        >
          {isSignInForm ? " Sign In " : " Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={handleSignInForm}>
          {isSignInForm
            ? " New to Netflix? Sign up now "
            : " Already Registered? Sign In now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
