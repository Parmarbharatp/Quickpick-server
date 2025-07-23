import React ,{createContext, useState, useEffect, useContext} from "react";
import  All_products from "../components/Assets/All_products";
import { AuthContext } from './AuthContext';

export const ShopContext = createContext(null);

const getDefaultCart = ()=>{
    let cart = {};
    for (let index = 0; index < All_products.length+1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props)=>{
    // Load guest cart from localStorage if not logged in
    const [cartItems,setCartItems] = useState(() => {
        const guestCart = localStorage.getItem('guestCart');
        if (guestCart) return JSON.parse(guestCart);
        return getDefaultCart();
    });
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const { user } = useContext(AuthContext);

    // Fetch cart and orders from backend when user logs in
    useEffect(() => {
        if (user) {
            setCurrentUser(user);
            setIsLoggedIn(true);
            fetchCartFromBackend(user);
            fetchOrdersFromBackend(user);
        } else {
            setCurrentUser(null);
            setIsLoggedIn(false);
            setCartItems(getDefaultCart());
            setOrders([]);
        }
    }, [user]);

    // Always save cart to localStorage for guests
    useEffect(() => {
        if (!isLoggedIn) {
            localStorage.setItem('guestCart', JSON.stringify(cartItems));
        }
    }, [cartItems, isLoggedIn]);

    // Save cart to backend when cartItems change and user is logged in
    useEffect(() => {
        if (isLoggedIn && currentUser) {
            saveCartToBackend(currentUser, cartItems);
        }
    }, [cartItems, isLoggedIn, currentUser]);

    const fetchCartFromBackend = async (user) => {
        try {
            const userId = user._id || user.email;
            const res = await fetch(`http://localhost:5000/api/cart/${userId}`);
            let backendCart = getDefaultCart();
            if (res.ok) {
                const data = await res.json();
                if (data && Object.keys(data).length > 0) {
                    backendCart = data;
                }
            }
            // Merge guest cart with backend cart
            const guestCart = JSON.parse(localStorage.getItem('guestCart')) || {};
            const mergedCart = { ...backendCart };
            Object.keys(guestCart).forEach(id => {
                if (mergedCart[id]) {
                    mergedCart[id] += guestCart[id];
                } else {
                    mergedCart[id] = guestCart[id];
                }
            });
            setCartItems(mergedCart);
            saveCartToBackend(user, mergedCart);
            localStorage.removeItem('guestCart');
        } catch (err) {
            setCartItems(getDefaultCart());
        }
    };

    const saveCartToBackend = async (user, cart) => {
        try {
            const userId = user._id || user.email;
            await fetch('http://localhost:5000/api/cart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, cartItems: cart })
            });
        } catch (err) {
            // Optionally handle error
        }
    };

    const fetchOrdersFromBackend = async (user) => {
        try {
            const userId = user._id || user.email;
            const res = await fetch(`http://localhost:5000/api/order/${userId}`);
            if (res.ok) {
                const data = await res.json();
                console.log('Fetched orders from backend:', data); // Debug log
                setOrders(data);
            } else {
                setOrders([]);
            }
        } catch (err) {
            setOrders([]);
        }
    };

    const saveOrderToBackend = async (user, order) => {
        try {
            const userId = user._id || user.email;
            const res = await fetch('http://localhost:5000/api/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, items: order.items, total: order.total, address: user.address })
            });
            if (res.ok) {
                console.log('Order saved to backend, refreshing orders...'); // Debug log
                fetchOrdersFromBackend(user); // Refresh orders after placing
            }
        } catch (err) {
            // Optionally handle error
        }
    };

    const register = (userData) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.find(user => user.email === userData.email);
        if (userExists) {
            alert("An account with this email already exists.");
            return false;
        }
        users.push(userData);
        localStorage.setItem('users', JSON.stringify(users));
        return true;
    };

    const login = (credentials) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === credentials.email && user.password === credentials.password);

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            setCurrentUser(user);
            setIsLoggedIn(true);
            fetchCartFromBackend(user); // This will merge guest cart
            fetchOrdersFromBackend(user);
            return true;
        }
        alert("Invalid email or password.");
        return false;
    };

    const logout = () => {
        localStorage.removeItem('currentUser');
        // Save current cart to guestCart
        localStorage.setItem('guestCart', JSON.stringify(cartItems));
        setCurrentUser(null);
        setIsLoggedIn(false);
        setCartItems(getDefaultCart());
        setOrders([]);
    };
    
    const addToCart = (itemId) => {
        if (!isLoggedIn) {
            alert('Please login to add items to your cart.');
            return;
        }
        setCartItems((prev) => ({...prev,[itemId]:prev[itemId]+1}))
    }
    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({...prev,[itemId]:prev[itemId]-1}))
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                let itemInfo = All_products.find((product)=>product.id===Number(item));
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () =>{
        let totalItem = 0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                totalItem+= cartItems[item];
            }
        }
        return totalItem;
    }

    const clearCart = () => {
        setCartItems(getDefaultCart());
    };

    // Place order and save to backend
    const addOrder = (order) => {
        if (currentUser) {
            saveOrderToBackend(currentUser, order);
        }
    };

    const getOrders = () => orders;

    const ContextValue = {
        getTotalCartItems,
        getTotalCartAmount,
        All_products,
        cartItems,
        addToCart,
        removeFromCart,
        isLoggedIn,
        currentUser,
        register,
        login,
        logout,
        clearCart,
        addOrder,
        getOrders,
        orders
    };

    return(
        <ShopContext.Provider value={ContextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;