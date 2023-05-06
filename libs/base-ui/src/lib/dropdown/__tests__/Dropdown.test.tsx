import { FC, useState, MouseEventHandler } from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dropdown, DropdownItemProps } from '../Dropdown';

type TestDropdownProps = {
  onClose?: typeof jest.fn;
  onToggle?: typeof jest.fn;
  options: DropdownItemProps[];
};

describe('Dropdown', () => {
  const TestDropdown: FC<TestDropdownProps> = ({
    onClose,
    onToggle,
    options,
  }) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const handleToggle: MouseEventHandler<HTMLButtonElement> = (e) => {
      if (typeof onToggle === 'function') onToggle();
      setAnchorEl((el) => (el ? null : e.currentTarget));
    };
    const handleClose = () => {
      if (typeof onClose === 'function') onClose();
      setAnchorEl(null);
    };

    return (
      <>
        <button onClick={handleToggle}>Dropdown toggle</button>
        <Dropdown
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
        >
          {options.map((optionProps) => (
            <Dropdown.Item key={optionProps.key} {...optionProps} />
          ))}
        </Dropdown>
      </>
    );
  };

  it('should render correctly', () => {
    const { baseElement, getByText, queryByText } = render(
      <TestDropdown
        options={[
          {
            key: '1',
            children: 'option 1',
          },
        ]}
      />
    );

    expect(baseElement).toBeTruthy();
    expect(getByText('Dropdown toggle')).toBeTruthy();
    expect(queryByText('option 1')).toBeNull();
  });

  it('should expand and collapse properly', async () => {
    const handleToggle = jest.fn();
    const { getByText, queryByText } = render(
      <TestDropdown
        onToggle={handleToggle}
        options={[
          {
            key: '1',
            children: 'option 1',
          },
        ]}
      />
    );
    const toggleButton = getByText('Dropdown toggle');

    expect(queryByText('option 1')).toBeNull();

    await userEvent.click(toggleButton);

    expect(queryByText('option 1')).toBeTruthy();

    expect(handleToggle).toBeCalledTimes(1);

    await userEvent.click(toggleButton);

    await waitFor(() => expect(queryByText('option 1')).toBeNull());

    expect(handleToggle).toBeCalledTimes(2);
  });

  it('should trigger click when a dropdown item is clicked', async () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <TestDropdown
        options={[
          {
            key: '1',
            children: 'option 1',
            onClick: handleClick,
          },
        ]}
      />
    );

    await userEvent.click(getByText('Dropdown toggle'));
    await userEvent.click(getByText('option 1'));

    expect(handleClick).toBeCalledTimes(1);

    await userEvent.click(getByText('option 1'));

    expect(handleClick).toBeCalledTimes(2);
  });

  it('should not trigger click event when disabled', async () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <TestDropdown
        options={[
          {
            key: '1',
            children: 'option 1',
            onClick: handleClick,
            disabled: true,
          },
        ]}
      />
    );

    await userEvent.click(getByText('Dropdown toggle'));
    await userEvent.click(getByText('option 1').children[0], {
      pointerEventsCheck: 0,
    });

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should collapse the dropdown when click outside of the dropdown', async () => {
    const handleClose = jest.fn();
    const { getByText, getByRole, queryByText } = render(
      <TestDropdown
        onClose={handleClose}
        options={[
          {
            key: '1',
            children: 'option 1',
          },
        ]}
      />
    );

    await userEvent.click(getByText('Dropdown toggle'));

    expect(queryByText('option 1')).toBeTruthy();

    await userEvent.click(getByRole('presentation').children[0]);

    await waitFor(() => expect(queryByText('option 1')).toBeNull());

    expect(handleClose).toHaveBeenCalled();
  });
});
