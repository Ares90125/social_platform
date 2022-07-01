import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { Tooltip } from '../tooltip/Tooltip';
import { TabPanel } from './components/tabPanel/TabPanel';
import * as TS from './tabs.styled';

const a11yProps = (
  index: number | string,
): { id: string; 'aria-controls': string } => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
});

const getIndex = (index: number | string): string => `simple-tab-${index}`;

type TabsProps = {
  tabs: {
    value: string | number;
    tabContent: React.ReactNode;
    tabPanelContent: React.ReactNode;
    disabled?: boolean;
  }[];
  sticky?: boolean;
  isFullWidth?: boolean;
  fullWidthTabs?: (number | string)[];
  defaultTab?: string | number;
};

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  sticky,
  fullWidthTabs,
  isFullWidth,
  defaultTab,
}) => {
  const router = useRouter();
  const [value, setValue] = React.useState<number | string>(
    defaultTab || tabs[0].value,
  );

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: number | string,
  ): void => {
    setValue(newValue);
    router.push(`${router.asPath.split('#')[0]}#${newValue}`);
  };

  return (
    <TS.TabsWrapper>
      <TS.TabsListWrapper sticky={sticky}>
        <TS.Tabs
          value={value}
          onChange={handleChange}
          isFullWidth={isFullWidth}
          aria-label="campaign tabs"
        >
          {tabs.map((tab) =>
            tab.disabled ? (
              <Box sx={{ position: 'relative' }} key={getIndex(tab.value)}>
                <Tooltip
                  title={`Please select communities to view the ${tab.value} dashboard`}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      opacity: 0,
                      left: 0,
                      right: 0,
                      top: 0,
                      bottom: 0,
                    }}
                  >
                    {tab.value}
                  </Box>
                </Tooltip>
                <TS.Tab
                  value={tab.value}
                  label={tab.tabContent}
                  disabled={tab.disabled}
                  {...a11yProps(tab.value)}
                />
              </Box>
            ) : (
              <TS.Tab
                value={tab.value}
                label={tab.tabContent}
                key={getIndex(tab.value)}
                {...a11yProps(tab.value)}
              />
            ),
          )}
        </TS.Tabs>
      </TS.TabsListWrapper>
      {tabs.map((tab) => (
        <TabPanel
          value={value}
          key={getIndex(tab.value)}
          index={tab.value}
          isFullWidth={fullWidthTabs?.includes(tab.value)}
        >
          {tab.tabPanelContent}
        </TabPanel>
      ))}
    </TS.TabsWrapper>
  );
};
