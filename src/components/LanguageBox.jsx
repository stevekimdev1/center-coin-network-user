'use client';
import React, { useState } from 'react';
import { GlobalOutlined } from '@ant-design/icons';
import { useString } from '@/src/context/StringContext';
import './LanguageBox.css';

const LanguageBox = () => {
  const { language, changeLanguage } = useString();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' }
  ];

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="language-box">
      <div className="language-trigger" onClick={toggleDropdown}>
        <GlobalOutlined className="language-icon" />
      </div>
      
      {isOpen && (
        <div className="language-dropdown">
          {languages.map((lang) => (
            <div
              key={lang.code}
              className={`language-option ${language === lang.code ? 'active' : ''}`}
              onClick={() => handleLanguageChange(lang.code)}
            >
              <span className="language-flag">{lang.flag}</span>
              <span className="language-name">{lang.name}</span>
            </div>
          ))}
        </div>
      )}
      
      {isOpen && (
        <div className="language-overlay" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export default LanguageBox;
