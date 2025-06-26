import { create } from "zustand";
import {
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  type User,
} from "firebase/auth";
import { ref, set as dbSet } from "firebase/database";
import { auth, db } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
  registerWithEmail: (
    email: string,
    password: string,
    nickname: string,
  ) => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,

  setUser: (user) => set({ user, isLoggedIn: !!user }),

  logout: async () => {
    try {
      await signOut(auth);
      set({ user: null, isLoggedIn: false });
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  registerWithEmail: async (email, password, nickname) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await updateProfile(userCredential.user, { displayName: nickname });

      await dbSet(ref(db, `users/${userCredential.user.uid}`), {
        name: nickname,
      });

      set({ user: userCredential.user, isLoggedIn: true });
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  loginWithEmail: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      set({ user: userCredential.user, isLoggedIn: true });
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  loginWithGoogle: async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      set({ user: userCredential.user, isLoggedIn: true });
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
}));

onAuthStateChanged(auth, (user) => {
  useAuthStore.getState().setUser(user);
});

export default useAuthStore;
