import { ArabicString } from "arabic-utils";
let removeDiacritics = (value: string): string => {
    let removedDiacritics = ArabicString(value).removeDiacritics();

    //! remove normalize Alef
    // let normalizedAlef = ArabicString(removedDiacritics).normalizeAlef();

    //! remove normalize teh
    // const normalizedTeh = normalizeTeh(removedDiacritics);

    return removedDiacritics;
};
export { removeDiacritics };
