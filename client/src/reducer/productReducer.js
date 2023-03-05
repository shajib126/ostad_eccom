import { createReducer } from "@reduxjs/toolkit";
const initialState = {}

export const productsReducer = createReducer(initialState,{
    productsRequest:(state)=>{
        state.loading = true 
    },
    productsSuccess:(state,action)=>{
        state.loading = false
        state.products = action.payload.products
        state.productsCount = action.payload.productsCount
        state.resultPerPage = action.payload.resultPerPage
        state.filteredProductsCount = action.payload.filteredProductsCount
    },
    productsFailure:(state,action)=>{
        state.loading = false
        state.error = action.payload
    },
    adminProductsRequest:(state)=>{
        state.loading = true
    },
    adminProductsSuccess:(state,action)=>{
        state.loading = false
        state.products = action.payload
    },
    adminProductsFailure:(state,action)=>{
        state.loading = false
        state.error = action.payload
    },
    clearErrors:(state,action)=>{
        state.error = null
    }
})

export const newProductReducer = createReducer(initialState,{
    newProductRequest:(state)=>{
        state.loading = true
    },
    newProductSuccess:(state,action)=>{
        state.loading = false
        state.success = action.payload.success
        state.product = action.payload.product
    },
    newProductFailure:(state,action)=>{
        state.loading = false
        state.error = action.payload
    },
    newProductReset:(state)=>{
        state.success = false
    },
    clearErrors:(state)=>{
        state.error = null
    }

})

export const productReducer = createReducer(initialState,{
    deleteProductRequest:(state)=>{
        state.loading = true
    },
    deleteProductSuccess:(state,action)=>{
        state.loading = false
        state.isDelete = action.payload
    },
    deleteProductFailure:(state,action)=>{
        state.loading = false
        state.error = action.payload
    },
    updateProductRequest:(state)=>{
        state.loading = true
    },
    updateProductSuccess:(state,action)=>{
        state.loading = false
        state.isUpdated = action.payload
    },
    updateProductFailure:(state,action)=>{
        state.loading = false
        state.error = action.payload
    },
    deleteProductReset:(state)=>{
        state.isDelete = false
    },
    updateProductReset:(state)=>{
        state.isUpdated = false
    },
    clearErrors:(state)=>{
        state.error = null
    }

})

export const productDetailsReducer = createReducer(initialState,{
    productDetailsRequest:(state)=>{
        state.loading = true
    },
    productDetailsSuccess:(state,action)=>{
        state.loading = false
        state.product =action.payload
    },
    productDetailsFailure:(state,action)=>{
        state.loading = false
        state.error = action.payload
    },
    clearErrors:(state)=>{
        state.error = null
    }


})

export const newReviewReducer = createReducer(initialState,{
    newReviewRequest:(state)=>{
        state.loading = true
    },
    newReviewSuccess:(state,action)=>{
        state.loading = false
        state.success = action.payload
    },
    newReviewFailure:(state,action)=>{
        state.loading = false
        state.error = action.payload
    },
    newReviewReset:(state)=>{
        state.success = false
    },
    clearErrors:(state)=>{
        state.error = null
    }
})

export const productReviewReducer = createReducer(initialState,{
    allReviewRequest:(state)=>{
        state.loading = true
    },
    allReviewSuccess:(state,action)=>{
        state.loading = false
        state.reviews = action.payload
    },
    allReviewFailure:(state,action)=>{
        state.loading = false
        state.error = action.payload
    },
    clearErrors:(state)=>{
        state.error = null
    }
})


export const reviewReducer=createReducer(initialState,{
    deleteReviewRequest:(state)=>{
        state.loading = true
    },
    deleteReviewSuccess:(state,action)=>{
        state.loading = false
        state.isDelete = action.payload
    },
    deleteReviewFailure:(state,action)=>{
        state.loading = false
        state.error = action.payload
    },
    deleteReviewReset:(state)=>{
        state.success = false
    },
    clearErrors:(state)=>{
        state.error = null
    }
})