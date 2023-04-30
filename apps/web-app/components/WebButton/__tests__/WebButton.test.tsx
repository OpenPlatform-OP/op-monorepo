import { render, screen } from '@testing-library/react';
import { WebButton } from '../WebButton';

describe('WebButton', () => {
  it('should render web button', () => {
    render(<WebButton />);

    screen.getByText(/click/i);
  });
});
