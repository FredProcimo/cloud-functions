import { onDocumentCreated } from "firebase-functions/firestore";
import { RequestService } from "../model/request";
import { handleRequest } from "../service/request";
import { region } from "../client";
import { CreateCompany } from "../service/company/create";
import { EditCompany } from "../service/company/edit";

// Here we define the services for each request action
export const services: RequestService[] = [

    // Company Services
    { action: "create-company", service: new CreateCompany() },
    { action: "edit-company", service: new EditCompany() },

];

// Handle Requests (documents created on 'request' collection)
export const onRequest = onDocumentCreated(
    {region, document: "request/{docId}"}, after => handleRequest(after, services)
);
