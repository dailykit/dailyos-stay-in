import gql from 'graphql-tag'

export const MUTATIONS = {
   CART: {
      UPDATE: {
         ONE: gql`
            mutation updateCart(
               $pk_columns: order_cart_pk_columns_input!
               $_set: order_cart_set_input!
            ) {
               updateCart(pk_columns: $pk_columns, _set: $_set) {
                  id
               }
            }
         `,
      },
   },
   ORDER: {
      UPDATE: gql`
         mutation updateOrder(
            $id: oid!
            $_set: order_order_set_input
            $_append: order_order_append_input
         ) {
            updateOrder(
               pk_columns: { id: $id }
               _set: $_set
               _append: $_append
            ) {
               id
            }
         }
      `,
      PRODUCT: {
         INVENTORY: {
            UPDATE: gql`
               mutation updateOrderInventoryProduct(
                  $id: Int!
                  $_set: order_orderInventoryProduct_set_input!
               ) {
                  updateOrderInventoryProduct(
                     pk_columns: { id: $id }
                     _set: $_set
                  ) {
                     id
                     assemblyStatus
                  }
               }
            `,
         },
         READYTOEAT: {
            UPDATE: gql`
               mutation updateOrderReadyToEatProduct(
                  $id: Int!
                  $_set: order_orderReadyToEatProduct_set_input!
               ) {
                  updateOrderReadyToEatProduct(
                     pk_columns: { id: $id }
                     _set: $_set
                  ) {
                     id
                     isAssembled
                     assemblyStatus
                  }
               }
            `,
         },
         MEALKIT: {
            UPDATE: gql`
               mutation updateOrderMealKitProduct(
                  $id: Int!
                  $_set: order_orderMealKitProduct_set_input!
               ) {
                  updateOrderMealKitProduct(
                     pk_columns: { id: $id }
                     _set: $_set
                  ) {
                     id
                     isAssembled
                     assemblyStatus
                  }
               }
            `,
         },
      },
   },
   CART_ITEM: {
      UPDATE: gql`
         mutation updateCartItem($id: Int!, $_set: order_cartItem_set_input!) {
            updateCartItem(pk_columns: { id: $id }, _set: $_set) {
               id
            }
         }
      `,
   },
   SETTING: {
      UPDATE: gql`
         mutation update_settings_appSettings(
            $app: String_comparison_exp!
            $identifier: String_comparison_exp!
            $type: String_comparison_exp!
            $_set: settings_appSettings_set_input!
         ) {
            update_settings_appSettings(
               where: { app: $app, identifier: $identifier, type: $type }
               _set: $_set
            ) {
               affected_rows
               returning {
                  value
               }
            }
         }
      `,
   },
}
