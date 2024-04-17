import '@testing-library/jest-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { AvatarDialog } from '@app/components/Profile/Dialogs';
import { render, screen } from '@app/tests';

describe('Renders the AvatarDialog component', () => {
  beforeEach(() => {
    const scrollToMock = vi.fn();
    Object.defineProperty(window, 'scrollTo', { value: scrollToMock });
    render(<AvatarDialog handleClose={() => {}} />);
  });

  it('should be wrapper', () => {
    expect(screen).toBeTruthy();
  });
});
