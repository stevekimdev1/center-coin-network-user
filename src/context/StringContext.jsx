'use client';
import { createContext, useContext, useState } from 'react';
import StringKo from '@/src/language/StringKo';
import StringEn from '@/src/language/StringEn';
import StringZh from '@/src/language/StringZh';
import StringJa from '@/src/language/StringJa';

const StringContext = createContext();

export const useString = () => {
  const context = useContext(StringContext);
  if (!context) {
    throw new Error('useString must be used within a StringProvider');
  }
  return context;
};

export const StringProvider = ({ children }) => {
  const [language, setLanguage] = useState('ko');

  const getStringByLanguage = (lang) => {
    switch (lang) {
      case 'ko':
        return StringKo;
      case 'en':
        return StringEn;
      case 'zh':
        return StringZh;
      case 'ja':
        return StringJa;
      default:
        return StringKo;
    }
  };

  const string = getStringByLanguage(language);

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <StringContext.Provider value={{ string, language, changeLanguage }}>
      {children}
    </StringContext.Provider>
  );
}; 