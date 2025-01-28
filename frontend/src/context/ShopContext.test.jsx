import { render, screen, act } from '@testing-library/react';
import { ShopContext, } from './ShopContest';
import axios from 'axios';
import { toast } from 'react-toastify';

// Mock axios and toast
jest.mock('axios');
jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe('ShopContextProvider', () => {
  const mockProducts = [
    { _id: '1', name: 'Product 1', price: 100 },
    { _id: '2', name: 'Product 2', price: 200 },
  ];

  const mockCartItems = {
    '1': { 'M': 2 },
    '2': { 'L': 1 },
  };

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: { success: true, products: mockProducts } });
    axios.post.mockResolvedValue({ data: { success: true } });
  });

  it('should fetch products data on mount', async () => {
    await act(async () => {
      render(
        <ShopContextProvider>
          <div>Test</div>
        </ShopContextProvider>
      );
    });

    expect(axios.get).toHaveBeenCalledWith('https://adorna-backend.vercel.app/api/product/list');
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  it('should add item to cart', async () => {
    const TestComponent = () => {
      const { addToCart } = useContext(ShopContext);
      return <button onClick={() => addToCart('1', 'M')}>Add to Cart</button>;
    };

    await act(async () => {
      render(
        <ShopContextProvider>
          <TestComponent />
        </ShopContextProvider>
      );
    });

    const button = screen.getByText('Add to Cart');
    await act(async () => {
      button.click();
    });

    expect(axios.post).toHaveBeenCalledWith(
      'https://adorna-backend.vercel.app/api/cart/add',
      { itemId: '1', size: 'M' },
      { headers: { token: '' } }
    );
  });

  it('should update cart quantity', async () => {
    const TestComponent = () => {
      const { updateQuantity } = useContext(ShopContext);
      return <button onClick={() => updateQuantity('1', 'M', 3)}>Update Quantity</button>;
    };

    await act(async () => {
      render(
        <ShopContextProvider>
          <TestComponent />
        </ShopContextProvider>
      );
    });

    const button = screen.getByText('Update Quantity');
    await act(async () => {
      button.click();
    });

    expect(axios.post).toHaveBeenCalledWith(
      'https://adorna-backend.vercel.app/api/cart/update',
      { itemId: '1', size: 'M', quantity: 3 },
      { headers: { token: '' } }
    );
  });

  it('should calculate cart count', async () => {
    const TestComponent = () => {
      const { getCartCount } = useContext(ShopContext);
      return <div>{getCartCount()}</div>;
    };

    await act(async () => {
      render(
        <ShopContextProvider>
          <TestComponent />
        </ShopContextProvider>
      );
    });

    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('should calculate cart amount', async () => {
    const TestComponent = () => {
      const { getCartAmount } = useContext(ShopContext);
      return <div>{getCartAmount()}</div>;
    };

    await act(async () => {
      render(
        <ShopContextProvider>
          <TestComponent />
        </ShopContextProvider>
      );
    });

    expect(screen.getByText('0')).toBeInTheDocument();
  });
});