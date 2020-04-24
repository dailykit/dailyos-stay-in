import React from 'react'
import { ButtonTile, Checkbox, Toggle } from '@dailykit/ui'

import { SimpleProductContext } from '../../../../../../context/product/simpleProduct'

// styles
import {
   StyledWrapper,
   StyledLayout,
   StyledListing,
   StyledPanel,
   StyledListingTile,
   StyledTabs,
   StyledTab,
   StyledTabView,
   StyledTable,
} from './styled'

import { Accompaniments } from '../'

export default function Recipe({ openTunnel }) {
   const { state, dispatch } = React.useContext(SimpleProductContext)

   const [_state, _setState] = React.useState({
      view: 'pricing',
   })

   return (
      <StyledWrapper>
         {state.recipe ? (
            <StyledLayout>
               <StyledListing>
                  <StyledListingTile active>
                     <h3>{state.recipe.name}</h3>
                  </StyledListingTile>
               </StyledListing>
               <StyledPanel>
                  <h2>{state.recipe.name}</h2>
                  <StyledTabs>
                     <StyledTab
                        onClick={() =>
                           _setState({ ..._state, view: 'pricing' })
                        }
                        active={_state.view === 'pricing'}
                     >
                        Pricing
                     </StyledTab>
                     <StyledTab
                        onClick={() =>
                           _setState({ ..._state, view: 'accompaniments' })
                        }
                        active={_state.view === 'accompaniments'}
                     >
                        Accompaniments
                     </StyledTab>
                  </StyledTabs>
                  <StyledTabView>
                     {_state.view === 'pricing' ? (
                        <StyledTable>
                           <thead>
                              <tr>
                                 <th></th>
                                 <th>Make default</th>
                                 <th>Servings</th>
                                 <th>Set Pricing</th>
                                 <th>Discounted Price</th>
                              </tr>
                           </thead>
                           <tbody>
                              {Object.entries(state.options).map(
                                 ([type, value]) =>
                                    value.options.map((el, i) => (
                                       <tr key={i}>
                                          <td>
                                             {i === 0 ? (
                                                <React.Fragment>
                                                   <Checkbox
                                                      checked={value.isActive}
                                                      onChange={val =>
                                                         console.log(val)
                                                      }
                                                   />
                                                   <span>
                                                      {type === 'mealKit'
                                                         ? 'Meal Kit'
                                                         : 'Ready to Eat'}
                                                   </span>
                                                </React.Fragment>
                                             ) : (
                                                ''
                                             )}
                                          </td>
                                          <td>
                                             {i === 0 ? (
                                                <Toggle
                                                   checked={value.isDefault}
                                                   setChecked={val =>
                                                      console.log(val)
                                                   }
                                                />
                                             ) : (
                                                ''
                                             )}
                                          </td>
                                          <td>{el.yield.serving} </td>
                                          <td>{el.price.value} </td>
                                          <td>{el.discountedPrice.value} </td>
                                       </tr>
                                    ))
                              )}
                           </tbody>
                        </StyledTable>
                     ) : (
                        <Accompaniments openTunnel={openTunnel} />
                     )}
                  </StyledTabView>
               </StyledPanel>
            </StyledLayout>
         ) : (
            <ButtonTile
               type="primary"
               size="lg"
               text="Add Recipe"
               onClick={() => openTunnel(2)}
            />
         )}
      </StyledWrapper>
   )
}
