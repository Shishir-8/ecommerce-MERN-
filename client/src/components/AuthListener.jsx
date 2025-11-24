
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/slice/authSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect} from 'react';
import { auth } from '../firebase';
import api from '../axios';

export default function AuthListener() {
    const dispatch = useDispatch()

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if(user) {
                try {
                    const token = await user.getIdToken()
                    const res = await api.post("/api/auth/firebase-login", {token})
                    dispatch(setUser(res.data.user))
                    
                } catch (error) {
                    console.log(error, "Failed to fetch user from backend")
                    dispatch(setUser(null)) 
                }
            } else {
                dispatch(setUser(null))
            }
        });
        return () => unsubscribe();
    }, [dispatch]);
    return  null
}
