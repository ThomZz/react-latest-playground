// jsdom doesn't provide TextEncoder/TextDecoder, but react-router v7
// requires them at import time. Polyfill from Node's util before tests run.
import { TextEncoder, TextDecoder } from 'node:util'

Object.assign(globalThis, { TextEncoder, TextDecoder })

// Adds custom matchers like toBeInTheDocument(), toHaveTextContent(), etc.
import '@testing-library/jest-dom'
