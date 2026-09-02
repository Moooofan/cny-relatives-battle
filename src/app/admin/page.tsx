"use client";

import { PasscodeGate } from "@/components/admin/PasscodeGate";
import { AdminApp } from "@/components/admin/AdminApp";

export default function AdminPage() {
  return (
    <PasscodeGate>
      <AdminApp />
    </PasscodeGate>
  );
}
