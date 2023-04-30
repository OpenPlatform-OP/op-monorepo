import { render, screen } from '@testing-library/react';
import { TestButton } from '../TestButton';

describe('TestButton', () => {
  it('should render test button', () => {
    render(<TestButton />);

    screen.getByText(/click/i);
  });
});
