import { z } from 'zod';
import { Entity } from '../entity';
import { phoneRegex } from '../../utils';

const schema = z.object({
    name: z.string(),
    email: z.string().email(),
    address: z.string().optional(),
    phone: z.string().regex(phoneRegex).optional(),
    iban: z.string().optional(),
    vat: z.string().optional(),
});

export class Company extends Entity {
    name: string;
    email: string;
    address: string;
    phone: string;
    iban: string;
    vat: string;

    constructor(data: typeof schema._type, partial = false) {
        super();
        const parsed = Entity.validate(schema, data, partial);
        Object.assign(this, parsed);
        return parsed;
    }
}
