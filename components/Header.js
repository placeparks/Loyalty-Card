import { ConnectWallet } from "@thirdweb-dev/react"
import Link from "next/link"
import styles from "../styles/Header.module.css"

export const Header = () => {
  return (
    <nav className={styles.header}>
      <div style={{ width: "200px"}}>
        <Link href="/">
        <h1>Mirac.Eth</h1>
        </Link>
      </div>

      <Link href="/admin" className={styles.link}>
        Admin Dashboard
      </Link>

      <div style={{ width: "200px" }}>
        <ConnectWallet theme="dark" />
      </div>
    </nav>
  )
}
