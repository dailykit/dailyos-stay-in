import { useMutation } from '@apollo/react-hooks'
import { Text, TunnelHeader } from '@dailykit/ui'
import React from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { v4 as uuid } from 'uuid'
import { logger } from '../../../../../shared/utils'
import { TunnelContainer } from '../../../components'
import { GENERAL_ERROR_MESSAGE } from '../../../constants/errorMessages'
import {
   BULK_WORK_ORDER_INFO_TUNNEL,
   SACHET_WORK_ORDER_INFO_TUNNEL,
} from '../../../constants/infoMessages'
import { useTabs } from '../../../context'
import {
   CREATE_BULK_WORK_ORDER,
   CREATE_SACHET_WORK_ORDER,
} from '../../../graphql'
import { SolidTile } from '../styled'

const address = 'apps.inventory.views.listings.workorders.'

function onError(error) {
   logger(error)
   toast.error(GENERAL_ERROR_MESSAGE)
}

export default function WorkOrderTypeTunnel({ close }) {
   const { t } = useTranslation()
   const { addTab } = useTabs()

   const [createBulkWorkOrder] = useMutation(CREATE_BULK_WORK_ORDER, {
      variables: {
         object: {
            name: `Work Order-${uuid().substring(30)}`,
         },
      },
      onError,
      onCompleted: data => {
         const { id, name } = data.createBulkWorkOrder.returning[0]
         addTab(name, `/inventory/work-orders/bulk/${id}`)
      },
   })

   const [createSachetWorkOrder] = useMutation(CREATE_SACHET_WORK_ORDER, {
      variables: {
         object: {
            name: `Work Order-${uuid().substring(30)}`,
         },
      },
      onError,
      onCompleted: data => {
         const { id, name } = data.createSachetWorkOrder.returning[0]
         addTab(name, `/inventory/work-orders/sachet/${id}`)
      },
   })

   return (
      <>
         <TunnelHeader
            title={t(address.concat('select type of work order'))}
            close={() => {
               close(1)
            }}
         />
         <TunnelContainer>
            <SolidTile onClick={createBulkWorkOrder}>
               <Text as="h1">{t(address.concat('bulk work order'))}</Text>
               <Text as="subtitle">
                  <Trans i18nKey={address.concat('bulk subtitle 1')}>
                     {BULK_WORK_ORDER_INFO_TUNNEL}
                  </Trans>
               </Text>
            </SolidTile>
            <br />
            <SolidTile onClick={createSachetWorkOrder}>
               <Text as="h1">{t(address.concat('sachet work order'))}</Text>
               <Text as="subtitle">
                  <Trans i18nKey={address.concat('sachet subtitle 1')}>
                     {SACHET_WORK_ORDER_INFO_TUNNEL}
                  </Trans>
               </Text>
            </SolidTile>
         </TunnelContainer>
      </>
   )
}
