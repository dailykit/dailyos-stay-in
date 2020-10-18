import { useSubscription } from '@apollo/react-hooks'
import { ReactTabulator } from '@dailykit/react-tabulator'
import { Filler, Loader } from '@dailykit/ui'
import React from 'react'
import { logger } from '../../../../../shared/utils/index'
import { NO_SUPPLIER_ITEMS_LISTINGS } from '../../../constants/emptyMessages'
import { useTabs } from '../../../context'
import { SUPPLIER_ITEM_LISTINGS } from '../../../graphql'

export default function SupplierItemsListings({ tableRef }) {
   const { addTab } = useTabs()
   const {
      loading: itemsLoading,
      data: { supplierItems = [] } = {},
      error,
   } = useSubscription(SUPPLIER_ITEM_LISTINGS)

   if (error) {
      logger(error)
      throw error // let this error catched by the ErrorBoundary as the view requires this.
   }

   const tableOptions = {
      cellVertAlign: 'middle',
      layout: 'fitColumns',
      autoResize: true,
      maxHeight: '420px',
      resizableColumns: false,
      virtualDomBuffer: 80,
      placeholder: 'No Data Available',
      persistence: true,
      persistenceMode: 'cookie',
      pagination: 'local',
      paginationSize: 10,
   }

   const openForm = (_, cell) => {
      const { supplierItem } = cell.getData()
      addTab(supplierItem.name, `/inventory/items/${supplierItem.id}`)
   }

   const columns = [
      {
         title: 'Item Name',
         field: 'name',
         headerFilter: true,
         hozAlign: 'left',
         headerHozAlign: 'left',
         width: 150,
         cellClick: openForm,
      },
      {
         title: 'Supplier',
         field: 'supplier.name',
         headerFilter: false,
         hozAlign: 'center',
         headerHozAlign: 'center',
      },
      {
         title: 'Bulk Items count',
         field: 'bulkItems_aggregate.aggregate.count',
         headerFilter: false,
         hozAlign: 'center',
         headerHozAlign: 'center',
      },
   ]

   if (itemsLoading) return <Loader />
   if (supplierItems.length)
      return (
         <>
            <ReactTabulator
               ref={tableRef}
               columns={columns}
               data={supplierItems}
               options={tableOptions}
               style={{ marginTop: '16px' }}
            />
         </>
      )

   return <Filler message={NO_SUPPLIER_ITEMS_LISTINGS} />
}
