import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST() {
  revalidateTag("prismic-repository");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
