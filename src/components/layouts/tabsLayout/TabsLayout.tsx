import React from 'react';
import { Tabs } from '../../tabs/Tabs';
import * as TS from './tabsLayout.styled';

type TabsLayoutProps = {
  topSection?: React.ReactNode;
  tabs: {
    value: string;
    tabContent: React.ReactNode;
    tabPanelContent: React.ReactNode;
    disabled?: boolean;
  }[];
  defaultTab?: string;
  sticky?: boolean;
  isFullWidth?: boolean;
  fullWidthTabs?: (number | string)[];
};

export const TabsLayout: React.FC<TabsLayoutProps> = ({
  topSection,
  tabs,
  defaultTab,
  sticky,
  fullWidthTabs,
  isFullWidth,
}) => (
  <TS.MainWrapper>
    {topSection && <TS.TopSectionWrapper>{topSection}</TS.TopSectionWrapper>}
    <Tabs
      sticky={sticky}
      tabs={tabs}
      defaultTab={defaultTab}
      fullWidthTabs={fullWidthTabs}
      isFullWidth={isFullWidth}
    />
  </TS.MainWrapper>
);
