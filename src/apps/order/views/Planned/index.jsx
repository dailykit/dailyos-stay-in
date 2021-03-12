import React from 'react'
import {
   Flex,
   SectionTab as Tab,
   SectionTabs as Tabs,
   SectionTabList as TabList,
   SectionTabPanel as TabPanel,
   SectionTabPanels as TabPanels,
} from '@dailykit/ui'

import { Container } from './styled'
import { useTabs } from '../../../../shared/providers'
import { Products, ProductOptions, SimpleRecipes } from './sections'

const Planned = () => {
   const { tab, addTab } = useTabs()

   React.useEffect(() => {
      if (!tab) {
         addTab('Planned', '/order/planned')
      }
   }, [tab, addTab])
   return (
      <Container>
         <Tabs>
            <TabList>
               <Tab>
                  <TabItem>Products</TabItem>
               </Tab>
               <Tab>
                  <TabItem>Product Options</TabItem>
               </Tab>
               <Tab>
                  <TabItem>Simple Recipes</TabItem>
               </Tab>
            </TabList>
            <TabPanels>
               <TabPanel>
                  <Products />
               </TabPanel>
               <TabPanel>
                  <ProductOptions />
               </TabPanel>
               <TabPanel>
                  <SimpleRecipes />
               </TabPanel>
            </TabPanels>
         </Tabs>
      </Container>
   )
}

export default Planned

const TabItem = ({ children }) => {
   return (
      <Flex container height="40px" alignItems="center" justifyContent="center">
         {children}
      </Flex>
   )
}
