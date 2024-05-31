import { firebase_app, db } from "../../firebase";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
export const getallUsers = async (payload) => {
  try {
    let user = collection(db, "users");
    const result = await getDocs(user);
    const cityList = result.docs.map((doc) => doc.data());
    // await auth().signInWithEmailAndPassword(payload.email, payload.password);
    // dispatch({ type: "login" });
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: "loginError",
    //   payload: { error: "Invalid Login Credentials", type: "login" },
    // });
  }
};

export const LoginWithEmail = async (
  payload,
  successCallback,
  errorCallback
) => {
  try {
    const auth = getAuth();
    const user = await signInWithEmailAndPassword(
      auth,
      payload.email,
      payload.password
    );
    if (successCallback) {
      successCallback(user);
    }
    // await auth().signInWithEmailAndPassword(payload.email, payload.password);
    // dispatch({ type: "login" });
  } catch (err) {
    if (errorCallback) {
      errorCallback(err);
    }
    console.log("error while signing in here", err.code);
    if (err.code == "auth/invalid-credential") {
      if (errorCallback) {
        errorCallback("Invalid credentials");
      }
    }
    // dispatch({
    //   type: "loginError",
    //   payload: { error: "Invalid Login Credentials", type: "login" },
    // });
  }
};

export const SignUpWithEmail = async (
  payload,
  successCallback,
  errorCallback
) => {
  try {
    const auth = getAuth();
    const user = await createUserWithEmailAndPassword(
      auth,
      payload?.email,
      payload?.password
    );
    let userTable = collection(db, "users");
    const data = {
      userId: user.user.uid,
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      createdAt: new Date(),
    };
    const result = await addDoc(userTable, data);
    if (successCallback) {
      successCallback({ ...data, docId: result._key.path.segments[1] });
    }
  } catch (err) {
    console.log("error while signing up", err);
    if (err.code == "auth/email-already-in-use") {
      if (errorCallback) {
        errorCallback("Email Already In use Please Sign In");
      }
    }
    // dispatch({
    //   type: "loginError",
    //   payload: { error: "Invalid Login Credentials", type: "login" },
    // });
  }
};

export const getUser = async (id, successCallback) => {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, "users"), where("userId", "==", id))
    );
    querySnapshot.forEach((docSnap) => {
      if (docSnap.exists()) {
        if (successCallback) {
          successCallback({
            ...docSnap.data(),
            docId:
              docSnap._key.path.segments[docSnap._key.path.segments.length - 1],
          });
        }
      } else {
        console.log("Document not found");
      }
    });
  } catch (error) {
    console.error("Error fetching document:", error);
  }
};
