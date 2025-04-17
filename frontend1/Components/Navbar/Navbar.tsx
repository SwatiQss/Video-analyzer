import Link from 'next/link'
import React from 'react';
import { NavItem } from './types/Navbar'//importing the navbar type
import styles from "./Navbar.module.css"

//creating the Navitem
const navItems: NavItem[] = [
    { label: 'AI Tools', href: '/tools' },
    { label: 'Login', href: '/login' },
    { label: 'Services', href: '/services' },
    { label: 'Contact us', href: '/contact' }
];



const Navbar: React.FC = () => {
    return (
        <nav className={styles.nav}>
            <div className={styles.logo}>LOGO</div>
            <div className={styles.innerNav}>
                <div className={styles.menu}>
                    {navItems.map((item) => (
                        <Link key={item.href} href={item.href} className='link'>
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
            <div className={styles.btn}>
        Login

            </div>

        </nav>
    )
};
export default Navbar;

