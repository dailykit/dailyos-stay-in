import gql from 'graphql-tag'

export const CREATE_SUPPLIER_ITEM = gql`
   mutation CreateSupplierItem(
      $name: String!
      $supplierId: Int!
      $unit: String!
      $unitSize: Int!
   ) {
      createSupplierItem(
         objects: {
            name: $name
            supplierId: $supplierId
            unit: $unit
            unitSize: $unitSize
         }
      ) {
         returning {
            id
         }
      }
   }
`

export const ADD_BULK_ITEM = gql`
   mutation UpdateSupplierItem($bulkItemAsShippedId: Int!, $itemId: Int!) {
      updateSupplierItem(
         where: { id: { _eq: $itemId } }
         _set: { bulkItemAsShippedId: $bulkItemAsShippedId }
      ) {
         returning {
            id
         }
      }
   }
`

export const CREATE_BULK_ITEM = gql`
   mutation CreateBulkItem(
      $processingName: String!
      $itemId: Int!
      $unit: String!
   ) {
      createBulkItem(
         objects: {
            processingName: $processingName
            supplierItemId: $itemId
            unit: $unit
         }
      ) {
         returning {
            id
            processing {
               id
               name
            }
         }
      }
   }
`
export const CREATE_SACHET_ITEM = gql`
   mutation CreateSachetItem(
      $unitSize: numeric!
      $bulkItemId: Int!
      $unit: String!
   ) {
      createSachetItem(
         objects: { unitSize: $unitSize, bulkItemId: $bulkItemId, unit: $unit }
      ) {
         returning {
            id
         }
      }
   }
`