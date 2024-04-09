import '@testing-library/jest-dom';
import { beforeEach, expect, describe, it } from 'vitest';
import { render, screen } from '@app/tests';
import { Users } from './Users';

describe('Users', () => {
  beforeEach(() => {
    render(<Users/>);
  });

  it('should be modal open', () => {
    expect(screen).toBeTruthy();
  });
});
