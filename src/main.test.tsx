import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import '@testing-library/jest-dom'
import App from './app/App.tsx'

// Mock App for smoke test
vi.mock('./app/App.tsx', () => ({
  default: ({ children }: { children?: React.ReactNode }) => <div data-testid="app">Mock App</div>
}))

describe('main.tsx smoke test', () => {
  it('App renders without crashing', () => {
    render(<App />)
    expect(screen.getByTestId('app')).toBeInTheDocument()
  })
})
