import React from 'react';
import { TabPannelWrapper } from './tabPanel.styled';

type TabPanelProps = {
  children?: React.ReactNode;
  index: number | string;
  value: number | string;
  isFullWidth?: boolean;
};

export const TabPanel: React.FC<TabPanelProps> = ({
  children,
  value,
  index,
  isFullWidth,
}) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
  >
    {value === index && (
      <TabPannelWrapper isFullWidth={isFullWidth}>{children}</TabPannelWrapper>
    )}
  </div>
);
