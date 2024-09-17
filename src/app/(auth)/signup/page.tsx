import Link from "next/link";
import SignUpForm from "./SignUpForm";
import { Metadata } from "next";
import loginImage from "@/assets/popcorn-clapper-cinematography.jpg";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Sign up",
};

export default function Page() {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card">
        <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
          <div className="space-y-1 text-center">
            <h1 className="text-3xl font-bold">Sign up to next-movie</h1>
            <p className="text-muted-foreground">App to found movies details</p>
          </div>
          <div className="space-y-5">
            <SignUpForm />
            <Link
              href="/login"
              className="block cursor-pointer hover:underline text-center"
            >
              Already have an account ? Log in{" "}
            </Link>
          </div>
        </div>
        <Image
          src={loginImage}
          alt=""
          className="hidden w-1/2 object-cover md:block"
        />
      </div>
    </main>
  );
}
