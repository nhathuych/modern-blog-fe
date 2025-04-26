import { clearUserCookie } from "@/lib/auth-cookie";
import { redirect } from "next/navigation";

export async function GET() {
  await clearUserCookie()
  redirect('/')
}
