import { render, fireEvent } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  it('should render successfully', () => {
    const { baseElement, getByText } = render(
      <Button>This is the button</Button>
    );

    expect(baseElement).toBeTruthy();
    expect(getByText('This is the button')).toBeTruthy();
  });

  it('should trigger onClick when clicked', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button onClick={handleClick}>Click me!</Button>
    );

    fireEvent.click(getByText('Click me!'));

    expect(handleClick).toHaveBeenCalled();
  });
});
