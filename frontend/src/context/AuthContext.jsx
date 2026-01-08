import { createContext, useContext, useEffect, useState } from 'react';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    signInWithPopup,
    sendPasswordResetEmail,
    updateProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, googleProvider } from '../config/firebase';
import toast from 'react-hot-toast';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch user data from Firestore
    const fetchUserData = async (uid) => {
        try {
            const userDoc = await getDoc(doc(db, 'users', uid));
            if (userDoc.exists()) {
                setUserData({ id: userDoc.id, ...userDoc.data() });
                return userDoc.data();
            }
            return null;
        } catch (error) {
            console.error('Error fetching user data:', error);
            return null;
        }
    };

    // Create user document in Firestore
    const createUserDocument = async (user, additionalData = {}) => {
        if (!user) return;

        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            const { email, displayName, photoURL } = user;
            try {
                await setDoc(userRef, {
                    email,
                    displayName: displayName || additionalData.displayName || '',
                    photoURL: photoURL || '',
                    role: additionalData.role || 'patient',
                    phone: additionalData.phone || '',
                    dateOfBirth: additionalData.dateOfBirth || '',
                    gender: additionalData.gender || '',
                    address: additionalData.address || '',
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp(),
                    isActive: true,
                    isVerified: false,
                    ...additionalData
                });
                await fetchUserData(user.uid);
            } catch (error) {
                console.error('Error creating user document:', error);
                throw error;
            }
        } else {
            await fetchUserData(user.uid);
        }
    };

    // Register with email and password
    const register = async (email, password, userData) => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);

            // Update profile with display name
            if (userData.displayName) {
                await updateProfile(result.user, {
                    displayName: userData.displayName
                });
            }

            // Create user document
            await createUserDocument(result.user, userData);

            toast.success('Account created successfully!');
            return result.user;
        } catch (error) {
            console.error('Registration error:', error);
            let message = 'Registration failed. Please try again.';
            if (error.code === 'auth/email-already-in-use') {
                message = 'This email is already registered.';
            } else if (error.code === 'auth/weak-password') {
                message = 'Password should be at least 6 characters.';
            }
            toast.error(message);
            throw error;
        }
    };

    // Login with email and password
    const login = async (email, password) => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            await fetchUserData(result.user.uid);
            toast.success('Welcome back!');
            return result.user;
        } catch (error) {
            console.error('Login error:', error);
            let message = 'Login failed. Please check your credentials.';
            if (error.code === 'auth/user-not-found') {
                message = 'No account found with this email.';
            } else if (error.code === 'auth/wrong-password') {
                message = 'Incorrect password.';
            }
            toast.error(message);
            throw error;
        }
    };

    // Login with Google
    const loginWithGoogle = async (role = 'patient') => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            await createUserDocument(result.user, { role });
            toast.success('Welcome!');
            return result.user;
        } catch (error) {
            console.error('Google login error:', error);
            toast.error('Google sign-in failed. Please try again.');
            throw error;
        }
    };

    // Logout
    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            setUserData(null);
            toast.success('Logged out successfully');
        } catch (error) {
            console.error('Logout error:', error);
            toast.error('Logout failed');
            throw error;
        }
    };

    // Reset password
    const resetPassword = async (email) => {
        try {
            await sendPasswordResetEmail(auth, email);
            toast.success('Password reset email sent!');
        } catch (error) {
            console.error('Password reset error:', error);
            toast.error('Failed to send reset email');
            throw error;
        }
    };

    // Listen for auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user);
            if (user) {
                await fetchUserData(user.uid);
            } else {
                setUserData(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const value = {
        user,
        userData,
        loading,
        register,
        login,
        loginWithGoogle,
        logout,
        resetPassword,
        fetchUserData,
        isDoctor: userData?.role === 'doctor',
        isAdmin: userData?.role === 'admin',
        isPatient: userData?.role === 'patient'
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
