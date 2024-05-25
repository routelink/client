import { beforeEach, describe, expect, it } from 'vitest';

import { render, screen } from '@app/tests';

import { Employees } from './Employees';

describe('Employyes', () => {
  beforeEach(() => {
    render(<Employees />);
  });

  it('should be component initialize', () => {
    expect(screen).toBeTruthy();
  });
});
