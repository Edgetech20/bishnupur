import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import Sidebar from "./Sidebar";

const SECRET = process.env.ADMIN_SECRET ?? "";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const jar = await cookies();
  const auth = jar.get("admin_auth")?.value;

  if (!auth || auth !== SECRET) {
    redirect("/admin/login?from=/admin/dashboard");
  }

  const rows = await db.setting.findMany({ where: { key: { in: ["event_title", "event_title_sub"] } } });
  const s = Object.fromEntries(rows.map(r => [r.key, r.value]));
  const eventTitle = `${s.event_title || "প্ৰিয়বোধী"} ${s.event_title_sub || "মহোৎসব"}`;

  return <Sidebar eventTitle={eventTitle}>{children}</Sidebar>;
}
