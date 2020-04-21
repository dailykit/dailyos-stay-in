import styled from 'styled-components'

export const Container = styled.div`
   max-width: 1280px;
   margin: 0 auto;
`

export const StyledHeader = styled.div`
   height: 100px;
   display: flex;
   align-items: center;
   justify-content: space-between;
`

export const InputWrapper = styled.div`
   max-width: 256px;
`

export const ActionsWrapper = styled.div`
   display: flex;
   justify-content: space-between;
`

export const StyledMain = styled.div`
   margin-top: 32px;
   height: 100%;
   background: #f3f3f3;
`

export const StyledTop = styled.div`
   display: grid;
   grid-template-columns: 20% 80%;
   grid-gap: 40px;
   height: 192px;
   align-items: center;
`

export const StyledStatsContainer = styled.div`
   height: 128px;
   display: flex;
   align-items: flex-end;
`
export const StyledStat = styled.div`
   padding-right: 40px;
   margin-right: 12px;
   color: #555b6e;
   font-weight: 500;
   &:not(:last-child) {
      border-right: 1px solid #dddddd;
   }
   h2 {
      font-size: 20px;
      line-height: 23px;
   }
   p {
      font-size: 14px;
      line-height: 16px;
   }
`

export const PhotoTileWrapper = styled.div`
   width: 464px;
`
export const ImageContainer = styled.div`
   width: 464px;
   height: 128px;
   position: relative;
   img {
      width: 464px;
      height: 128px;
      object-fit: auto;
   }
   div {
      position: absolute;
      padding: 12px;
      right: 0;
      left: 0;
      text-align: right;
      background: linear-gradient(to bottom, #111, transparent);
      span {
         margin-right: 16px;
         cursor: pointer;
      }
   }
`

export const StyledInfo = styled.div`
   h1 {
      font-weight: 500;
      font-size: 24px;
      line-height: 28px;
      color: #555b6e;
   }
   span {
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      color: #888d9d;
   }
`

export const StyledSupplier = styled.div`
   span {
      padding: 0 16px;
      font-size: 14px;
      line-height: 16px;
      color: #888d9d;

      &:first-child {
         font-weight: 500;
         color: #00a7e1;
         border-right: 1px solid #e4e4e4;
      }
   }
`

export const StyledGrid = styled.div`
   display: grid;
   grid-template-columns: repeat(5, 1fr);
   height: 96px;
   border-bottom: 1px solid #dddddd;
   border-top: 1px solid #dddddd;

   > div {
      &:not(:last-child) {
         border-right: 1px solid #dddddd;
      }

      display: flex;
      align-items: center;
      padding: 12px;

      > div {
         &:last-child {
            flex: 1;
            padding: 8px;
            display: flex;
            flex-direction: column;

            > span {
               font-weight: 500;
               font-size: 14px;
               line-height: 16px;
               color: #555b6e;
               margin-bottom: 8px;
            }
            div {
               font-weight: 500;
               font-size: 20px;
               line-height: 23px;
               color: #555b6e;
               display: flex;
               justify-content: space-between;

               span:last-child {
                  font-size: 16px;
                  line-height: 19px;
               }
            }
         }
      }
   }
`
