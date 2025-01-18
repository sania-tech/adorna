import { render, screen, fireEvent } from '@testing-library/react';
import Cart from '../components/Cart';
import { ShopContext } from '../context/ShopContest';
import { BrowserRouter as Router } from 'react-router-dom'; // For routing

// Mock data
const mockProducts = [
  {
    _id: '1',
    name: 'T-Shirt',
    price: 500,
    image: ['https://example.com/t-shirt.jpg'],
  },
];

const mockCartItems = {
  1: { S: 2 },
};

const mockCurrency = '$';

// Mock functions
const mockUpdateQuantity = jest.fn();
const mockNavigate = jest.fn();

// Mock context provider
const mockContextValue = {
  products: mockProducts,
  currency: mockCurrency,
  cartItems: mockCartItems,
  updateQuantity: mockUpdateQuantity,
  navigate: mockNavigate,
};

describe('Cart Component', () => {
  test('renders cart items correctly', () => {
    render(
      <ShopContext.Provider value={mockContextValue}>
        <Router>
          <Cart />
        </Router>
      </ShopContext.Provider>
    );

    // Check if the product name, price, and quantity are rendered
    expect(screen.getByText('T-Shirt')).toBeInTheDocument();
    expect(screen.getByText('$500')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2')).toBeInTheDocument(); // Quantity of 2
  });

  test('updates cart item quantity', () => {
    render(
      <ShopContext.Provider value={mockContextValue}>
        <Router>
          <Cart />
        </Router>
      </ShopContext.Provider>
    );

    const inputElement = screen.getByDisplayValue('2');
    
    // Simulate changing the quantity to 3
    fireEvent.change(inputElement, { target: { value: '3' } });

    // Check if updateQuantity was called with correct parameters
    expect(mockUpdateQuantity).toHaveBeenCalledWith('1', 'S', 3);
  });

  test('removes item from cart', () => {
    render(
      <ShopContext.Provider value={mockContextValue}>
        <Router>
          <Cart />
        </Router>
      </ShopContext.Provider>
    );

    const deleteButton = screen.getByAltText('bin-icon'); // Assuming this is the delete icon image alt text
    fireEvent.click(deleteButton);

    // Check if updateQuantity was called with 0 quantity (for removal)
    expect(mockUpdateQuantity).toHaveBeenCalledWith('1', 'S', 0);
  });

  test('navigates to checkout page on button click', () => {
    render(
      <ShopContext.Provider value={mockContextValue}>
        <Router>
          <Cart />
        </Router>
      </ShopContext.Provider>
    );

    const checkoutButton = screen.getByText('PROCEED TO CHECKOUT');
    fireEvent.click(checkoutButton);

    // Check if navigate was called
    expect(mockNavigate).toHaveBeenCalledWith('/place-order');
  });
});

