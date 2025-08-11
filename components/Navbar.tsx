"use client";

import Link from "next/link";
import Image from "next/image";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import NavItems from "@/components/NavItems";
import { useSearchParams } from "next/navigation";
import ThemeToggle from "./DarkModeToggler";

const Navbar = () => {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";

  return (
    <nav className="navbar">
      <Link href="/">
        <div className="flex items-center gap-2.5 cursor-pointer">
          <Image src="/images/logo.svg" alt="logo" width={46} height={44} />
        </div>
      </Link>
      <div className="flex items-center gap-8">
        <NavItems />
        <SignedOut>
          <SignInButton
            forceRedirectUrl={`$http://localhost:3000/${redirectTo}`}
            fallbackRedirectUrl={`$http://localhost:3000/${redirectTo}`}
          >
            <button className="btn-signin">Sign In</button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
