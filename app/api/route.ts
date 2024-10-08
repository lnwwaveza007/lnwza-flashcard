import { google } from "googleapis";
import keys from "../../key.json";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const client = new google.auth.JWT(
            keys.client_email, '', keys.private_key, ['https://www.googleapis.com/auth/spreadsheets']
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

    } catch (err: any) {
        console.error('Error during API request:', err);
        return NextResponse.json({ error: 'Internal Server Error', details: err.message }, { status: 500 });
    }
}