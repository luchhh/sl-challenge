import { createAction } from "@reduxjs/toolkit";
import { SendEventProps } from "../lib/analytics1";

const TRACK_EVENT_ACTION = "track/event";
export const buttonClicked = createAction<SendEventProps>(TRACK_EVENT_ACTION);
