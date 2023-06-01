import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, get, set, remove, serverTimestamp, query, orderByChild, equalTo } from 'firebase/database';
import { v4 as uuid } from 'uuid';
import { CheckType, HabitType } from '../pages/DashBoard';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

export async function login() {
  return signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      return user;
    })
    .catch(console.error);
}

export async function logout() {
  return signOut(auth).then(() => null);
}

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    const updateUser = user ? await adminUser(user) : null;
    callback(updateUser);
  });
}

async function adminUser(user) {
  return get(ref(database, 'admins')) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        const isAdmin = admins.includes(user.uid);
        return { ...user, isAdmin };
      }
      return user;
    });
}

export async function getHabits(userId) {
  const habitsRef = ref(database, `habits/${userId}`);
  const habitsQuery = query(habitsRef, orderByChild('createdAt'));

  return get(habitsQuery).then((snapshot) => {
    const items = snapshot.val() || {};
    return Object.values(items).reverse();
  });
}

export async function addOrUpdateHabit(userId, habit: HabitType) {
  const id = habit.id ? habit.id : uuid();
  const date = habit.id == null ? { createdAt: serverTimestamp() } : { updatedAt: serverTimestamp() };

  set(ref(database, `habits/${userId}/${id}`), { ...habit, ...date, id });
  return null;
}

export async function removeHabit(userId, habitId) {
  get(query(ref(database, `checkmarks/${userId}`), orderByChild('habitId'), equalTo(habitId))).then((checkmarks) =>
    checkmarks.forEach((checkmark) => {
      remove(ref(database, `checkmarks/${userId}/${checkmark.key}`));
    })
  );
  remove(ref(database, `habits/${userId}/${habitId}`));
  return null;
}

export async function getChecks(userId: any) {
  return get(ref(database, `checkmarks/${userId}`)).then((snapshot) => {
    const items: CheckType[] = snapshot.val() || {};
    return Object.values(items);
  });
}

export async function addOrUpdateCheck(userId, check: any) {
  const id = uuid();

  set(ref(database, `checkmarks/${userId}/${id}`), { ...check, id, createdAt: serverTimestamp() });
  return null;
}

export async function removeCheck(userId, checkId: any) {
  remove(ref(database, `checkmarks/${userId}/${checkId}`));
  return null;
}
