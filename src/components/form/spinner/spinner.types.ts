export type SpinnerWrapperProps = Partial<{ style: React.CSSProperties }>;

export type CircleProps = Partial<{ style: React.CSSProperties }>;

export type SpinnerProps = Partial<{
  spinnerWrapperProps?: SpinnerWrapperProps;
  circleProps?: CircleProps;
}>;
