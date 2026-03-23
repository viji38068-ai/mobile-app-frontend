import * as React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Button } from './button'
import '@testing-library/jest-dom'

describe('Button', () => {
  it('renders button with default props', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
  })

  it('renders with variant="outline"', () => {
    render(<Button variant="outline">Outline</Button>)
    const button = screen.getByRole('button', { name: /outline/i })
    expect(button).toHaveClass('border')
  })

  it('renders with size="sm"', () => {
    render(<Button size="sm">Small</Button>)
    const button = screen.getByRole('button', { name: /small/i })
    expect(button).toHaveClass('h-8')
  })

  it('is disabled when disabled', () => {
    render(<Button disabled>Disabled</Button>)
    const button = screen.getByRole('button', { name: /disabled/i })
    expect(button).toBeDisabled()
  })

  it('handles asChild prop', () => {
    const { container } = render(<Button asChild><span>Child</span></Button>)
    const slot = container.querySelector('[data-slot="button"]')
    expect(slot).not.toBeNull()
  })

  it('calls onClick handler', () => {
    const handleClick = vi.fn()
    const { getByText } = render(<Button onClick={handleClick}>Click</Button>)
    fireEvent.click(getByText('Click'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
