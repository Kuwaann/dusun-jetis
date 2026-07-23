import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const { id, email, password, full_name, role } = await request.json();

    if (!id || !email || !full_name || !role) {
      return NextResponse.json(
        { error: "Field ID, email, nama lengkap, dan peran harus diisi" },
        { status: 400 }
      );
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // 1. Update auth user details (email/password)
    const updateAuthData: any = { email };
    if (password && password.trim() !== "") {
      updateAuthData.password = password;
    }

    const { error: authError } = await supabaseAdmin.auth.admin.updateUserById(
      id,
      updateAuthData
    );

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    // 2. Update profile
    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .update({
        full_name,
        role,
      })
      .eq("id", id);

    if (profileError) {
      return NextResponse.json({ error: profileError.message }, { status: 400 });
    }

    return NextResponse.json({ message: "User updated successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
