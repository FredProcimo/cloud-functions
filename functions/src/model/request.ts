import { StatusCode } from "../enum/status";

export type RequestService = {
    action: string;
    service: any;
};

/**
 * This is added to every request so we can have more information
 */
export class Request {
    status: string = StatusCode.PENDING;
    issuedBy!: string;
    action!: string;
    data: any;

    constructor(request: any) {
        Object.assign(this, request);
    }
}