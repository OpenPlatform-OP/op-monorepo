import React from 'react';
import { render } from '@testing-library/react';

import Index from '../pages';

describe('pages > index', () => {
  it('should render feature menu', () => {
    const { baseElement } = render(<Index />);
    expect(baseElement).toBeTruthy();
  });
});
