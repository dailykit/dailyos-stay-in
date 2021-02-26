import gql from 'graphql-tag'

export const PRODUCTS = {
   CREATE: gql`
      mutation CreateProduct($object: products_product_insert_input!) {
         createProduct(object: $object) {
            id
            name
         }
      }
   `,
   DELETE: gql`
      mutation UpdateProduct($id: Int!) {
         updateProduct(pk_columns: { id: $id }, _set: { isArchived: true }) {
            id
         }
      }
   `,
   LIST: gql`
      subscription Products($where: products_product_bool_exp) {
         products(where: $where) {
            id
            name
            isPublished
         }
      }
   `,
}

export const PRODUCT = {
   UPDATE: gql`
      mutation UpdateProduct($id: Int!, $_set: products_product_set_input) {
         updateProduct(pk_columns: { id: $id }, _set: $_set) {
            id
         }
      }
   `,
   VIEW: gql`
      subscription Product($id: Int!) {
         product(id: $id) {
            id
            name
            type
            assets
            tags
            additionalText
            description
            basePrice
            isPopupAllowed
            isPublished
            productOptions(
               where: { isArchived: { _eq: false } }
               order_by: { position: desc_nulls_last }
            ) {
               id
               position
               label
               price
               discount
               quantity
               simpleRecipeYield {
                  id
                  yield
                  simpleRecipe {
                     id
                     name
                  }
               }
               supplierItem {
                  id
                  name
                  unit
                  unitSize
               }
               sachetItem {
                  id
                  bulkItem {
                     processingName
                     supplierItem {
                        name
                     }
                  }
                  unit
                  unitSize
               }
               modifier {
                  id
                  name
                  data
               }
               operationConfig {
                  id
                  name
               }
            }
         }
      }
   `,
}

export const PRODUCT_OPTION = {
   CREATE: gql`
      mutation CreateProductOption(
         $object: products_productOption_insert_input!
      ) {
         createProductOption(object: $object) {
            id
         }
      }
   `,
   DELETE: gql`
      mutation UpdateProductOption($id: Int!) {
         updateProductOption(
            pk_columns: { id: $id }
            _set: { isArchived: true }
         ) {
            id
         }
      }
   `,
   UPDATE: gql`
      mutation UpdateProductOption(
         $id: Int!
         $_set: products_productOption_set_input
      ) {
         updateProductOption(pk_columns: { id: $id }, _set: $_set) {
            id
         }
      }
   `,
}
