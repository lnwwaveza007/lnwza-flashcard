import * as dotenv from 'dotenv';
import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function GET() {
    dotenv.config();
    const client_email = process.env.CLIENT_EMAIL;
    const private_key = process.env.PRIVATE_KEY;
    try {
        const client = new google.auth.JWT(
            client_email, '', private_key, ['https://www.googleapis.com/auth/spreadsheets']
        );

        await client.authorize();

        const gsapi = google.sheets({ version: 'v4', auth: client });

        const spreadsheetInfo = await gsapi.spreadsheets.get({
            spreadsheetId: '1hVBh1myT9ADe0nLtxn64E0QKPYIP6K80qbgfzEywt3w',
            includeGridData: false
        });

        const sheetNames = spreadsheetInfo.data.sheets?.map((sheet) => sheet.properties?.title);
        
        return NextResponse.json(sheetNames, { status: 200 });

    } catch (err: unknown) {
        console.error('Error during API request:', err);
        return NextResponse.json({ error: 'Internal Server Error', details: (err as Error).message }, { status: 500 });
    }
}