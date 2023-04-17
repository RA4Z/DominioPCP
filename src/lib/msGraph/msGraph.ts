import { useEffect, useState } from "react";

interface GraphApiResponse<T> {
    loading: boolean;
    error?: Error;
    data?: T;
}

export function useGraphApi<T>(
    accessToken: string | null,
    graphEndpoint: string
): GraphApiResponse<T> {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error>();
    const [data, setData] = useState<T>();

    useEffect(() => {
        if (!accessToken) return;

        const callApi = async () => {
            setLoading(true);

            try {
                const response = await fetch(graphEndpoint, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(
                        `Failed to call Microsoft Graph API: ${response.statusText}`
                    );
                }

                const responseData = (await response.json()) as T;
                setData(responseData);
            } catch (err: any) {
                setError(err);
            }

            setLoading(false);
        };

        callApi();
    }, [accessToken, graphEndpoint]);

    return { loading, error, data };
}
