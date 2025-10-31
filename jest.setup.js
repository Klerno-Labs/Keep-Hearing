require('@testing-library/jest-dom');

// Mock Next.js Web API globals
global.Request = class Request {};
global.Response = class Response {};
global.Headers = class Headers {};
global.ReadableStream = class ReadableStream {};
global.TransformStream = class TransformStream {};
global.WritableStream = class WritableStream {};
global.Blob = class Blob {};
global.File = class File extends Blob {};
global.FormData = class FormData {};
global.TextEncoder = class TextEncoder {};
global.TextDecoder = class TextDecoder {};
