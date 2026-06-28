import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../config/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { doc, getDoc, setDoc, getDocs, collection, query, limit } from 'firebase/firestore';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        // Fetch user data from Firestore
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          
          if (data.active === false) {
            await signOut(auth);
            setUserData(null);
            setCurrentUser(null);
            alert('Sua conta foi desativada. Entre em contato com a YV English.');
            return;
          }

          setUserData(data);
          
          // Update lastLogin tracking
          await setDoc(docRef, { lastLogin: new Date().toISOString() }, { merge: true });
        } else {
          // Se o documento não existir, verifica se é o primeiro usuário do sistema
          const q = query(collection(db, 'users'), limit(1));
          const usersSnap = await getDocs(q);
          
          if (usersSnap.empty) {
            // Primeiro usuário a logar no sistema ganha Admin (Master)
            const masterData = { role: 'master', name: 'Yasmin (Admin)', plan: 'Master', email: user.email, active: true };
            await setDoc(docRef, masterData);
            setUserData(masterData);
          } else {
            // Demais usuários viram alunos normais
            const studentData = { role: 'student', name: 'Novo Aluno', plan: 'Foundation', email: user.email, active: true };
            await setDoc(docRef, studentData);
            setUserData(studentData);
          }
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);
  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  const recordStudy = async (wordsCount) => {
    if (!currentUser || !userData) return false;
    
    const today = new Date();
    today.setHours(0,0,0,0);
    const todayStr = today.toISOString().split('T')[0];
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    let newWordsToday = userData.wordsStudiedToday || 0;
    let newStreak = userData.currentStreak || 0;
    let newStreakDate = userData.lastStreakDate || null;
    let goalJustReached = false;

    // Reset words count if it's a new day
    if (userData.lastStudyDate !== todayStr) {
      newWordsToday = 0;
    }
    
    newWordsToday += wordsCount;

    // Check if goal reached today for the first time
    if (newWordsToday >= 7 && newStreakDate !== todayStr) {
      goalJustReached = true;
      newStreakDate = todayStr;
      
      if (userData.lastStreakDate === yesterdayStr) {
        newStreak += 1;
      } else {
        newStreak = 1;
      }
    }

    const updates = {
      wordsStudiedToday: newWordsToday,
      lastStudyDate: todayStr,
      currentStreak: newStreak,
      lastStreakDate: newStreakDate
    };

    await setDoc(doc(db, 'users', currentUser.uid), updates, { merge: true });
    setUserData({ ...userData, ...updates });

    return goalJustReached;
  };

  const value = {
    currentUser,
    userData,
    login,
    logout,
    resetPassword,
    recordStudy
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
