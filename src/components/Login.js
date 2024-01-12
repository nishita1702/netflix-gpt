import React, { useState, useRef } from "react";
import { SignInMessage, SignUpMessage } from "../utils/constants";
import checkValidateData from "../utils/validate";
import Header from "./Header";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleSignUp = () => {
    setIsSignInForm(!isSignInForm);
  };
  const handleSubmit = () => {
    const message = checkValidateData(
      email?.current?.value,
      password?.current?.value,
      name?.current?.value,
      isSignInForm
    );
    setErrorMessage(message);
    if (message) {
      return;
    }
    if (!isSignInForm) {
      //sign up logic
      createUserWithEmailAndPassword(
        auth,
        email?.current?.value,
        password?.current?.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
          })
            .then(() => {
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                })
              );
              // Profile updated!
            })
            .catch((error) => {
              // An error occurred
              setErrorMessage(error?.message);
            });
        })
        .catch((error) => {
          const errorMessage = error.message;
          setErrorMessage(errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email?.current?.value,
        password?.current?.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // navigate("/browse");
          // ...
        })
        .catch((error) => {
          const errorMessage = error.message;
          setErrorMessage(errorMessage);
          // navigate("/");
        });
    }
  };

  return (
    <div>
      <Header />
      <img
        className="absolute"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/ca6a7616-0acb-4bc5-be25-c4deef0419a7/c5af601a-6657-4531-8f82-22e629a3795e/IN-en-20231211-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        alt="logo"
      />
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute bg-black p-12 w-1/4 mx-auto right-0 left-0 my-36 text-white bg-opacity-80"
      >
        <h1 className="p-2 font-bold text-xl">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            className="p-2 my-4 bg-gray-700 w-full"
            placeholder="Full Name"
            type="text"
            ref={name}
          />
        )}
        <input
          className="p-2 my-4 bg-gray-700 w-full"
          placeholder="Email Address"
          type="text"
          ref={email}
        />
        <input
          className="p-2 my-4 bg-gray-700 w-full"
          placeholder="Password"
          type="password"
          ref={password}
        />
        <button className="p-2 my-6 bg-red-600 w-full" onClick={handleSubmit}>
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
        <p className="py-4 cursor-pointer" onClick={handleSignUp}>
          {isSignInForm ? SignUpMessage : SignInMessage}
        </p>
      </form>
    </div>
  );
};

export default Login;
