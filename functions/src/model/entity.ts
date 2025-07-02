import { ZodError, ZodObject } from "zod";

/**
 * This will be shared by all models
 */
export class Entity {
    id: string;
    created: Date
    updated: Date

    /**
     * Validate Zod Schema
     */
    static validate(schema: ZodObject<any>, data: any, partial = false) {
        try {
            return partial ? schema.partial().parse(data) : schema.parse(data) as any;
        } catch (err) {
            if (err instanceof ZodError) {
                const first = err.errors[0]
                const required = "required-" + first.path[0]
                const invalid = "invalid-" + first.path[0]
                const error = first.message === "Required" ? required : invalid
                throw new Error(error)
            } else {
                throw new Error(err.code)
            }
        }
    }
}