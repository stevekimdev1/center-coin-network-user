'use client';

import { useString } from '@/src/context/StringContext';
import LanguageBox from '@/src/components/LanguageBox';

const PrivacyPage = () => {
  const { string } = useString();

  return (
    <div id="privacy">
      <div className="agreement-content-title">
        <div className="agreement-content-title-text">
            {string.policyTitle}
        </div>
        <div className="agreement-content-title-text">
            <LanguageBox />
        </div>
      </div>
      
      <div>
        {string.policyContent.map((value, index) => {
          let result = [];
          if (value.title)
            result.push(
              <div key={'title_' + index} className="agreement-content-title">
                {value.title}
              </div>
            );
          if (value.content) {
            if (Array.isArray(value.content)) {
              // content가 배열인 경우 각 항목을 별도로 렌더링
              value.content.forEach((contentItem, contentIndex) => {
                result.push(
                  <div key={'content_' + index + '_' + contentIndex} className="agreement-content-body">
                    {contentItem}
                  </div>
                );
              });
            } else {
              // content가 문자열인 경우
              result.push(
                <div key={'content_' + index} className="agreement-content-body">
                  {value.content}
                </div>
              );
            }
          }
          return result;
        })}
      </div>
    </div>
  );
};

export default PrivacyPage;
