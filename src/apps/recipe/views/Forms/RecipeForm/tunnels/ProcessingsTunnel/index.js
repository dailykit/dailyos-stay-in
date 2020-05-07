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
import { UPDATE_RECIPE } from '../../../../../graphql'
import { toast } from 'react-toastify'
import { state } from '../../../../../context/tabs'

const ProcessingsTunnel = ({ state, closeTunnel, processings }) => {
   const { recipeState } = React.useContext(RecipeContext)

   console.log(processings)

   // State for search input
   const [search, setSearch] = React.useState('')
   const [list, current, selectOption] = useSingleList(
      processings.map(proc => ({ ...proc, title: proc.processingName }))
   )

   // Mutation
   const [updateRecipe] = useMutation(UPDATE_RECIPE, {
      onCompleted: () => {
         toast.success('Ingredient added!')
         closeTunnel(5)
         closeTunnel(4)
      },
      onError: error => {
         console.log(error)
         toast.error()
      },
   })

   //Handlers
   const add = () => {
      const ingredients = state.ingredients || []
      ingredients.push({
         id: recipeState.newIngredient.id,
         name: recipeState.newIngredient.name,
         slipName: recipeState.newIngredient.name,
         isVisible: true,
         ingredientProcessing: {
            id: current.id,
            processingName: current.title,
         },
      })
      updateRecipe({
         variables: {
            id: state.id,
            set: {
               ingredients,
            },
         },
      })
   }

   return (
      <React.Fragment>
         <TunnelHeader>
            <div>
               <span onClick={() => closeTunnel(5)}>
                  <CloseIcon color="#888D9D" size="20" />
               </span>
               <Text as="title">Select Processing</Text>
            </div>
            <div>
               <TextButton type="solid" onClick={add}>
                  Add
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

export default ProcessingsTunnel
