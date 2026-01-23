import type { holidayFormDataPayload } from "./holidaySchema";

export const holidayDefaultValues : holidayFormDataPayload  = {
      date: new Date(),
      day: "",
      name: "",
      holidayType: 0,
}