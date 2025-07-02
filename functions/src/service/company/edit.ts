import { Request } from "../../model/request";
import { db } from "../../client";
import { Company } from "../../model/company/company";

export class EditCompany {
    async execute(req: Request) {

        // Verify request data
        const data = new Company(req.data, true);

        // Check id exists
        if(!req.data.id) throw new Error("no-id");

        // Generate reference
        const ref = db().collection("company").doc(req.data.id);

        // Check document exists
        if(!(await ref.get()).exists) throw new Error("not-exist");

        // Set internal data
        data.updated = new Date();

        // Update database
        await ref.set(data, { merge: true });
    }
}