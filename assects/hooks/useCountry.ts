import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {ICountry} from "@/assects/types/types";
import {CountryAPI} from "@/assects/api/CountryAPI";
import {Nullable} from "@/assects/types/commonTypes";

/**
 * Кастомный хук для получения и управления данными конкретной страны.
 *
 * @param {string | undefined} iso_code2 - Код страны в формате ISO 3166-1 alpha-2, для которой нужно получить данные.
 * @returns {Object} - Объект, возвращаемый хуком.
 * @returns {ICountry | null} country - Данные о стране, соответствующей переданному ISO-коду. Возвращает `null`, если данные не найдены или ещё загружаются.
 * @returns {boolean} loading - Указывает, загружаются ли данные о стране в текущий момент.
 * @returns {function} handleItemClick - Функция для перехода на страницу с деталями выбранной страны.
 *
 * @example
 * const { country, loading, handleItemClick } = useCountry("US");
 *
 * if (loading) {
 *   return <p>Загрузка...</p>;
 * }
 *
 * if (country) {
 *   console.log(country.name_ru); // Выводит название страны на русском.
 * }
 *
 * handleItemClick(); // Переходит на страницу с деталями страны.
 */
export const useCountry = (
    iso_code2: string | undefined
) => {
    const router = useRouter();
    const [country, setCountry] = useState<Nullable<ICountry>>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!iso_code2) return;

        const loadCountry = async () => {
            setLoading(true);
            try {
                const countries = await CountryAPI.fetchCountries();
                const foundCountry = countries.find((c) => c.iso_code2 === iso_code2);
                setCountry(foundCountry || null);
            } catch (error) {
                console.error('Error fetching countries:', error);
            } finally {
                setLoading(false);
            }
        };

        loadCountry();
    }, [iso_code2]);

    const handleItemClick = () => {
        if (iso_code2) {
            router.push(`/countries/item/${iso_code2}`);
        }
    };

    return {
        country,
        loading,
        handleItemClick,
    };
};
