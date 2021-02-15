import styled from 'styled-components'

export const StyledWrapper = styled.div`
   padding: 16px;
`
export const ItemInfo = styled.div`
   height: 4rem;
   padding: 0.5rem;
   display: flex;
   align-items: center;
   position: relative;

   img {
      height: 2.8rem;
      width: 2.8rem;
      object-fit: cover;
      border-radius: 2px;
      margin-right: 0.5rem;
   }

   h3 {
      font-weight: normal;
      text-align: left;
      width: 200px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
   }

   button {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      background: none;
      border: none;
      cursor: pointer;
   }
`

export const StyledAction = styled.div`
   position: absolute;
   right: 16px;
   top: 16px;
`

export const StyledTable = styled.table`
   width: ${props => (props.full ? '100%' : 'auto')};

   thead {
      font-weight: 500;
      font-size: 12px;
      line-height: 14px;
      color: #888d9d;

      th {
         padding: 16px 8px;
         min-width: 100px;
         text-align: left;
      }
   }

   tbody {
      border: 1px solid #ececec;

      tr {
         td {
            min-width: 100px;
            font-weight: 500;
            font-size: 14px;
            line-height: 14px;
            color: #555b6e;
            padding: 8px;

            input[type='radio'] {
               cursor: pointer;
            }

            &:first-child {
               font-weight: 500;
               font-size: 16px;
               line-height: 14px;
               color: #555b6e;
               display: flex;

               span {
                  margin-left: 8px;
               }
            }
         }
      }
   }
`

export const StyledDefault = styled.span`
   padding: 2px;
   background: linear-gradient(180deg, #28c1f7 -4.17%, #00a7e1 100%);
   color: #fff;
   text-transform: uppercase;
   font-size: 12px;
   font-weight: normal;
`

export const Modifier = styled.span`
   position: relative;
   overflow: hidden;
   display: inline-block;

   > span {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 0;
      left: -200px;
      width: 100%;
      background: #fff;
      transition: 0.2s ease left;

      svg {
         cursor: pointer;

         &:first-child {
            margin-right: 8px;
         }
      }
   }

   &:hover {
      > span {
         left: 0;
      }
   }
`

export const StyledProductOption = styled.div`
   display: flex;
   flex-direction: row;
   align-items: center;
   height: 40px;

   span:not(:last-child) {
      margin-right: 16px;
   }
`