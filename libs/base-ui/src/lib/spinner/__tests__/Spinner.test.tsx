import { render } from '@testing-library/react';

import SpinnerUi from '../Spinner';

describe('Spinner', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SpinnerUi />);
    expect(baseElement).toBeTruthy();
  });
});
