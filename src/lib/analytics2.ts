export const sendEvent = (eventName: string, eventProperties = {}) => {
  console.log("analytics 2", { eventName, eventProperties });
};
