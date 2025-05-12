import { AuthForm } from "@/components/login-form"
import { Metadata } from "next";


export const metadata: Metadata = {
  title: " Login - Public Transport Complaints",
  description: "Report a problem. We'll get back to you.",

};


export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <AuthForm />
      </div>
    </div>
  )
}
