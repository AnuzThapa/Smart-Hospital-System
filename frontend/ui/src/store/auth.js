import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

const useAuthStore = create((set, get) => ({
  allUserData: null,
  loading: false,

  user: () => ({
    user_id: get().allUserData?.user_id || null,
    username: get().allUserData?.username || null,
  }),

  setUser: (user) =>
    set({
      allUserData: user,
    }),

  setLoading: (loading) => set({ loading }),

  isLoggedIn: () => get().allUserData !== null,   //if the user is logged in it returns the user data else returns null
}));


if (import.meta.env.DEV) {
  mountStoreDevtool("Store", useAuthStore);
}

export { useAuthStore };