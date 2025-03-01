import { create } from "zustand";
import { axiosInstance } from "../lib/axios"; // Ensure this path is correct
import toast from "react-hot-toast";


export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data, isCheckingAuth: false });
        } catch (error) {
            set({ authUser: null, isCheckingAuth: false });
        }
    },
    signup: async (data)=>{
        set({isSigningUp: true});
        try{
            const res = await axiosInstance.post("/auth/signup", data);
            toast.success("Account created succesfully");
            set({authUser: res.data});
        }catch(error){
            toast.error(error.response.data.message);
        }finally{
            set({isSigningUp: false});
        }
    },
}));

