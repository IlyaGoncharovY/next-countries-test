import React from 'react';
import Link from "next/link";

import s from './Navbar.module.css';

export const Navbar = () => {
    return (
        <div className={s.navbarContainer}>
            <Link href={'/'}>Home next</Link>
            <Link href={'/countries'}>Countries</Link>
        </div>
    );
};
