import Cookies from "js-cookie";
import { locationData, locationData } from "../../types/locationData"
import { NextRequest, NextResponse } from "next/server";

let locationData: locationData = { error: "", data: { address: "", lat: "", lon: "", timezone: "" }, cookie: false };

export async function GET(request: Request) {
  const locationDataError = locationData.error;
  const { address, lon, lat, timezone } = locationData.data;
  if (!address || !lon || !lat || !timezone) {
    return NextResponse.json({ error: "Missing required fields. Please insert location again." }, { status: 400 })
  } else {
    if (locationDataError) {
      return NextResponse.json({ error: `There is an issue with your location data. ${locationDataError}` }, { status: 400 })
    } else {
      return NextResponse.json(locationData.data, { status: 200 })
    }
  }
}

export async function POST(request: Request) {
  const { error, data, cookie } = await request.json();
  if (!data || cookie === undefined) {
    console.log(data, cookie);
    return NextResponse.json({ error: "Missing required fields. Please insert location again." }, { status: 400 });
  }

  if (typeof data.address !== "string" || data.address.trim() === '') {
    return NextResponse.json({ error: "Invalid address." }, { status: 422 })
  }

  if (typeof data.timezone !== "string" || data.timezone.trim() === '') {
    return NextResponse.json({ error: "Invalid timezone." }, { status: 422 })
  }

  if (isNaN(parseInt(data.lon)) || isNaN(parseInt(data.lat))) {
    return NextResponse.json({ error: "Longitude and/or Latitude is not a number." }, { status: 422 })
  }

  if (typeof error !== "string") {
    return NextResponse.json({ error: "Invalid format for 'error'." }, { status: 422 })
  }

  if (typeof cookie !== "boolean") {
    return NextResponse.json({ error: "Invalid format for 'cookie'." }, { status: 422 })
  }

  locationData = { error: error, data: data, cookie: cookie };

  return NextResponse.json(locationData, { status: 200 });

}
