import * as z from "zod"

export const eventFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 character"),
  description: z
    .string()
    .min(3, "Description must be at least 3 character")
    .max(1000, "Description must be at least 3 character"),
  location: z
    .string()
    .min(3, "location must be at least 3 character")
    .max(400, "location must be at least 3 character"),
  imageUrl: z.string(),
  startDateTime: z.date(),
  endDateTime: z.date(),
  categoryId: z.string(),
  price: z.string(),
  isFree: z.boolean(),
  url: z.string().url(),
})
