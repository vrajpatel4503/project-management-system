import { adminAuth, adminDb } from "@/lib/firebase-admin/firebase-admin";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  try {
    // Get employee id from request body
    const { id } = await request.json();

    // Get Authorization header
    const authorization = request.headers.get("Authorization");

    if (!authorization?.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Extract token
    const token = authorization.split("Bearer ")[1];

    // Verify Firebase ID token
    const decodedToken = await adminAuth.verifyIdToken(token);

    // Get logged-in user's document
    const adminDoc = await adminDb
      .collection("users")
      .doc(decodedToken.uid)
      .get();

    if (!adminDoc.exists) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check role
    if (adminDoc.data()?.role !== "admin") {
      return NextResponse.json(
        { message: "Only admins can delete employees." },
        { status: 403 },
      );
    }

    // Delete from Firebase Authentication
    await adminAuth.deleteUser(id);

    // Delete from Firestore
    await adminDb.collection("users").doc(id).delete();

    return NextResponse.json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    console.error("Delete employee error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete employee",
      },
      {
        status: 500,
      },
    );
  }
}
