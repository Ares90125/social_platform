export type InputProps = {
  currentTab: CurrentTab;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};
export type CurrentTab = {
  key: string;
  label: string
};
