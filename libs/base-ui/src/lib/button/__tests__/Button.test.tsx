import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button';

describe('Button', () => {
  it('should render successfully', () => {
    const { baseElement, getByText } = render(
      <Button>This is the button</Button>
    );

    expect(baseElement).toBeTruthy();
    expect(getByText('This is the button')).toBeTruthy();
  });

  it('should trigger onClick when clicked', async () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button onClick={handleClick}>Click me!</Button>
    );

    await userEvent.click(getByText('Click me!'));

    expect(handleClick).toHaveBeenCalled();
  });

  it('should not be clickable when it is in a disabled state', async () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button onClick={handleClick} disabled>
        Disabled
      </Button>
    );

    await userEvent.click(getByText('Disabled'), { pointerEventsCheck: 0 });

    expect(handleClick).not.toHaveBeenCalled();
  });
});
