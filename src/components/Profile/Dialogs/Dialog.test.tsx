import '@testing-library/jest-dom';
import { beforeEach, expect, describe, it, vi } from 'vitest';
import { render, screen } from '@app/tests';
import { Dialog } from '@app/components/Profile/Dialogs';

describe('Renders the dialog component', () => {
  beforeEach(() => {
    const scrollToMock = vi.fn();
    Object.defineProperty(window, 'scrollTo', { value: scrollToMock });
    render(<Dialog open={true} handleClose={() => {}} content={<div />} title="test" />);
  });

  it('should be wrapper', () => {
    expect(screen).toBeTruthy();
  });
});
