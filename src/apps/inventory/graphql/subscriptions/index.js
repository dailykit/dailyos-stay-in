import gql from 'graphql-tag'

export const SUPPLIER_ITEMS_SUBSCRIPTION = gql`
   subscription SupplierItems {
      supplierItems {
         id
         name
         bulkItemAsShippedId
         supplier {
            name
            contactPerson
         }
         bulkItems {
            id
            processingName
            awaiting
            onHand
            committed
            parLevel
            maxLevel
            isAvailable
            unit
         }
      }
   }
`

export const SUPPLIER_ITEM_SUBSCRIPTION = gql`
   subscription SupplierItem($id: Int!) {
      supplierItem(id: $id) {
         id
         name
         bulkItemAsShippedId
         unit
         unitSize
         leadTime
         supplier {
            name
            contactPerson
         }
         bulkItems {
            id
            processingName
            awaiting
            onHand
            committed
            parLevel
            maxLevel
            isAvailable
            shelfLife
            unit
            consumed

            sachetItems {
               id
               onHand
               awaiting
               consumed
               unit
               unitSize
               parLevel
               committed
            }
         }
      }
   }
`

export const BULK_WORK_ORDERS_SUBSCRIPTION = gql`
   subscription BulkWorkOrders {
      bulkWorkOrders {
         id
         status
         scheduledOn
         station {
            name
         }
         user {
            firstName
            lastName
         }
      }
   }
`

export const SACHET_WORK_ORDERS_SUBSCRIPTION = gql`
   subscription SachetWorkOrders {
      sachetWorkOrders {
         id
         status
         scheduledOn
         station {
            name
         }
         user {
            firstName
            lastName
         }
      }
   }
`

export const PURCHASE_ORDERS_SUBSCRIPTION = gql`
   subscription PurchaseOrderItems {
      purchaseOrderItems {
         id
         supplierItem {
            name
         }
         status
      }
   }
`

export const SUPPLIER_SUBSCRIPTION = gql`
   subscription Supplier($id: Int!) {
      supplier(id: $id) {
         id
         name
         contactPerson
         available
         address
         paymentTerms
         shippingTerms
      }
   }
`
