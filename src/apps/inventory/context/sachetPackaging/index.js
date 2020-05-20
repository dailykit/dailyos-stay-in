import React from 'react'

const SachetPackagingContext = React.createContext()

const state = {
   supplier: {},
   info: {},
}

const reducers = (state, { type, payload }) => {
   switch (type) {
      case 'SET_SUPPLIER':
         return { ...state, supplier: payload }

      case 'ADD_ITEM_INFO':
         return { ...state, info: payload }
      default:
         return state
   }
}

export { SachetPackagingContext, state, reducers }
