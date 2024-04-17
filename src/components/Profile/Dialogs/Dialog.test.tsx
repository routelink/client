import '@testing-library/jest-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Dialog } from '@app/components/Profile/Dialogs';
import { render, screen } from '@app/tests';

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
