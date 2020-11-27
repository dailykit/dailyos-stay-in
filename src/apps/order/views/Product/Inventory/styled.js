import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
   padding: 16px;
   h2 {
      width: 320px;
      font-size: 16px;
      font-weight: 500;
      margin-right: 16px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
   }
   h3 {
      width: 180px;
      font-size: 16px;
      font-weight: 400;
   }
`

export const Labels = styled.ul`
   display: grid;
   grid-gap: 16px;
   grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
`

export const Label = styled.li(
   ({ isActive }) => css`
      padding: 8px;
      list-style: none;
      cursor: pointer;
      border-radius: 2px;
      ${isActive && `color: #fff`};
      background: ${isActive ? '#353244' : '#f3f3f3'};
      h3 {
         font-size: 14px;
         font-weight: 500;
         line-height: 14px;
      }
      > section {
         display: flex;
         margin-top: 8px;
         align-items: center;
         justify-content: space-between;
      }
   `
)

export const List = styled.div(() => css``)

export const ListHead = styled.header(
   () => css`
      height: 32px;
      display: grid;
      grid-gap: 16px;
      line-height: 32px;
      grid-template-columns: repeat(4, 1fr) 48px;
      span {
         color: #888d9d;
         padding: 0 14px;
         font-size: 14px;
         font-weight: 400;
      }
   `
)

export const ListBody = styled.div(() => css``)

export const ListBodyItem = styled.div(
   ({ isOpen, isAssembled }) => css`
      cursor: pointer;
      background: ${isAssembled ? '#79df54' : '#f9daa8'};
      border-left: ${isOpen
         ? `4px solid rgba(0, 0, 0, 0.5)`
         : '4px solid transparent'};
      header {
         height: 48px;
         display: grid;
         grid-gap: 16px;
         line-height: 48px;
         grid-template-columns: repeat(2, 1fr);
         span {
            padding: 0 14px;
            display: flex;
            align-items: center;
         }
      }
   `
)

export const StyledButton = styled.button`
   border: 2px;
   height: 28px;
   display: flex;
   padding: 0 8px;
   color: #787d91;
   cursor: pointer;
   font-weight: 500;
   background: white;
   align-items: center;
   text-transform: uppercase;
   border: 1px solid rgba(0, 0, 0, 0.2);
   svg {
      margin-left: 2px;
   }
`
