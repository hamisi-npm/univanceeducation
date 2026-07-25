export type ProcessStepIconName =
  | "message-circle"
  | "map-pin"
  | "file-text"
  | "mail-check"
  | "stamp"
  | "plane-takeoff";

export type ProcessStep = {
  id: string;
  step: number;
  title: string;
  description: string;
  icon: ProcessStepIconName;
};
