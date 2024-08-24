import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.union([
    z.number().positive("Price must be a positive number"),
    z.string().min(1, "Product price is required"),
  ]),
});
