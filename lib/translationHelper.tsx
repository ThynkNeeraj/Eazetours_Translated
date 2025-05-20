import english from "../locale/en.json";
import spanish from "../locale/es.json";
import german from "../locale/de.json";

export const getTranslations = (locale: string) => {
  if (locale === "en") {
    return english;
  } else if (locale === "es") {
    return spanish;
  } else if (locale === "de") {
    return german;
  }

  return english;
};
