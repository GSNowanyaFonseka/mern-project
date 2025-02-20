// this file have global state and functions

import {create} from "zustand"

// create hooks
// when we export any function it can use in different files 
// calling the create function which takes a call back function and this takes a setter set as the argument (this is the setter function)
// instead of having a method body we return an object ("({})"") with the state and the setter function
export const useProductStore = create((set) => ({
    // empty array
    products: [],
    // add product to the array
    // passing a new product to the function and it will create in the database 
    setProducts: (products) => set({products}),
    createProduct: async(newProduct) => {
        if(!newProduct.name || !newProduct.image || !newProduct.price) {
            return {success:false, message:"Please fill in all fields."}
        }
        const res = await fetch("/api/products",{
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(newProduct)
        });
        const data = await res.json();
        set((state) => ({products:[...state.products, data.data]}));
        return {success:true, message:"Product created successfully"};
    },
    fetchProducts:async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        set({products: data.data });
    },
    deleteProduct: async(pid) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if(!data.success) return {success:false, message:data.message};

        // update the UI immidiately, without needing a refresh
        set(state => ({products: state.products.filter((product) => product._id !== pid)}));
        return {success:true, message: data.message};
    },
    updateProduct: async (pid, updateProduct) => {
        const res = await fetch(`/api/products/${pid}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateProduct),
        });
        const data = await res.json();
        if(!data.success) return {success:false, message:data.message};

        // update the ui immediately, without a refresh
        set(state => ({
            products: state.products.map((product) => (product._id === pid ? data.data : product)),
        }));

        return {success:true, message:data.message};
    },
}));

