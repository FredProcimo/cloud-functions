import { DocumentSnapshot } from "firebase-admin/firestore";
import { StatusCode } from "../enum/status";
import { Request } from "../model/request";

/** Handle API Requests */
export const handleRequest = async (
    event: { data: DocumentSnapshot },
    services: Array<{ action: string; service: { execute: (request: Request) => Promise<any> } }>
) => {
    const after = event.data;
    const doc = after.data();

    if (doc) {
        try {
            // get action from services
            const handler = services.find((m) => m.action === doc.action);
            if (!handler) throw new Error("action-not-found");

            // create handler data
            const request = new Request({ ref: after.ref, ...doc });

            // execute handler service
            await handler.service.execute(request);

            // update request
            return after.ref.update({
                created: new Date(),
                status: StatusCode.ACCEPTED,
            });

        } catch (err: any) {
            // set request error
            console.error(`request[${after.ref}] ${StatusCode.FAILURE}`, err);

            return after.ref.update({
                created: new Date(),
                status: StatusCode.FAILURE,
                error: err.message || "Unknown"
            });

        }
    }

    return true;
};