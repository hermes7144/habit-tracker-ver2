import { render, screen } from '@testing-library/react';
import User from '../User';

test('renders user component with correct data', () => {
  const user = {
    photoURL: 'https://example.com/avatar.jpg',
    displayName: 'John Doe',
  };

  render(<User user={user} />);

  const userImage = screen.getByAltText(user.displayName);
  expect(userImage).toBeInTheDocument();
  expect(userImage).toHaveAttribute('src', user.photoURL);

  const username = screen.getByText(user.displayName);
  expect(username).toBeInTheDocument();
});
