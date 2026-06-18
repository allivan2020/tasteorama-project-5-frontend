import axios from "axios";
import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL;

export async function GET() {
    const res = await axios.get(`${BACKEND_URL}/categories`);
    return NextResponse.json(res.data);
};