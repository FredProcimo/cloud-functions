import { onDocumentCreated } from "firebase-functions/firestore";
import { RequestService } from "../model/request";
import { handleRequest } from "../service/request";
import { db, region } from "../client";
import { CreateCompany } from "../service/company/create";
import { EditCompany } from "../service/company/edit";
import { onRequest } from "firebase-functions/https";
import { StatusCode } from "../enum/status";

// Here we define the services for each request action
export const services: RequestService[] = [

    // Company Services
    { action: "create-company", service: new CreateCompany() },
    { action: "edit-company", service: new EditCompany() },

];

// Handle Requests (documents created on 'request' collection)
export const request = onDocumentCreated(
    {region, document: "request/{docId}"}, after => handleRequest(after, services)
);

// Test function to call via postman
export const postman = onRequest({cors: ["*"]}, async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).send('Method Not Allowed');
        return;
    }
    const ref = await db().collection("request").add(req.body)
    ref.onSnapshot((snap) => {
        const data = snap.data()
        if(data.status === StatusCode.ACCEPTED){
            res.status(200).json({status: data.status})
        }
        if(data.status === StatusCode.FAILURE){
            res.status(500).json({status: data.status, error: data.error})
        }
    })
})
