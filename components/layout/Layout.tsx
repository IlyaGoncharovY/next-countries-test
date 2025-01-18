import React, {PropsWithChildren, ReactElement} from 'react';
import {NextPage} from "next";
import {Navbar} from "@/components/navbar/Navbar";
import s from "./Layout.module.css";

export const Layout: NextPage<PropsWithChildren> = ({children}) => {
    return (
        <main className={s.layoutContainer}>
            <Navbar/>
            {children}
        </main>
    );
};

export const getLayout = (page: ReactElement) => {
    return <Layout>{page}</Layout>
};
