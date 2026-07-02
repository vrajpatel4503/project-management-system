import { NextRequest, NextResponse } from "next/server";
import { Timestamp } from "firebase-admin/firestore";

import { adminAuth, adminDb } from "@/lib/firebase-admin/firebase-admin";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      password,
      role,
      employeeType,
      technicalPosition,
      department,
      status,
      joinedAt,
    } = body;

    // Create Firebase Authentication user
    const authUser = await adminAuth.createUser({
      email,
      password,
      displayName: name,
    });

    // Generate avatar initials
    const avatar = name
      .trim()
      .split(/\s+/)
      .map((word: string) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

    // Save employee document in Firestore
    await adminDb
      .collection("users")
      .doc(authUser.uid)
      .set({
        id: authUser.uid,
        name,
        email,
        role,
        employeeType: employeeType ?? null,
        technicalPosition: technicalPosition ?? null,
        department,
        status,
        avatar,
        projectIds: [],
        joinedAt,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });

    return NextResponse.json(
      {
        success: true,
        message: "Employee created successfully",
        uid: authUser.uid,
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}

// NextRequest :- Represents the incoming HTTP request.

// NextResponse :- Used to send a response back to the client.

// adminAuth :- Firebase Admin Authentication instance.
// Used for operations like:
// create users
// delete users
// update users

// adminDb :- Firestore Admin instance.
// Used to:
// create documents
// update documents
// delete documents
// query collections
