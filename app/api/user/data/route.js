import { userDummyData } from "@/assets/assets";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" });
    }
    // Return dummy user data since we're using Supabase now
    return NextResponse.json({ success: true, user: userDummyData });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}