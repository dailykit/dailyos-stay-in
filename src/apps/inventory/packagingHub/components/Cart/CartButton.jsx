import React from 'react'
import styled from 'styled-components'
import { ComboButton, Tunnels, Tunnel, useTunnel } from '@dailykit/ui'

import CartTunnel from './CartTunnel'

import { CartIcon } from '../../../assets/icons'

export default function CartButton() {
   const [tunnels, openTunnel, closeTunnel] = useTunnel(1)

   return (
      <>
         <Tunnels tunnels={tunnels}>
            <Tunnel layer={1} size="lg" style={{ overflowY: 'auto' }}>
               <CartTunnel close={closeTunnel} />
            </Tunnel>
         </Tunnels>
         <Wrapper>
            <ComboButton type="solid" onClick={() => openTunnel(1)}>
               <CartIcon />
               Go To Purchase Orders
            </ComboButton>
         </Wrapper>
      </>
   )
}

const Wrapper = styled.div`
   position: absolute;
   padding: 32px;
   padding-top: 36px;
   top: 0;
   right: 0;
   z-index: 2;
`
