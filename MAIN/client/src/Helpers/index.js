import {jwtDecode} from 'jwt-decode';

const URL = "http://localhost:8000";


export const signup = async (user) => {
    try {
        console.log(user);
        let response = await fetch(`${URL}/auth/signup`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        return response.json();
    } catch (err) {
        console.log(err);
    }
}
export const getAuthToken = () => {
  const regex = new RegExp(`(^| )user=([^;]+)`);
  const match = document.cookie.match(regex);
  if (match) {
    let info = jwtDecode(match[2]);
    return info;
  }
  return false;
};
export const getToken = () => {
  const regex = new RegExp(`(^| )user=([^;]+)`);
  const match = document.cookie.match(regex);
  if (match) {
    return match[2];
  }
  return false;
};

export const signIn = async (user) => {
    try {
        let response = await fetch(`${URL}/auth/signin`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        return response.json();
    } catch (err) {
        console.log(err);
    }
}

export const getCategories = async () => {
  try{
    let response = await fetch(`${URL}/product/categories`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }
  catch(err){
    console.log(err);
  }
}

export const getProducts = async () => {
  try{
    let response = await fetch(`${URL}/product/products`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }
  catch(err){
    console.log(err);
  }
}

export const getProductCategory = async (category) => {
  try{
    let response = await fetch(`${URL}/product/category/${category}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }
  catch(err){
    console.log(err);
  }
}

export const getProduct = async (id) => {
  try{
    let response = await fetch(`${URL}/product/find/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }
  catch(err){
    console.log(err);
  }
}
export const getUser = async (id) => {
  try{
    let response = await fetch(`${URL}/auth/user/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }
  catch(err){
    console.log(err);
  }
}


// cart helpers

export const addProductToCart = async (id, product, quantity, total) => {
  try{
    let response = await fetch(`${URL}/cart/${id}/add-product`, {
      method: "POST",
      headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      },
      body: JSON.stringify({product, quantity, total}),
    });
    return response.json();
  }
  catch(err){
    console.log(err);
  }
}
export const removeProductFromCart = async (Id,product) => {
  try{
    let response = await fetch(`${URL}/cart/delete/product/${Id}`, {
      method: "delete",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product }),
    });
    return response.json();
  }
  catch(err){
    console.log(err);
  }
}
export const createCart = async (id, token) => {
  try{
    let response = await fetch(`${URL}/cart/create`, {
      method: "POST",
      headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": `${token}`,
      },
      body: JSON.stringify({user: id}),
    });
    return response.json();
  }
  catch(err){
    console.log(err);
  }
}

export const getCart = async (id) => {
  try{
    let response = await fetch(`${URL}/cart/${id}`, {
      method: "GET",
      headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      },
    });
    return response.json();
  }
  catch(err){
    console.log(err);
  }
}

export const createPayment = async (
  id,
  cart,
  paymentID,
  paymentMethod,
  totalPrice
) => {
  try {
    console.log(id, cart, paymentID, paymentMethod, totalPrice);
    let response = await fetch(`${URL}/payment/create`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: id, cart , paymentID, paymentMethod, amount: totalPrice}),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const createOrder = async (orderDetails) => {
  try {
    let response = await fetch(`${URL}/order/create`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderDetails),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
}
export const updateUser = async (id, updatedFields) => {
  try {
    let response = await fetch(`${URL}/auth/update/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFields), // Send only the fields to be updated
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};


export const deleteCart = async (id, userId) => {
  try{
    let response = await fetch(`${URL}/cart/delete/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    // also delete the cart from the user schema
    const user = await getUser(userId);
    user.cart = null;
// rest of the user details are not being updated


  await updateUser(userId, { cart: null });    

   
    return response.json();
  }
  catch(err){
    console.log(err);
  }
}



export const getOrderByUser = async (id) => {
  try{
    let response = await fetch(`${URL}/order/user/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }
  catch(err){
    console.log(err);
  }
}

export const getProductsFromCategory = async (category) => {
  try{
    let response = await fetch(`${URL}/product/products/${category}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }
  catch(err){
    console.log(err);
  }
}