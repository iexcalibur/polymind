import {
  SettingHeader,
  SettingRow,
  SettingWrapper,
} from '@affine/component/setting-components';

import * as styles from './style.css';

export const AboutAffine = () => {
  return (
    <>
      <SettingHeader
        title="About PolyMind"
        subtitle="Your AI-powered second brain"
        data-testid="about-title"
      />
      <SettingWrapper title="Version">
        <SettingRow
          name="PolyMind"
          desc={BUILD_CONFIG.appVersion}
          className={styles.appImageRow}
        />
        <SettingRow name="Editor" desc={BUILD_CONFIG.editorVersion} />
      </SettingWrapper>
      <SettingWrapper title="About">
        <p style={{ padding: '0 16px', lineHeight: 1.6, opacity: 0.7 }}>
          PolyMind is a local-first knowledge workspace inspired by the polymath
          ideal — connecting notes, docs, and AI in one place. Your data stays
          on your device. Your AI runs on your API key. No cloud, no accounts,
          no subscriptions.
        </p>
      </SettingWrapper>
    </>
  );
};
