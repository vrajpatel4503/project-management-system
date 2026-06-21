import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ProjectForm } from "@/types/project.types";

export const addProject = async (projectData: ProjectForm) => {
  const docRef = await addDoc(collection(db, "projects"), {
    ...projectData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
};
