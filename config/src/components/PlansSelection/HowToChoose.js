import React from 'react';
import { BaseBox, BaseContent, BaseHeader } from '../BaseBox';
import { I18n } from 'react-redux-i18n';
import ReactHtmlParser from 'react-html-parser';
import { getSafeContent } from '../../utils/contentoUtil';

// Tag Commander
import { tagClick } from '../../lib/tag';
import {
  HOW_TO_CHOOSE_DOWNLOAD_BROCHURE
} from '../../constants/tags';

class HowToChoose extends React.Component {
  render() {
    const content = I18n.t('contento.how_to_choose_plan.content') !== 'content'
      ? getSafeContent(I18n.t('contento.how_to_choose_plan.content')).join('')
      : [];

    return (
      <div id="how-to-choose">
        <BaseBox>
          <BaseHeader>
            <span className="section-header section-header--sm" style={{ marginBottom: '0' }}>{I18n.t('contento.how_to_choose_plan.title')}</span>
          </BaseHeader>
          <BaseContent>
            {ReactHtmlParser(content)}

            <div className="section-link">
              <a onClick={() => tagClick(HOW_TO_CHOOSE_DOWNLOAD_BROCHURE)} href={I18n.t('contento.how_to_choose_plan.download_link')} target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 16">
                  <path fill="#00008F" fillRule="nonzero" d="M12.34 6H9.67V2h-4v4H3l4.67 4.67L12.34 6zM3 12v1.33h9.33V12H3z" />
                </svg>
                {I18n.t('contento.how_to_choose_plan.download_label')}
              </a>
            </div>
          </BaseContent>
        </BaseBox>
      </div>
    );
  }
}

export default HowToChoose;
