import { auth, db } from "../firebase.config";
import {
  collection,
  serverTimestamp,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "sonner";
import {
  CreateEmployee,
  Employee,
  EmployeeStatus,
} from "@/types/employee.types";

export const createEmployee = async (data: CreateEmployee) => {
  const response = await fetch("/api/employees", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to create employee");
  }

  return result.uid;
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
  } catch (error) {
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
    const currentUser = auth.currentUser;

    if (!currentUser) {
      throw new Error("Please log in to continue.");
    }

    const token = await currentUser.getIdToken();

    const response = await fetch("/api/employees/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete employee.");
    }

    return data;
  } catch (error) {
    console.log(error);
    throw error instanceof Error
      ? error
      : new Error("Something went wrong while deleting the employee.");
  }
};

// ------ To fetch all user -------

export const subscribeEmployees = (
  callback: (employees: Employee[]) => void,
) => {
  return onSnapshot(collection(db, "users"), (snapshot) => {
    const employees = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Employee[];

    callback(employees);
  });
};
