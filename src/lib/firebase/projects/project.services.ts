import { db } from "../firebase.config";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { CreateProject, Project } from "@/types/project.types";
import { TechnicalPositionType } from "@/types/employee.types";

// ----- Add Project Service -----
export const addProject = async (data: CreateProject) => {
  try {
    const docRef = await addDoc(collection(db, "projects"), {
      ...data,

      frontend_developer: [],
      backend_developer: [],
      mobile_developer: [],
      qa: [],
      designer: [],

      createdAt: new Date().toISOString(),
      updatedAt: serverTimestamp(),
    });

    return docRef.id;
  } catch (error) {
    console.log(`Error in Project Service :- ${error}`);
    throw error;
  }
};
// ------ Get Project --------
export const subscribeProjects = (callback: (projects: Project[]) => void) => {
  return onSnapshot(collection(db, "projects"), (snapshot) => {
    const projects: Project[] = snapshot.docs.map((doc) => {
      const data = doc.data() as Omit<Project, "id">;

      return {
        id: doc.id,
        ...data,

        frontend_developer: data.frontend_developer ?? [],
        backend_developer: data.backend_developer ?? [],
        mobile_developer: data.mobile_developer ?? [],
        qa: data.qa ?? [],
        designer: data.designer ?? [],
      };
    });

    callback(projects);
  });
};

// ----- Get Project By Id ----
export const subscribeProjectById = (
  projectId: string,
  callback: (project: Project | null) => void,
) => {
  const projectRef = doc(db, "projects", projectId);

  return onSnapshot(projectRef, (snapshot) => {
    if (!snapshot.exists()) {
      callback(null);
      return;
    }

    const data = snapshot.data() as Omit<Project, "id">;

    callback({
      id: snapshot.id,
      ...data,

      frontend_developer: data.frontend_developer ?? [],
      backend_developer: data.backend_developer ?? [],
      mobile_developer: data.mobile_developer ?? [],
      qa: data.qa ?? [],
      designer: data.designer ?? [],
    });
  });
};

// Adds employees to the appropriate project member field
// (frontend_developer, backend_developer, mobile_developer qa, or designers) and updates each
// employee document with the assigned project ID.

export const assignMembersToProject = async (
  projectId: string,
  memberType: TechnicalPositionType,
  employeeIds: string[],
) => {
  const projectRef = doc(db, "projects", projectId);

  const field = memberType;

  // Get current project
  const projectSnap = await getDoc(projectRef);

  if (!projectSnap.exists()) return;

  const projectData = projectSnap.data();

  const previousMembers: string[] = projectData[field] || [];

  // Replace the entire array
  await updateDoc(projectRef, {
    [field]: employeeIds,
  });

  // Members added
  const addedMembers = employeeIds.filter(
    (id) => !previousMembers.includes(id),
  );

  // Members removed
  const removedMembers = previousMembers.filter(
    (id) => !employeeIds.includes(id),
  );

  // Add projectId to newly assigned users  

  for (const employeeId of addedMembers) {
    const userRef = doc(db, "users", employeeId);

    await updateDoc(userRef, {
      projectIds: arrayUnion(projectId),
    });
  }

  // Remove projectId from removed users
  for (const employeeId of removedMembers) {
    const userRef = doc(db, "users", employeeId);

    await updateDoc(userRef, {
      projectIds: arrayRemove(projectId),
    });
  }
};

// Delete employees to the appropriate project member field
// (frontend_developer, backend_developer, mobile_developer qa, or designers) and updates each
// employee document with the assigned project ID.

export const removeMemberFromProject = async (
  projectId: string,
  memberId: string,
  memberType: TechnicalPositionType,
) => {
  const projectRef = doc(db, "projects", projectId);

  await updateDoc(projectRef, {
    [memberType]: arrayRemove(memberId),
  });

  const userRef = doc(db, "users", memberId);

  await updateDoc(userRef, {
    projectIds: arrayRemove(projectId),
  });
};

// ------ To Update Project -------
export const updateProject = async (
  projectId: string,
  data: Partial<Project>,
) => {
  try {
    const projectRef = doc(db, "projects", projectId);

    await updateDoc(projectRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
};

// ----- To delete Employee ------
export const deleteProject = async (id: string) => {
  try {
    await deleteDoc(doc(db, "projects", id));
  } catch (error) {
    console.error("Error deleting Project:", error);
    throw error;
  }
};


// arrayUnion is a Firestore helper function used to add values to an array field without duplicates.