
import { useLanguage } from '@/context/LanguageContext';
import { englishTranslations, hindiTranslations } from '@/translations/translations';

export function useTranslations() {
  const { language } = useLanguage();
  
  const t = (key: keyof typeof englishTranslations): string => {
    return language === 'english' 
      ? englishTranslations[key] 
      : hindiTranslations[key];
  };

  return { t };
}
