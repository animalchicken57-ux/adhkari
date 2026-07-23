"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type ProfileState = { ok: boolean; message: string } | null;

export async function updateProfile(
  _prev: ProfileState,
  formData: FormData
): Promise<ProfileState> {
  const fullName = String(formData.get("full_name") ?? "").trim();

  if (!fullName) {
    return { ok: false, message: "profile.editorEmpty" };
  }
  if (fullName.length > 60) {
    return { ok: false, message: "profile.editorLong" };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { ok: false, message: "profile.mustLogin" };
  }

  const { error } = await supabase
    .from("profiles")
    .update({ full_name: fullName })
    .eq("id", user.id);

  if (error) {
    return { ok: false, message: "profile.editorFail" };
  }

  revalidatePath("/profile");
  return { ok: true, message: "profile.editorSaved" };
}
