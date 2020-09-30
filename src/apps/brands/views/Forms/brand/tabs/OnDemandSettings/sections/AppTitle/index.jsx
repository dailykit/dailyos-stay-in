import React from 'react'
import { isEmpty } from 'lodash'
import { toast } from 'react-toastify'
import { useSubscription } from '@apollo/react-hooks'
import { Input, TextButton, Text, Spacer } from '@dailykit/ui'

import { BRANDS } from '../../../../../../../graphql'
import { Flex } from '../../../../../../../../../shared/components'

export const AppTitle = ({ update }) => {
   const [title, setTitle] = React.useState('')
   const [settingId, setSettingId] = React.useState(null)
   useSubscription(BRANDS.ONDEMAND_SETTING, {
      variables: {
         identifier: { _eq: 'App Title' },
         type: { _eq: 'visual' },
      },
      onSubscriptionData: ({
         subscriptionData: { data: { storeSettings = [] } = {} } = {},
      }) => {
         if (!isEmpty(storeSettings)) {
            const { brand, id } = storeSettings[0]
            setSettingId(id)
            if ('title' in brand.value) {
               setTitle(brand.value.title)
            }
         }
      },
   })

   const updateSetting = React.useCallback(() => {
      if (!settingId) return
      if (!title.trim()) return toast.error('Brand name must be provided')
      update({ id: settingId, value: { title } })
   }, [title, settingId])

   return (
      <div id="App Title">
         <Text as="h3">App Title</Text>
         <Spacer size="4px" />
         <Flex container alignItems="center">
            <Input
               type="text"
               label=""
               name="name"
               value={title}
               style={{ width: '240px' }}
               placeholder="Enter app title"
               onChange={e => setTitle(e.target.value)}
            />
            <TextButton size="sm" type="outline" onClick={updateSetting}>
               Update
            </TextButton>
         </Flex>
      </div>
   )
}
