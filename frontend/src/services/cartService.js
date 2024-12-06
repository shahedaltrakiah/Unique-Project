import Cookies from 'js-cookie';

const CART_COOKIE_NAME = 'cart';

export const getCart = () => {
    const cart = Cookies.get(CART_COOKIE_NAME);
    return cart ? JSON.parse(cart) : [];
};

export const addToCart = (item) => {
    const cart = getCart();
    cart.push(item);
    Cookies.set(CART_COOKIE_NAME, JSON.stringify(cart), { expires: 7 });
};

export const removeFromCart = (itemId) => {
    const cart = getCart();
    const updatedCart = cart.filter(item => item.id !== itemId);
    Cookies.set(CART_COOKIE_NAME, JSON.stringify(updatedCart), { expires: 7 });
};

export const clearCart = () => {
    Cookies.remove(CART_COOKIE_NAME);
};
