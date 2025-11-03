//creating global state
//usually you do const[state,setState]=useState();
//it is local state
//but we want global state
//so we have to create a hook
import {create} from "zustand";
export const useProductStore=create((set)=>({
    products:[],//initial state of product
    setProducts:(products)=>set({products}),
    //now you want be manually adding the products , you are getting it from the database
    //so creating a function to get it
    createProduct:async(newProduct)=>{
        if(!newProduct.name || !newProduct.image || !newProduct.price){
            return{success:false,message:"Please fill in all details"};
        }
        const res=await fetch("http://localhost:5000/api/products",{
            method:"POST",
            headers:{
    "Content-Type":"application/json"
},

            body:JSON.stringify(newProduct)
        }
        );
        const data=await res.json();
        set((state)=>({products:[...state.products,data.data]}))
         return{success:true,message:"Product created successfully"};
        //what  does this line even mean?
        //you are saying purane products toh pare rehne do sath ke sath jo naya product aya hai use bhi us array me add krlo and when you will check controller you will see new product data nam ke variable me ara hai so you have to write data.data
        
        //i didnt write the entire address : http://localhost:5000/api/product only wrote ai/product
        //HOW YOU CAN USE ONLY PREFIX?
        //go to vite.config file
        /*create a key server
        server:{
        proxy:{
        "/api":{
        target:"http://localhost:5000"
    }

        
        }}

        //it simply means whenever you will be using api there you are calling http:localhost:5000
        */
    },
    fetchProducts:async()=>{
        const res=await fetch("http://localhost:5000/api/products");
        const data=await res.json();
        set({products:data.data});
    },
    deleteProduct: async (pid) => {
  try {
    const res = await fetch(`http://localhost:5000/api/products/${pid}`, { method: 'DELETE' });
    const data = await res.json();

    if (!data.success) return { success: false, message: data.message };

    set((state) => ({
      products: state.products.filter((product) => product._id !== pid),
    }));

    return { success: true, message: data.message };
  } catch (error) {
    return { success: false, message: error.message };
  }
},
updateProduct: async (pid, updatedProduct) => {
  const res = await fetch(`http://localhost:5000/api/products/${pid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedProduct),
  });

  const data = await res.json();

  if (!data.success) return { success: false, message: data.message };

  set((state) => ({
    products: state.products.map((product) =>
      product._id === pid ? data.data : product
    ),
  }));

  return { success: true, message: data.message };
},



}))

//=>({})
//what does this mean? you are returning a object


