import Link from "next/link";
import SignInForm from "./SignInForm";
import Image from "next/image";
import loginImage from "@/assets/popcorn-clapper-cinematography.jpg";

export default function Page() {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card">
        <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
          <div className="space-y-1 text-center">
            <h1 className="text-3xl font-bold">Log in to next-movie</h1>
            <p className="text-muted-foreground">App to found movies details</p>
          </div>
          <div className="space-y-5">
            <SignInForm />
            <Link
              href="/signup"
              className="block cursor-pointer hover:underline text-center"
            >
              Don&apos;t have an account ? Sign up
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
