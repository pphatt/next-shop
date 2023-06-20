import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "@/api/apiSlice";

const productsAdapter = createEntityAdapter({});
const initialState = productsAdapter.getInitialState();

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/products",
      //@ts-ignore
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      keepUnusedDataFor: 5,
      transformResponse: (responseData: any) => {
        return productsAdapter.setAll(initialState, responseData);
      },
      // @ts-ignore
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Product", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Product", id })),
          ];
        } else return [{ type: "Product", id: "LIST" }];
      },
    }),
    addNewProduct: builder.mutation({
      query: initialUserData => ({
        url: '/products',
        method: 'POST',
        body: {
          ...initialUserData,
        }
      }),
      invalidatesTags: [
        { type: 'Product', id: "LIST" }
      ]
    }),
  }),
});

export const {
  //@ts-ignore
  useGetProductsQuery,
  //@ts-ignore
  useAddNewProductMutation
} = productsApiSlice

//@ts-ignore
export const selectUsersResult = productsApiSlice.endpoints.getProducts.select()

// creates memoized selector
const selectProductsData = createSelector(
  selectUsersResult,
  productsResult => productsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors, and we rename them with aliases using destructuring
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds
  // Pass in a selector that returns the users slice of state
  //@ts-ignore
} = productsAdapter.getSelectors(state => selectProductsData(state) ?? initialState)