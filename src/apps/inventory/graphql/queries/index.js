import gql from 'graphql-tag'

export const SUPPLIERS = gql`
   query {
      suppliers {
         id
         name
         contactPerson
         available
      }
   }
`

export const MASTER_PROCESSINGS = gql`
   query {
      masterProcessings {
         id
         name
         description
      }
   }
`
export const MASTER_ALLERGENS = gql`
   query {
      masterAllergens {
         id
         name
         description
      }
   }
`

export const SUPPLIER = gql`
   query Supplier($id: Int!) {
      supplier(id: $id) {
         id
         name
         contactPerson
         available
         shippingTerms
         paymentTerms
      }
   }
`
