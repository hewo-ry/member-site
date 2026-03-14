import { getOptireAccessToken } from '../utils';
import { ApiResponse, ProblemDetails } from './types';

const handleResponse = async <T>(res: Response): Promise<{ data: T; error: undefined }> => {
    const contentType = res.headers.get('Content-Type');
    if (!res.ok) {
        return Promise.reject(
            contentType?.startsWith('application/problem+json')
                ? await res.json()
                : {
                      type: 'https://hewo.dev/member-site/ResponseNotOk',
                      title: res.statusText,
                      status: res.status,
                      detail: await res.text(),
                      instance: res.url,
                  },
        );
    }
    return contentType?.startsWith('application/json')
        ? { data: await res.json(), error: undefined }
        : res.headers.get('Content-Length') === '0'
          ? ({ data: null, error: undefined } as { data: T; error: undefined })
          : Promise.reject({
                type: 'https://hewo.dev/member-site/InvalidResponse',
                title: `Invalid response: Content-Type: ${contentType}`,
                status: res.status,
                detail: await res.text(),
                instance: res.url,
            });
};

export const handleErrorResponse = (
    err: Error | ProblemDetails,
    path: string,
): { data: undefined; error: ProblemDetails } => ({
    data: undefined,
    error:
        'type' in err
            ? err
            : {
                  type: 'https://hewo.dev/member-site/RequestFailed',
                  title: 'Request to API failed',
                  status: 0,
                  detail: err.message,
                  instance: path,
                  properties: err.cause ? JSON.parse(JSON.stringify(err.cause)) : null,
              },
});

const api = (url?: string) => ({
    get: async <T>(path: string): Promise<ApiResponse<T>> =>
        getOptireAccessToken()
            .then((accessToken) => {
                if (!url) throw new Error('Missing required env variable: OPTIRE_API_URL');
                return fetch(`${url}/${path}`, {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
            })
            .then(handleResponse<T>)
            .catch((err) => handleErrorResponse(err, path)),

    post: async <T>(path: string, body: unknown): Promise<ApiResponse<T>> =>
        getOptireAccessToken()
            .then((accessToken) => {
                if (!url) throw new Error('Missing required env variable: OPTIRE_API_URL');
                return fetch(`${url}/${path}`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify(body),
                });
            })
            .then(handleResponse<T>)
            .catch((err) => handleErrorResponse(err, path)),

    delete: async <T>(path: string): Promise<ApiResponse<T>> =>
        getOptireAccessToken()
            .then((accessToken) => {
                if (!url) throw new Error('Missing required env variable: OPTIRE_API_URL');
                return fetch(`${url}/${path}`, {
                    method: 'DELETE',
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
            })
            .then(handleResponse<T>)
            .catch((err) => handleErrorResponse(err, path)),
});

export default api(process.env.OPTIRE_API_URL);
