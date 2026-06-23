import { auth, db } from "../firebase.config";
import {
  collection,
  serverTimestamp,
  onSnapshot,
  setDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import {
  CreateEmployee,
  Employee,
  EmployeeStatus,
} from "@/types/employee.types";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "sonner";

// ------- To add Employee ---------
export const createEmployee = async (data: CreateEmployee) => {
  try {
    const { password, ...employeeData } = data;

    const { user } = await createUserWithEmailAndPassword(
      auth,
      data.email,
      password,
    );

    await setDoc(doc(db, "users", user.uid), {
      ...employeeData,
      avatar: data.name.slice(0, 2).toUpperCase(),
      projectIds: [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return user.uid;
  } catch (error) {
    console.error("Error creating employee:", error);
    throw error;
  }
};

// ------- To fetch employee ---------

export const subscribeToEmployees = (
  callback: (employees: Employee[]) => void,
) => {
  const unsubscribe = onSnapshot(
    collection(db, "users"),
    (snapshot) => {
      const employees = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Employee[];

      callback(employees);
    },
    (error) => {
      console.error("Employee listener error:", error);
    },
  );

  return unsubscribe;
};

// ------- To Update Employee Details --------
export const updateEmployee = async (id: string, data: Partial<Employee>) => {
  try {
    await updateDoc(doc(db, "users", id), {
      ...data,
      updatedAt: serverTimestamp(),
    });

    toast.success("Employee updated successfully");
  } catch (error) {
    toast.error("Failed to update employee");
    console.error(error);
    throw error;
  }
};

// ------ To Update Employee Status -------
export const updateEmployeeStatus = async (
  id: string,
  status: EmployeeStatus,
) => {
  try {
    await updateDoc(doc(db, "users", id), {
      status,
      updatedAt: serverTimestamp(),
    });
    toast.success("Status changed successfully");
  } catch (error) {
    toast.error("Status update failed");
    console.error("Error updating status:", error);
    throw error;
  }
};

// ----- To delete Employee ------
export const deleteEmployee = async (id: string) => {
  try {
    await deleteDoc(doc(db, "users", id));
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw error;
  }
};
