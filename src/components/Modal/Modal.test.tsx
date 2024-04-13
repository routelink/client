import '@testing-library/jest-dom';
import { beforeEach, describe, expect, it } from 'vitest';

import { render, screen } from '@app/tests';

import { Modal } from './Modal';

describe('Modal', () => {
  beforeEach(() => {
    render(<Modal isOpen={true} />);
  });

  it('should be modal open', () => {
    expect(screen).toBeTruthy();
  });
});
