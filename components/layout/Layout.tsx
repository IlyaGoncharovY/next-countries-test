import React, {PropsWithChildren, ReactElement} from 'react';
import {NextPage} from "next";
import {Navbar} from "@/components/navbar/Navbar";
import styles from "@/styles/Home.module.css";

export const Layout: NextPage<PropsWithChildren> = ({children}) => {
    return (
        <main className={styles.main}>
            <Navbar/>
            {children}
        </main>
    );
};

export const getLayout = (page: ReactElement) => {
    return <Layout>{page}</Layout>
};
