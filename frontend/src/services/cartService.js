import Cookies from 'js-cookie';

// دالة لإضافة منتج إلى السلة
export const addToCart = (productId) => {
  let cart = JSON.parse(Cookies.get('cart') || '[]'); // جلب السلة من الكوكيز أو تهيئتها كـ array فارغ
  const productExists = cart.some(item => item.id === productId); // التحقق إذا كان المنتج موجودًا بالفعل في السلة

  if (!productExists) {
    // إذا لم يكن المنتج موجودًا، أضفه
    cart.push({ id: productId });
  }

  Cookies.set('cart', JSON.stringify(cart)); // حفظ السلة في الكوكيز
};

// دالة للحصول على محتويات السلة
export const getCart = () => {
  return JSON.parse(Cookies.get('cart') || '[]'); // جلب السلة من الكوكيز
};

// دالة لإزالة منتج من السلة
export const removeFromCart = (productId) => {
  let cart = JSON.parse(Cookies.get('cart') || '[]');
  cart = cart.filter(item => item.id !== productId); // إزالة المنتج من السلة
  Cookies.set('cart', JSON.stringify(cart)); // حفظ السلة في الكوكيز
};
