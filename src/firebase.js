
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const app = firebase.initializeApp({
    apiKey: "AIzaSyBdEg9ztmBYNZ_7ZOw8Mc_rL7CpM1UbPmI",
    authDomain: "product-catalog-ea806.firebaseapp.com",
    databaseURL: "https://product-catalog-ea806.firebaseio.com",
    projectId: "product-catalog-ea806",
    storageBucket: "product-catalog-ea806.appspot.com",
    messagingSenderId: "40336961784",
    appId: "1:40336961784:web:632e80818608ae5a014b0d"
});

console.log(app)


export default app;