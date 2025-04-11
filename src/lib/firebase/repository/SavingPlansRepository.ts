import { collection, getDocs, setDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseInit.ts';
import { SavingPlan } from '../../../types/types.ts';


export async function getSavingPlans(walletAddress: string | undefined): Promise<SavingPlan[]> {
  if (walletAddress === undefined) {
    console.error('Missing wallet address. Can\'t fetch saving plans.');
    return [];
  }

  const plansRef = collection(db, 'savingPlans', walletAddress, 'plans');
  const querySnapshot = await getDocs(plansRef);

  const plans: SavingPlan[] = [];
  querySnapshot.forEach((doc) => {
    plans.push({ id: doc.id, ...doc.data() } as SavingPlan);
  });

  return plans;
}

export async function createSavingPlan(walletAddress: string | undefined, plan: SavingPlan) {
  if (walletAddress === undefined) {
    console.error('Missing wallet address. Can\'t save saving plan.');
    return false;
  }

  // Use setDoc with a specific document ID instead of addDoc
  const docRef = doc(db, 'savingPlans', walletAddress, 'plans', plan.id);
  await setDoc(docRef, {
    ...plan
  });

  return true;
}

export async function deleteSavingPlan(walletAddress: string | undefined, plan: SavingPlan) {
  if (!walletAddress || !plan.id) {
    console.error("Missing wallet address or plan ID. Can't delete saving plan.");
    return false;
  }

  try {
    const docRef = doc(db, "savingPlans", walletAddress, "plans", plan.id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("Failed to delete saving plan:", error);
    return false;
  }
}

