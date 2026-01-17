import { apiLogger } from './apiLogger';

export interface APIValidationResult {
    isValid: boolean;
    error?: string;
}

export function validateAPIResponse(data: any): APIValidationResult {
    if (data["Note"]) {
        apiLogger.limitReached(data["Note"]);
        return { isValid: false, error: "API limit reached" };
    }

    if (data["Information"]) {
        apiLogger.information(data["Information"]);
        return { isValid: false, error: "API information message received" };
    }

    if (data["Error Message"]) {
        apiLogger.error(data["Error Message"]);
        return { isValid: false, error: "API error message received" };
    }

    if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
        apiLogger.emptyResponse();
        return { isValid: false, error: "Empty API response" };
    }

    return { isValid: true };
}

export function extractField(data: any, fieldNames: string[]): string {
    for (const name of fieldNames) {
        if (data[name]) return data[name];
    }
    return "N/A";
}

