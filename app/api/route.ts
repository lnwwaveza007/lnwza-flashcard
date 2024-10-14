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

        // CUSTOMIZATION FROM HERE
        const opt = {
            spreadsheetId: '1hVBh1myT9ADe0nLtxn64E0QKPYIP6K80qbgfzEywt3w',
            range: 'SheetName!A2:A'
        };

        const response = await gsapi.spreadsheets.values.get(opt);
        return NextResponse.json(response.data, { status: 200 });

    } catch (err: unknown) {
        console.error('Error during API request:', err);
        return NextResponse.json({ error: 'Internal Server Error', details: (err as Error).message }, { status: 500 });
    }
}