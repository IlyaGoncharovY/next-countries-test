import {useRouter} from 'next/router';

import {useCountriesContext} from '@/contexts/CountriesContext';
import {Nullable} from '@/assects/types/commonTypes';
import {ICountry} from '@/assects/types/types';

/**
 * Кастомный хук для получения и управления данными конкретной страны.
 *
 * @param {string | undefined} iso_code2 - Код страны в формате ISO 3166-1 alpha-2, для которой нужно получить данные.
 * @returns {Object} - Объект, возвращаемый хуком.
 * @returns {ICountry | null} country - Данные о стране, соответствующей переданному ISO-коду.
 * Возвращает `null`, если данные не найдены или ещё загружаются.
 * @returns {function} handleItemClick - Функция для перехода на страницу с деталями выбранной страны.
 *
 * @example
 * const { country, handleItemClick } = useCountry("US");
 *
 * if (country) {
 *   console.log(country.name_ru); // Выводит название страны на русском.
 * }
 *
 * handleItemClick(); // Переходит на страницу с деталями страны.
 */
export const useCountry = (
  iso_code2: string | undefined,
): { country: Nullable<ICountry>, handleItemClick: () => void } => {
  const router = useRouter();
  const {countryList} = useCountriesContext();
  const country = countryList?.find((c) => c.iso_code2 === iso_code2) || null;

  const handleItemClick = () => {
    if (iso_code2) {
      router.push(`/countries/item/${iso_code2}`);
    }
  };

  return {
    country,
    handleItemClick,
  };
};
