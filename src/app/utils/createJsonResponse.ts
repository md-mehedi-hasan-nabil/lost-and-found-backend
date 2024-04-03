export const createJsonResponse = {
    success: (statusCode: number, message: string, data?: Record<string, unknown> | Record<string, unknown>[] | null) => {
        return {
            success: true,
            statusCode,
            message,
            data: data ? data : null,
        };
    },

    error: (message: string, err: Error | null) => {
        return {
            success: false,
            message,
            errorDetails: err,
        };
    },
};


