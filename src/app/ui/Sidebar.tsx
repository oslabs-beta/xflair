import styles from '../Sidebar.module.css'
import Image from "next/image";


const Sidebar = () => {
    return (
        <div className = {styles.sidebar}>
            <div className = {styles.sideBarLogoContainer}>
            <Image
              src="/logoBlack.png"
              alt="Logo"
              className={styles.sideBarLogo}
              width={69}
              height={90}
              priority
            />
            {/* <img className={styles.sideBarTitle} src="/title.png" alt="titleText" /> */}
          </div>
        <ul>
            <li className = {styles.menuItem}>Home</li>
            <li className = {styles.menuItem}>About</li>
            <li className = {styles.menuItem}>Contact</li>
        </ul>
        <div className = {styles.footer}>
            @2024 xFlair
        </div>
        </div>
    );
};

export default Sidebar;