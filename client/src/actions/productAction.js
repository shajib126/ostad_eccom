import axios from "axios";
export const getProduct = (keyword="",currentPage=1,price=[0,25000],category,ratings = 0)=>async (dispatch)=>{
    try {
        dispatch({
            type:"productsRequest"
        })
        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price}&price[lte]=${price[1]}&ratings[gte]=${ratings}`
        if(category){
            link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
        }
        const {data} = await axios.get(link)
        dispatch({
            type:"productsSuccess",
            payload:data
        })

    } catch (error) {
        dispatch({
            type: "productsFailure",
            payload: error.response.data.message,
          });
    }
}

export const getAdminProduct = ()=>async(dispatch)=>{
    try {
        dispatch({
            type:"adminProductsRequest"
        })
        const {data} = await axios.get('api/v1/admin/products')
        dispatch({
            type:"adminProductsSuccess",
            payload:data.products
        })
    } catch (error) {
        dispatch({
            type:"adminProductsFailure",
            payload:error.response.data.message
        })
    }
}

export const createProduct = (productData) =>async(dispatch)=>{
    try {
        dispatch({
            tyep:"newProductRequest"
        })
        const config = {
            headers: { "Content-Type": "application/json" },
          };
        const {data} = await axios.post('/api/v1/product/new',productData,config)
        dispatch({
            tyep:"newProductSuccess",
            payload:data
        })
    } catch (error) {
        dispatch({
            type: "newProductFailure",
            payload: error.response.data.message,
          });
    }
}

export const updateProduct = (id,productData)=>async(dispatch)=>{
    try {
        dispatch({
            type:"updateProductRequest"
        })
        const config = {
            headers: { "Content-Type": "application/json" },
          };
        const {data} = await axios.put(`/api/v1/product/{id}`,productData,config)
        dispatch({
            type:"updateProductSuccess",
            payload:data.success
        })
    } catch (error) {
        dispatch({
            type: "updateProductFailure",
            payload: error.response.data.message,
          });
    }
}

export const deleteProduct = (id)=>async(dispatch)=>{
    try {
        dispatch({
            type:"deleteProductRequest"
        })
        const {data} = await axios.delete(`/api/v1/product/${id}`)
        dispatch({
            type:"deleteProductSuccess",
            payload:data.success
        })
    } catch (error) {
        dispatch({
            type: "deleteProductFailure",
            payload: error.response.data.message,
          });
    }
}

export const getProductDetails = (id)=>async(dispatch)=>{
    try {
        dispatch({
            type:"productDetailsRequest"
        })
        const {data} =await axios.get(`/api/v1/product/${id}`)
        dispatch({
            type:"productDetailsSuccess",
            payload:data.product
        })
    } catch (error) {
        dispatch({
            type: "productDetailsFailure",
            payload: error.response.data.message,
          });
    }
}

export const newReview = (reviewData)=>async(dispatch)=>{
    try {
        dispatch({
            type:"newReviewRequest"
        })
        const config = {
            headers: { "Content-Type": "application/json" },
          };
        const {data} = await axios.put(`/api/v1/review`,reviewData,config)
        dispatch({
            type:"newReviewSuccess",
            payload:data.success
        })
    } catch (error) {
        dispatch({
            type: "newReviewFailure",
            payload: error.response.data.message,
        })
    }
}

export const getAllReviews =(id)=>async(dispatch)=>{
    try {
        dispatch({
            type:"allReviewRequest"
        })
        const {data} = await axios.get(`/api/v1/reviews?id=${id}`)
        dispatch({
            type:"allReviewSuccess",
            payload:data.reviews
        })
    } catch (error) {
        dispatch({
            type: "allReviewFailure",
            payload: error.response.data.message,
          });
    }
}

export const deleteReviews = (reviewId,productId)=>async(dispatch)=>{
    try {
        dispatch({
            type:"deleteReviewRequest"
        })
        const {data} = await axios.delete(`/api/v1/reviews?id=${reviewId}&productId=${productId}`)
        dispatch({
            type:"deleteReviewSuccess",
            payload:data.success
        })
    } catch (error) {
        dispatch({
            type: "deleteReviewFailure",
            payload: error.response.data.message,
          });
    }
}

export const clearErrors = ()=>async(dispatch)=>{
    dispatch({type:"clearErrors"})
}