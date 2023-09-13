import Image from "next/image";
import Link from "next/link";
import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <Link href="/" >
        <div className={styles.container}>
          <Image width={240} height={120}
          src="/video.svg" alt="VideoStation Logo" />
            <p className={styles.text}>VideoStation</p>
        </div>
      </Link>
    </nav>
  )
} 