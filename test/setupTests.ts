import { JSDOM } from 'jsdom';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace NodeJS {
        interface Global {
            document: Document;
            window: Window;
            navigator: Navigator;
        }
    }
}

const { window } = new JSDOM('<!doctype html><html><body></body></html>');
window.open = jest.fn();

Object.defineProperty(window, 'location', {
    value: {
        hash: {
            endsWith: jest.fn(),
            includes: jest.fn()
        },
        assign: jest.fn()
    },
    writable: true
});

global.document = window.document;
global.window = global.document.defaultView as Window & typeof globalThis;

const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn(),
    key: jest.fn(),
    removeItem: jest.fn(),
    length: 5,
};
global.localStorage = localStorageMock;
