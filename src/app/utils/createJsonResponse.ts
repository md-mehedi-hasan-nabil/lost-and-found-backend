export const createJsonResponse = {
    success: (message: string, data?: Record<string, unknown> | null) => {
        return {
            success: true,
            message,
            data: data ? data : null,
            error: null
        };
    },

    error: (message: string, err: Error | null) => {
        return {
            success: false,
            error: err,
            message,
        };
    },
};


