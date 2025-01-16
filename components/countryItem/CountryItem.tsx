import React, {FC, useState} from 'react';
import Image from "next/image";
import {motion} from "framer-motion";
import {ICountry} from "@/assects/hooks/useCountries";
import {useCountry} from "@/assects/hooks/useCountry";

import s from './CountryItem.module.css'

interface ICountryItem {
    country: ICountry
    removeCountry: (countryCode: string) => void
}

export const CountryItem: FC<ICountryItem> = ({
                                                  country,
                                                  removeCountry
                                              }) => {
    const {handleItemClick} = useCountry(country.iso_code2);

    const defaultFlagUrl = '/globe.svg';
    const [currentFlagUrl, setCurrentFlagUrl] = useState<string>(
        country.flag_url ? `https:${country.flag_url}` : defaultFlagUrl
    );
    const handleImageError = () => {
        setCurrentFlagUrl(defaultFlagUrl);
    };

    const removeCountryHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        removeCountry(country.iso_code2);
    };

    return (
        <motion.li
            initial={{opacity: 0, x: 100}}
            animate={{opacity: 1, x: 0}}
            exit={{opacity: 0, x: 100}}
            transition={{duration: 0.5}}
            className={s.countryItemContainer}
            onClick={handleItemClick}
        >
            <Image
                src={currentFlagUrl}
                alt={`Country name:${country.name_ru}`}
                width={40}
                height={30}
                className={s.countryItemFlag}
                onError={handleImageError}
            />
            <span
                className={s.countryItemName}
            >{country.name_ru}</span>
            <button
                onClick={removeCountryHandler}
                className={s.deleteButton}
            >
                Delete
            </button>
        </motion.li>
    );
};
