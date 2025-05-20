import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import packageData from "./data/packages.json";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/packages")) {
    const packagePath = request.nextUrl.pathname;
    const packagePathReplaced = packagePath.replace("/packages/", "");
    const packageId = parseInt(packagePathReplaced);
    if (!Number.isNaN(packageId) && packageId < 36 && packageId > 0) {
      const tourPackage = packageData.filter(function (tourPackage) {
        return tourPackage.Id == packageId;
      })[0];
      return NextResponse.redirect(new URL(`/packages/${tourPackage.Uri}`, request.url), {
        status: 308,
      });
    }
    if (request.nextUrl.pathname.endsWith("packages/wildlife-tours")) {
      return NextResponse.redirect(
        new URL(`/packages/wildlife-safari-tour-package-india`, request.url),
        { status: 308 }
      );
    }
    if (request.nextUrl.pathname.endsWith("packages/tribals-tours")) {
      return NextResponse.redirect(
        new URL(`/packages/gujarat-tribal-tour-package-india`, request.url),
        { status: 308 }
      );
    }
    if (request.nextUrl.pathname.endsWith("packages/luxury-trains")) {
      return NextResponse.redirect(new URL(`/packages`, request.url), { status: 308 });
    }
  }
}
