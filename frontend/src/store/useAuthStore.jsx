import { create } from 'zustand';
import { axiostInstance } from '../../lib/axios';

export const useAuthStore = create((set) => ({
    authUser: null,
    isSignUp: false,
    isLogginIng: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            // Your authentication logic here
            const  res = await axiostInstance.get("/auth/check");


            set({authUser:res.data})
        } catch (error) {
            console.log("Error in checkAuth", error);
            set({authUser:null});
        }finally{
            set({isCheckingAuth: false});
        }
    },
}));
