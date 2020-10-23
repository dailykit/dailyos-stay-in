import { Flex } from '@dailykit/ui'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { DataCard } from '../../../components'

const address = 'apps.inventory.views.forms.item.'

export default function RealTimeView({ proc }) {
   const { t } = useTranslation()

   if (!proc) return null

   return (
      <Flex container style={{ flexWrap: 'wrap' }}>
         <DataCard
            title={t(address.concat('awaiting'))}
            quantity={`${proc.awaiting} ${proc.unit}`}
         />
         <DataCard
            title={t(address.concat('commited'))}
            quantity={`${proc.committed} ${proc.unit}`}
         />
         <DataCard
            title={t(address.concat('consumed'))}
            quantity={`${proc.consumed} ${proc.unit}`}
         />
         <DataCard
            title={t(address.concat('on hand'))}
            quantity={`${proc.onHand} ${proc.unit}`}
         />
      </Flex>
   )
}
