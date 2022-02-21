export type SendEventProps = {
  eventName: string;
  eventProperties?: object;
};

export const sendEvent = ({
  eventName,
  eventProperties = {},
}: SendEventProps) => {
  console.log("analytics 1", { eventName, eventProperties });
};
