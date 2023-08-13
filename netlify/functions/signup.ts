import { Handler, HandlerEvent } from "@netlify/functions";
import Airtable from "airtable";
const { AIRTABLE_KEY } = process.env;
const base = new Airtable({ apiKey: AIRTABLE_KEY }).base('appLnIdksqrA3qdr1');

const handler: Handler = async (event: HandlerEvent, context: any) => {

    try {

        const data = JSON.parse(event.body || '');

        if(!data.email || !data.name){
            return {
                statusCode: 400,
                body: 'Missing required fields'
            };
        }

        base('tblHuppTaiqz7AipU').create({
            Name: data.name,
            Email: data.email
        });

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Thank you for signing up!'
            })
        }

    } catch(e: any){

        return {
            statusCode: 500,
            body: e.message
        };
    }
};

export { handler };