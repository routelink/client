import '@testing-library/jest-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { NameDialog } from '@app/components/Profile/Dialogs';
import { render, screen } from '@app/tests';

describe('Renders the NameDialog component', () => {
  beforeEach(() => {
    const scrollToMock = vi.fn();
    Object.defineProperty(window, 'scrollTo', { value: scrollToMock });
    render(<NameDialog name="Иванов И.И." handleClose={() => {}} />);
  });

  it('should be wrapper', () => {
    expect(screen).toBeTruthy();
  });
});
