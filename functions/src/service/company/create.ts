import { Request } from "../../model/request";
import { db } from "../../client";
import { Company } from "../../model/company/company";

export class CreateCompany {
    async execute(req: Request) {

        // Verify request data
        const data = new Company(req.data);

        // Generate reference
        const ref = db().collection("company").doc();

        // Set internal data
        data.id = ref.id;
        data.created = new Date();
        data.updated = data.created;

        // Update database
        await ref.set(data);
    }
}