import React, { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import {
  LogInWithFirebase,
  LogOutWithFirebase,
} from "../utils/FirebaseLoginHandler";
import firebase from "firebase";

export default function Home() {
  const [userIsSignedIn, setUserIsSignedIn] = useState(true);
  const [userName, setUserName] = useState("");

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setUserIsSignedIn(true);
      setUserName(user.displayName);
    } else {
      setUserIsSignedIn(false);
    }
  });

  if (userIsSignedIn === true) {
    return (
      <main>
        <div className="login-settings-wrapper">
          <div className="login-settings" onClick={LogOutWithFirebase}>
            <span>logout</span>
            <AiOutlineUser className="user-auth" />
          </div>
          <span className="logged-message">logged as {userName}</span>
        </div>
        <h1>
          <i class="fas fa-photo-video"></i>
          <span>movie</span> library
        </h1>
      </main>
    );
  } else {
    return (
      <main>
        <div className="login-settings-wrapper">
          <div className="login-settings" onClick={LogInWithFirebase}>
            <span>login</span>
            <AiOutlineUser className="user-auth" />
          </div>
          <span className="logged-message"></span>
        </div>
        <h1>
          <i class="fas fa-photo-video"></i>
          <span>movie</span> library
        </h1>
      </main>
    );
  }
}
