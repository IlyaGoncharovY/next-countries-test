import React, {FC, useState} from 'react';
import Image from 'next/image';
import {motion} from 'framer-motion';
import getConfig from 'next/config';

import s from './CountryItem.module.css';

import {ICountry} from '@/assects/types/types';
import {useCountry} from '@/assects/hooks/useCountry';

const { publicRuntimeConfig } = getConfig();

interface ICountryItem {
    country: ICountry
    removeCountry: (countryCode: string) => void
}

/**
 * Компонент для отображения элемента списка стран.
 *
 * @param {ICountry} country - Объект, содержащий данные о стране, такие как название, флаг и коды ISO.
 * @param {function} removeCountry - Функция для удаления страны из списка. Принимает код страны (ISO 3166-1 alpha-2)
 * в качестве аргумента.
 *
 * @example
 * const country = {
 *   name_ru: "Россия",
 *   flag_url: "/path/to/flag",
 *   iso_code2: "RU",
 *   iso_code3: "RUS",
 * };
 *
 * const handleRemoveCountry = (code) => {
 *   console.log(`Удаление страны с кодом: ${code}`);
 * };
 *
 * <CountryItem country={country} removeCountry={handleRemoveCountry} />
 */
export const CountryItem: FC<ICountryItem> = ({
  country,
  removeCountry,
}: ICountryItem) => {
  const {handleItemClick} = useCountry(country.iso_code2);

  const basePath = publicRuntimeConfig?.basePath || '';
  const defaultFlagUrl = `${basePath}/globe.svg`;

  const [currentFlagUrl, setCurrentFlagUrl] = useState<string>(
    country.flag_url ? `https:${country.flag_url}` : defaultFlagUrl,
  );
  const handleImageError = () => {
    setCurrentFlagUrl(defaultFlagUrl);
  };

  const removeCountryHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    removeCountry(country.iso_code2);
  };

  const isExternalUrl = (url: string) => url.startsWith('https://') || url.startsWith('http://');

  return (
    <motion.li
      initial={{opacity: 0, x: 100}}
      animate={{opacity: 1, x: 0}}
      exit={{opacity: 0, x: 100}}
      transition={{duration: 0.5}}
      className={s.countryItemContainer}
      onClick={handleItemClick}
    >
      {isExternalUrl(currentFlagUrl) ? (
        <img
          src={currentFlagUrl}
          alt={`Country name: ${country.name_ru}`}
          width={40}
          height={30}
          className={s.countryItemFlag}
          onError={handleImageError}
        />
      ) : (
        <Image
          src={currentFlagUrl}
          alt={`Country name: ${country.name_ru}`}
          width={40}
          height={30}
          className={s.countryItemFlag}
          onError={handleImageError}
        />
      )}
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
