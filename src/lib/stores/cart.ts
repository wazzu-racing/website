import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export interface CartItem {
	id: number;
	name: string;
	slug: string;
	price: number;
	quantity: number;
	size?: string;
	image: string;
}

interface CartStore {
	items: CartItem[];
}

const CART_STORAGE_KEY = 'wazzu-racing-cart';

// Load cart from localStorage if available
function loadCart(): CartStore {
	if (browser) {
		try {
			const stored = localStorage.getItem(CART_STORAGE_KEY);
			if (stored) {
				return JSON.parse(stored);
			}
		} catch (e) {
			console.error('Failed to load cart from localStorage:', e);
		}
	}
	return { items: [] };
}

// Create the cart store
function createCartStore() {
	const { subscribe, set, update } = writable<CartStore>(loadCart());

	// Save to localStorage whenever cart changes
	function saveCart(cart: CartStore) {
		if (browser) {
			try {
				localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
			} catch (e) {
				console.error('Failed to save cart to localStorage:', e);
			}
		}
	}

	return {
		subscribe,
		addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
			update((cart) => {
				const existingItemIndex = cart.items.findIndex(
					(i) => i.id === item.id && i.size === item.size
				);

				if (existingItemIndex !== -1) {
					// Item already exists, increase quantity
					cart.items[existingItemIndex].quantity += item.quantity || 1;
				} else {
					// Add new item
					cart.items = [
						...cart.items,
						{
							...item,
							quantity: item.quantity || 1
						}
					];
				}

				saveCart(cart);
				return cart;
			});
		},
		removeItem: (id: number, size?: string) => {
			update((cart) => {
				cart.items = cart.items.filter((item) => !(item.id === id && item.size === size));
				saveCart(cart);
				return cart;
			});
		},
		updateQuantity: (id: number, quantity: number, size?: string) => {
			update((cart) => {
				const itemIndex = cart.items.findIndex((i) => i.id === id && i.size === size);
				if (itemIndex !== -1) {
					if (quantity <= 0) {
						// Remove item if quantity is 0 or negative
						cart.items = cart.items.filter((item) => !(item.id === id && item.size === size));
					} else {
						cart.items[itemIndex].quantity = quantity;
					}
				}
				saveCart(cart);
				return cart;
			});
		},
		clearCart: () => {
			const emptyCart = { items: [] };
			set(emptyCart);
			saveCart(emptyCart);
		},
		getItemCount: (cart: CartStore): number => {
			return cart.items.reduce((total, item) => total + item.quantity, 0);
		},
		getTotal: (cart: CartStore): number => {
			return cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
		}
	};
}

export const cart = createCartStore();
