import { del, get, post, put } from './fetch';

const baseUrl = process.env.REACT_APP_GREBBCOMMERCE_API_URL;

const fetchMock = function () {
    const response = {
        json: jest.fn(() => ({
            foo: 'bar',
        })),
    };
    const fetch = jest.fn(() => response);

    return { fetch, response };
};

describe('get()', () => {
    test('simple', async () => {
        const { fetch, response } = fetchMock();

        global.fetch = fetch;

        const json = await get('/test');

        expect(json).toEqual({
            foo: 'bar',
        });

        const [url, fetchOpts] = fetch.mock.calls[0];
        expect(url).toBe(`${baseUrl}/test`);
        expect(fetchOpts.method).toBe('GET');

        expect(response.json).toHaveBeenCalledTimes(1);
    });

    test('query params', async () => {
        const { fetch } = fetchMock();

        global.fetch = fetch;

        await get('/test', { id: 1 });

        const [url] = fetch.mock.calls[0];

        expect(url).toBe(`${baseUrl}/test?id=1`);
    });

    test('query params when path already contains params', async () => {
        const { fetch } = fetchMock();
        global.fetch = fetch;

        await get('/test?q=hello', { id: 1 });

        const [url] = fetch.mock.calls[0];

        expect(url).toBe(`${baseUrl}/test?q=hello&id=1`);
    });

    test('fail json parse', async () => {
        const { fetch, response } = fetchMock();

        const jsonFailError = new Error('json() fail');
        response.json = jest.fn(() => {
            throw jsonFailError;
        });

        global.fetch = fetch;

        let err;

        jest.spyOn(console, 'error');

        try {
            await get('/test', { id: 1 });
        } catch (_err) {
            err = _err;
        }

        expect(err).toBe(jsonFailError);

        expect(console.error).toHaveBeenCalledTimes(1);
        expect(console.error.mock.calls[0][0]).toContain('Unable to fetch and parse');
    });
});

test('post()', async () => {
    const { fetch } = fetchMock();

    global.fetch = fetch;

    await post('/test', { id: 1 });

    const [url, fetchOpts] = fetch.mock.calls[0];

    expect(url).toBe(`${baseUrl}/test`);
    expect(fetchOpts.body).toBe(`id=1`);

    expect(fetchOpts.method).toBe('POST');
    expect(fetchOpts.headers.get('content-type')).toContain('application/x-www-form-urlencoded');
});

test('del()', async () => {
    const { fetch } = fetchMock();

    global.fetch = fetch;

    await del('/test', { id: 1 });

    const [url, fetchOpts] = fetch.mock.calls[0];

    expect(url).toBe(`${baseUrl}/test`);
    expect(fetchOpts.body).toBe(`id=1`);

    expect(fetchOpts.method).toBe('DELETE');
    expect(fetchOpts.headers.get('content-type')).toContain('application/x-www-form-urlencoded');
});

test('put()', async () => {
    const { fetch } = fetchMock();

    global.fetch = fetch;

    await put('/test', { id: 1 });

    const [url, fetchOpts] = fetch.mock.calls[0];

    expect(url).toBe(`${baseUrl}/test`);
    expect(fetchOpts.body).toBe(`id=1`);

    expect(fetchOpts.method).toBe('PUT');
    expect(fetchOpts.headers.get('content-type')).toContain('application/x-www-form-urlencoded');
});
