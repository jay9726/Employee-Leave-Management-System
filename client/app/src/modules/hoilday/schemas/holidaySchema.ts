import z from "zod";

export const holidaySchema = z.object({
  date: z.date(),
  day: z.string().min(1),
  name: z.string().min(1),
  holidayType: z.number(),
});

export type holidayFormDataPayload = z.infer<typeof holidaySchema>;

