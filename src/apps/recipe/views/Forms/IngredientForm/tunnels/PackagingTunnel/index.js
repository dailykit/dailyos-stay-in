import React from 'react'
import {
   List,
   ListItem,
   ListOptions,
   ListSearch,
   useSingleList,
   TunnelHeader,
   Loader,
   Filler,
} from '@dailykit/ui'
import { useSubscription } from '@apollo/react-hooks'
import { IngredientContext } from '../../../../../context/ingredient'
import { TunnelBody } from '../styled'
import { FETCH_PACKAGINGS } from '../../../../../graphql'
import { toast } from 'react-toastify'
import { logger } from '../../../../../../../shared/utils'

const PackagingTunnel = ({ closeTunnel }) => {
   const { ingredientState, ingredientDispatch } = React.useContext(
      IngredientContext
   )

   // Subscription
   const { data: { packagings = [] } = {}, loading, error } = useSubscription(
      FETCH_PACKAGINGS
   )

   if (error) {
      toast.error('Something went wrong!')
      logger(error)
   }

   const [search, setSearch] = React.useState('')
   const [list, current, selectOption] = useSingleList(packagings)

   React.useEffect(() => {
      if (Object.keys(current).length) {
         ingredientDispatch({
            type: 'MODE',
            payload: {
               mode: ingredientState.currentMode,
               name: 'packaging',
               value: current,
            },
         })
         closeTunnel(3)
      }
   }, [current])

   return (
      <>
         <TunnelHeader title="Select Packaging" close={() => closeTunnel(3)} />
         <TunnelBody>
            {loading ? (
               <Loader />
            ) : (
               <>
                  {list.length ? (
                     <List>
                        {Object.keys(current).length > 0 ? (
                           <ListItem type="SSL1" title={current.title} />
                        ) : (
                           <ListSearch
                              onChange={value => setSearch(value)}
                              placeholder="type what you’re looking for..."
                           />
                        )}
                        <ListOptions>
                           {list
                              .filter(option =>
                                 option.title.toLowerCase().includes(search)
                              )
                              .map(option => (
                                 <ListItem
                                    type="SSL1"
                                    key={option.id}
                                    title={option.title}
                                    isActive={option.id === current.id}
                                    onClick={() =>
                                       selectOption('id', option.id)
                                    }
                                 />
                              ))}
                        </ListOptions>
                     </List>
                  ) : (
                     <Filler height="500px" message="No packagings found!" />
                  )}
               </>
            )}
         </TunnelBody>
      </>
   )
}

export default PackagingTunnel
