import React from 'react'
import {
   List,
   ListItem,
   ListSearch,
   ListOptions,
   useSingleList,
   Text,
   TextButton,
} from '@dailykit/ui'

import { RecipeContext } from '../../../../../context/recipee'

import { CloseIcon } from '../../../../../assets/icons'

import { TunnelHeader, TunnelBody } from '../styled'
import { useMutation } from '@apollo/react-hooks'
import {
   CREATE_SIMPLE_RECIPE_YIELD_SACHET,
   UPDATE_SIMPLE_RECIPE_YIELD_SACHET,
} from '../../../../../graphql'
import { toast } from 'react-toastify'

const SachetTunnel = ({ closeTunnel, sachets }) => {
   const { recipeState } = React.useContext(RecipeContext)

   const [busy, setBusy] = React.useState(false)

   // State for search input
   const [search, setSearch] = React.useState('')
   const [list, current, selectOption] = useSingleList(
      sachets.map(sachet => ({
         ...sachet,
         title: sachet.quantity + ' ' + sachet.unit,
      }))
   )

   // Mutation
   const [createSachet] = useMutation(CREATE_SIMPLE_RECIPE_YIELD_SACHET, {
      variables: {
         objects: [
            {
               ingredientSachetId: current.id,
               recipeYieldId: recipeState.serving.id,
            },
         ],
      },
      onCompleted: () => {
         toast.success('Sachet added!')
         closeTunnel(7)
      },
      onError: error => {
         console.log(error)
         toast.error()
      },
   })
   const [updateSachet] = useMutation(UPDATE_SIMPLE_RECIPE_YIELD_SACHET, {
      variables: {
         sachetId: recipeState.sachet?.id,
         yieldId: recipeState.serving.id,
         set: {
            ingredientSachetId: current.id,
         },
      },
      onCompleted: () => {
         toast.success('Sachet updated!')
         closeTunnel(7)
      },
      onError: error => {
         console.log(error)
         toast.error()
      },
   })

   //Handlers
   const save = () => {
      if (busy) return
      setBusy(true)
      console.log(recipeState)
      if (recipeState.updating) updateSachet()
      else createSachet()
   }

   return (
      <React.Fragment>
         <TunnelHeader>
            <div>
               <span onClick={() => closeTunnel(7)}>
                  <CloseIcon color="#888D9D" size="20" />
               </span>
               <Text as="title">Select Sachet</Text>
            </div>
            <div>
               <TextButton type="solid" onClick={save}>
                  {busy ? 'Saving...' : 'Save'}
               </TextButton>
            </div>
         </TunnelHeader>
         <TunnelBody>
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
                           onClick={() => selectOption('id', option.id)}
                        />
                     ))}
               </ListOptions>
            </List>
         </TunnelBody>
      </React.Fragment>
   )
}

export default SachetTunnel
