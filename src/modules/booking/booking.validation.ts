import { z } from "zod";

const createBookingValidationSchema = z.object({
    date : z.string(),
    startTime : z.string(),
    phone : z.string(),
    location: z.string(),
    paymentMethod : z.string(),
    status : z.string().optional(),
    isReturnProcess : z.boolean().optional(),
    isPaid : z.boolean().optional(),
})

export const bookingValidations = {
    createBookingValidationSchema,
}
