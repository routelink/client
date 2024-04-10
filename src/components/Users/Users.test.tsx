import '@testing-library/jest-dom';
import { beforeEach, expect, describe, it } from 'vitest';
import { render, screen } from '@app/tests';
import { Users } from './Users';

describe('Users', () => {
  beforeEach(() => {
    render(<Users/>);
  });

  it('should be component initialize', () => {
    expect(screen).toBeTruthy();
  });
});
