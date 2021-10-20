import { auth, firebase } from "./firebase";
import dotenv from "dotenv";
dotenv.config();

const offlineUser = {
  accessToken: "Offline User",
  user: {
    _id: "Offline User",
    email: "You're offline. Some part of this app may be unavailable",
    name: "Offline User",
    lastStage: 0,
  },
};

export async function googleLogin() {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    const data = await auth.signInWithPopup(provider);

    if (data) {
      const { email, displayName } = data.user;

      const response = await login({ email, name: displayName });
      const responseBody = await response.json();

      localStorage.setItem("accessToken", responseBody.data.accessToken);

      await firebase.auth().signOut();

      return responseBody.data;
    } else {
      throw new Error("login fail");
    }
  } catch (err) {
    return offlineUser;
  }
}

async function login(data: { email: string; name: string }) {
  const url = `${process.env.REACT_APP_SERVER_URL}/api/auth/login`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response;
}

async function getData() {
  const url = `${process.env.REACT_APP_SERVER_URL}/api/user`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
  });

  return response;
}

export async function getUserData() {
  try {
    const response = await getData();

    if (!response.ok) {
      throw new Error("login fail");
    }

    const responseBody = await response.json();

    return responseBody.data.user;
  } catch (err) {
    return offlineUser.user;
  }
}

export async function updateFinalStageRecord(game: string) {
  try {
    const data = { game };
    const url = `${process.env.REACT_APP_SERVER_URL}/api/user`;

    const response = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (err) {
    return true;
  }
}
