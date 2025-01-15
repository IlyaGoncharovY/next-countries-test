import React, {FC} from 'react';
import Image from "next/image";
import {motion} from "framer-motion";
import {ICountry} from "@/assects/hooks/useCountry";

import s from './CountryItem.module.css'

interface ICountryItem {
    country: ICountry
    removeCountry: (countryCode: string) => void
}

export const CountryItem: FC<ICountryItem> = ({
                                                  country,
                                                  removeCountry
                                              }) => {
    return (
        <motion.li
            initial={{opacity: 0, x: 100}}
            animate={{opacity: 1, x: 0}}
            exit={{opacity: 0, x: 100}}
            transition={{duration: 0.5}}
            className={s.countryItemContainer}
        >
            <img
                src={`https:${country.flag_url}`}
                alt={`Country name:${country.name_ru}`}
                width={40}
                height={30}
                className={s.countryItemFlag}
            />
            <span
                className={s.countryItemName}
            >{country.name_ru}</span>
            <button
                onClick={() => removeCountry(country.iso_code2)}
                className={s.deleteButton}
            >
                Delete
            </button>
        </motion.li>
    );
};
