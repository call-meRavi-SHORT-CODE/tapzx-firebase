import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../config/firebase';

interface UserProfile {
  uid: string;
  email: string;
  fullName: string;
  username: string;
  organizationName?: string;
  bio?: string;
  location?: string;
  profileImage?: string;
  phoneNumber?: string;
  platforms: PlatformData[];
  profileUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

interface PlatformData {
  id: string;
  name: string;
  value: string;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (userData: SignUpData) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (profileData: Partial<UserProfile>) => Promise<void>;
  uploadProfileImage: (imageUri: string) => Promise<string>;
}

interface SignUpData {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        // Fetch user profile from Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserProfile(userDoc.data() as UserProfile);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const signUp = async (userData: SignUpData) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
      
      // Update the user's display name
      await updateProfile(user, {
        displayName: userData.fullName
      });

      // Create user profile in Firestore
      const userProfile: UserProfile = {
        uid: user.uid,
        email: userData.email,
        fullName: userData.fullName,
        username: '',
        phoneNumber: userData.phoneNumber,
        platforms: [],
        profileUrl: '',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      await setDoc(doc(db, 'users', user.uid), userProfile);
      setUserProfile(userProfile);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUserProfile(null);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const updateUserProfile = async (profileData: Partial<UserProfile>) => {
    if (!user) throw new Error('No user logged in');

    try {
      const updatedProfile = {
        ...profileData,
        updatedAt: new Date()
      };

      await updateDoc(doc(db, 'users', user.uid), updatedProfile);
      
      // Update local state
      setUserProfile(prev => prev ? { ...prev, ...updatedProfile } : null);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const uploadProfileImage = async (imageUri: string): Promise<string> => {
    if (!user) throw new Error('No user logged in');

    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      
      const imageRef = ref(storage, `profile-images/${user.uid}`);
      await uploadBytes(imageRef, blob);
      
      const downloadURL = await getDownloadURL(imageRef);
      return downloadURL;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    signIn,
    signUp,
    logout,
    updateUserProfile,
    uploadProfileImage
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};