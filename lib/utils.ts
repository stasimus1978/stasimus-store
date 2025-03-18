import * as Sentry from "@sentry/nextjs";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

export function formatNumberWithDecimal(num: number): string {
  const [int, decimal] = num.toString().split(".");
  return decimal ? `${int}.${decimal.padEnd(2, "0")}` : `${int}.00`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatError(error: any): string {
  if (error.name === "ZodError") {
    // Handle Zod validation errors
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fieldErrors = error.errors.map((err: any) => err.message);
    return fieldErrors.join(". ");
  } else if (error.name === "PrismaClientKnownRequestError" && error.code === "P2002") {
    // Handle Prisma unique constraint violation errors
    const field = error.meta?.target ? error.meta.target[0] : "Field";
    return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
  } else if (error.name === "PrismaClientKnownRequestError" && error.code === "P2025") {
    // Handle Prisma "Record not found" errors
    const cause = error.meta?.cause || "Record";
    return `${cause.charAt(0).toUpperCase() + cause.slice(1)} not found`;
  } else if (error.name === "PrismaClientInitializationError") {
    // Handle Prisma database connection errors
    return "Database connection failed. Please check your database configuration.";
  } else if (error.isAxiosError) {
    // Handle Axios HTTP request errors
    return `HTTP Request Failed: ${error.response?.data?.message || error.message}`;
  } else if (error instanceof Error) {
    // Handle generic JavaScript/TypeScript errors
    return error.message;
  } else {
    // Handle unknown errors
    return typeof error.message === "string" ? error.message : JSON.stringify(error);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function handleError(error: any): string {
  const formattedErrorMessage = formatError(error);
  if (process.env.NODE_ENV === "production") {
    Sentry.captureException(error);
  } else {
    console.error("Error in development mode:", error);
  }
  return formattedErrorMessage;
}
