import { NextResponse } from "next/server";
import axios from "axios";
import { getDomainForPythonApp } from "../../utilities/getDomain"

export async function POST(request: Request) {
  try {
    // Basic rate limiting check (you might want to implement a more sophisticated solution)
    // const clientIP = request.headers.get('x-forwarded-for') || 'unknown';

    const data = await request.json();

    if (!data || typeof data !== "object") {
      return NextResponse.json({ error: "Invalid request format" }, { status: 400 });
    }

    if (data.error && typeof data.error === "string" && data.error.trim() !== "") {
      return NextResponse.json({ error: `There is an issue with your location data. ${data.error}` }, { status: 400 });
    }

    if (!data.data || typeof data.data !== "object") {
      return NextResponse.json({ error: "Missing location data" }, { status: 400 });
    }

    const { address, lon, lat, timezone } = data.data;

    if (!address || !lon || !lat || !timezone) {
      return NextResponse.json({ error: "Missing required fields. Please insert location again." }, { status: 400 });
    }

    if (typeof address !== "string" || address.trim() === '') {
      return NextResponse.json({ error: "Invalid address." }, { status: 422 });
    }

    if (typeof timezone !== "string" || timezone.trim() === '') {
      return NextResponse.json({ error: "Invalid timezone." }, { status: 422 });
    }

    if (isNaN(Number(lon)) || isNaN(Number(lat))) {
      return NextResponse.json({ error: "Longitude and/or Latitude is not a number." }, { status: 422 });
    }

    try {
      const flaskRes = await axios.post(`${getDomainForPythonApp()}/get_uv_data`, data)
      return NextResponse.json(flaskRes.data, { status: flaskRes.status });
    } catch (err: unknown) {
      const axiosError = err as { response?: { data: string; status: number } };
      if (axiosError.response) {
        return NextResponse.json({ error: `An error occurred. ${axiosError.response.data}` }, { status: axiosError.response.status });
      }
      return NextResponse.json({ error: "Network error or server unavailable" }, { status: 500 });
    }
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
