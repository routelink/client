import '@testing-library/jest-dom';
import { beforeEach, expect, describe, it, vi } from 'vitest';
import { render, screen } from '@app/tests';
import { NameDialog } from '@app/components/Profile/Dialogs';

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
