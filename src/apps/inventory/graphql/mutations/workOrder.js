import gql from 'graphql-tag'

export const CREATE_BULK_WORK_ORDER = gql`
   mutation CreateBulkWorkOrder(
      $object: inventory_bulkWorkOrder_insert_input!
   ) {
      createBulkWorkOrder(objects: [$object]) {
         returning {
            id
            name
         }
      }
   }
`

export const UPDATE_BULK_WORK_ORDER = gql`
   mutation UpdateBulkWorkOrderStatus(
      $id: Int!
      $object: inventory_bulkWorkOrder_set_input
   ) {
      updateBulkWorkOrder(where: { id: { _eq: $id } }, _set: $object) {
         affected_rows
         returning {
            id
            status
         }
      }
   }
`

export const CREATE_SACHET_WORK_ORDER = gql`
   mutation CreateSachetWorkOrder(
      $object: inventory_sachetWorkOrder_insert_input!
   ) {
      createSachetWorkOrder(objects: [$object]) {
         returning {
            id
            status
         }
      }
   }
`

export const UPDATE_SACHET_WORK_ORDER = gql`
   mutation UpdateSachetWorkOrder($id: Int!, $status: String!) {
      updateSachetWorkOrder(
         where: { id: { _eq: $id } }
         _set: { status: $status }
      ) {
         returning {
            id
            status
         }
      }
   }
`
