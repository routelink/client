import '@testing-library/jest-dom';
import { beforeEach, expect, describe, it, vi } from 'vitest';
import { render, screen } from '@app/tests';
import { AvatarDialog } from '@app/components/Profile/Dialogs';

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
