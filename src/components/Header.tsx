import { Clapperboard } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-yellow-100 flex gap-10 border-b-2 border-black shadow-xl items-center justify-start py-3 px-5">
      <div className=" flex gap-2 font-bold text-2xl items-center">
        <Clapperboard color="red" />
        NEXT-Movies
      </div>
      <nav className="flex gap-5">
        <Link
          href="/"
          className={` font-mono font-bold text-xl text-gray-900 hover:text-gray-950`}
        >
          Home
        </Link>
        <Link
          href="/movies"
          className={` font-mono font-bold text-xl text-gray-900 hover:text-gray-950`}
        >
          Movies
        </Link>
      </nav>
    </header>
  );
}
