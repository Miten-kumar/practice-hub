import '@testing-library/jest-dom';

import { render, screen, fireEvent } from '@testing-library/react';
import Counter from '../components/Counter';

describe('counter',()=>{
test('increments counter on click', () => {
    render(<Counter />);

    fireEvent.click(screen.getByText('Increment'));
    
    expect(screen.getByText('Count: 1')).toBeInTheDocument();
  });

test('decrement counter on click', () =>{
  render(<Counter/>);

  fireEvent.click(screen.getByText('Decrement'));

  expect(screen.getByText('Count: -1')).toBeInTheDocument();
})

})

