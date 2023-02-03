import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import {
    collection,
    setDoc,
    getDocs,
    doc,
    getDoc,
    query,
    where
} from "firebase/firestore";

import { db } from "../firebase.config";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";



const registerUser = createAsyncThunk('twitter/registerUser', ((userSignUpData) => {
    try {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, userSignUpData.email, userSignUpData.password)
            .then((userCredential) => {
                // Signed in 
                let uid = userCredential.user.uid
                userSignUpData.uid = uid;
                setDoc(doc(db, "users", uid), userSignUpData);
                return toast.success('User Register Successfully!');


            })

            .catch((error) => {

                const errorMessage = error.message;
                return toast.error(`${errorMessage}`);


            });
    }
    catch (e) {
        console.log(e)
    }
}))


const loginUser = createAsyncThunk('twitter/loginUser', ((userLogin) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, userLogin.email, userLogin.password)
        .then((userCredential) => {
            // Signed in 
            toast.success('User Login Successfully!');

            const user = userCredential.user;
            console.log(user.uid)
            getDoc(doc(db, "users", user.uid)).then(docSnap => {
                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data());
                    localStorage.setItem('login', JSON.stringify(docSnap.data()))


                } else {
                    console.log("No such document!");

                }

            })
        })
        .catch((error) => {
            // const errorCode = error.code;
            const errorMessage = error.message;
            // console.log(errorMessage)
            return toast.error(`${errorMessage}`);

        });
}))

const addTweet = createAsyncThunk("twitter/addTweet", async (data) => {
    console.log('add', data);
    try {
        await setDoc(doc(db, "posts", data?.id.toString()), data);
        return toast.success('Data Added Successfully!');


    } catch (e) {
        toast.error("Error adding document: ", `${e}`);
    }
});

const getAllTweets = createAsyncThunk("twitter/getAllTweets", async () => {
    try {
        const allData = [];
        const querySnapshot = await getDocs(collection(db, "posts"));
        querySnapshot.forEach((doc) => {
            allData.push(doc.data());
        });
        console.log('allData', allData);
        return allData
    } catch (e) {
        console.error("Error adding document: ", e);
    }
});


const getSingleUserTweets = createAsyncThunk("twitter/getSingleUserTweets", async () => {
    const data = localStorage.getItem('login')

    const currentUid = JSON.parse(data);
    try {
        const q = query(collection(db, "posts"), where("uid", "==", currentUid.uid));
        const querySnapshot = await getDocs(q);
        const Data = [];

        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            Data.push(doc.data());

            console.log('doc.id', " => ", doc.data());
        });
        return Data



    }
    catch (e) {
        console.error("Error adding document: ", e);
    }
});



const initialState = {
    isLoading: false,
    is_Login: false,
    dataList: {
        allTweets: [],
        singleUserTweets: [],
    },
};

export const twitterSlice = createSlice({
    name: "twitter",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;

        });
        builder.addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
        })

        builder.addCase(loginUser.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.is_Login = true;
            state.isLoading = false;



        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
        })

        builder.addCase(addTweet.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(addTweet.fulfilled, (state, action) => {
            state.isLoading = false;


        });
        builder.addCase(addTweet.rejected, (state, action) => {
            state.isLoading = false;
        })

        builder.addCase(getAllTweets.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getAllTweets.fulfilled, (state, action) => {
            state.isLoading = false;

            state.dataList.allTweets = action.payload?.reverse();
        });
        builder.addCase(getAllTweets.rejected, (state, { payload }) => {
            state.isLoading = false;
        });

        builder.addCase(getSingleUserTweets.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getSingleUserTweets.fulfilled, (state, action) => {
            state.isLoading = false;
            console.log('single', action?.payload)
            state.dataList.singleUserTweets = action.payload?.reverse();
        });
        builder.addCase(getSingleUserTweets.rejected, (state, { payload }) => {
            state.isLoading = false;
        });



    },
});


export { registerUser, loginUser, addTweet, getAllTweets, getSingleUserTweets };


export default twitterSlice.reducer;
