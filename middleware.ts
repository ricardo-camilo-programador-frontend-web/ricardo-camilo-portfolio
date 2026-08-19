import { routing } from "@/i18n/routing";
import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";

export default createMiddleware(routing);

export const config = {
	matcher: ["/((?!api|_next|.*..+).*)"],
};
