'use client';

import Image from "next/image";
import Link from "next/link";
import styles from "./navbar.module.css";
import SignIn from "./sign-in";
import { onAuthStateChangedHandler } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import Upload from "./upload";

//closure

export default function Navbar() {
  // Init user state
  const [ user, setUser ] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedHandler((user) => {
      setUser(user);
    })

    // CleanUp subscription on unmount
    return () => unsubscribe();
  });

  return (
    <nav className={styles.nav}>
      <Link href="/" >
        <div className={styles.container}>
          <Image width={240} height={120}
          src="/video.svg" alt="VideoStation Logo" />
            <p className={styles.text}>VideoStation</p>
        </div>
      </Link>
      {
        user && <Upload />
      }
      <SignIn user={user} />
    </nav>
    
  )
} 