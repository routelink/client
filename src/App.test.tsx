import '@testing-library/jest-dom';
import { beforeEach, expect, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('Renders the main page', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('should be wrapper', () => {
    expect(screen).toBeTruthy();
  });
});
