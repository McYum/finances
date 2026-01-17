export const apiLogger = {
    request: (symbol: string) => {
        console.log(
            '%c🔄 API Request',
            'color: #3b82f6; font-weight: bold; font-size: 14px',
            `Fetching ${symbol} from Alpha Vantage...`
        );
    },

    success: (symbol: string) => {
        console.log(
            '%c✅ API Success',
            'color: #10b981; font-weight: bold; font-size: 14px',
            `Successfully loaded ${symbol} data from API`
        );
    },

    limitReached: (message: string) => {
        console.log(
            '%c⚠️ API Limit Reached',
            'color: #f59e0b; font-weight: bold; font-size: 14px',
            message
        );
    },

    information: (message: string) => {
        console.log(
            '%c⚠️ API Information',
            'color: #f59e0b; font-weight: bold; font-size: 14px',
            message
        );
    },

    error: (message: string) => {
        console.log(
            '%c❌ API Error',
            'color: #ef4444; font-weight: bold; font-size: 14px',
            message
        );
    },

    emptyResponse: () => {
        console.log(
            '%c❌ Empty Response',
            'color: #ef4444; font-weight: bold; font-size: 14px',
            'Received empty or invalid data'
        );
    },

    fallback: (error: Error | unknown) => {
        console.log(
            '%c⚠️ Fallback to Demo Data',
            'color: #f59e0b; font-weight: bold; font-size: 14px',
            error instanceof Error ? error.message : 'Unknown error'
        );
    },

    demoMode: () => {
        console.log(
            '%c💡 Demo Mode Active',
            'color: #8b5cf6; font-weight: bold; font-size: 14px',
            'USE_API is set to false in constants/api.ts'
        );
    },

    loadingDemo: (symbol: string) => {
        console.log(
            '%c📊 Loading Demo Data',
            'color: #6366f1; font-weight: bold; font-size: 14px',
            `Using mock data for ${symbol}`
        );
    }
};

