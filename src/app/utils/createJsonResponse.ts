export const createJsonResponse = {
    success: (statusCode: number, message: string, data?: Record<string, unknown> | null) => {
        return {
            success: true,
            statusCode,
            message,
            data: data ? data : null,
        };
    },

    error: (statusCode: number, message: string, err: Error | null) => {
        return {
            success: false,
            statusCode,
            error: err,
            message,
        };
    },
};


