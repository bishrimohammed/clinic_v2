import { z } from "zod";

const clinicProfileSchema = z.object({
  id: z.number().int(""),
  name: z.string({ required_error: "Required" }).trim(),
});
