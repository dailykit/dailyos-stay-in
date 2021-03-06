import React from 'react'

const DoubleArrow = ({ direction = 'right' }) => {
   return (
      <>
         {direction === 'left' ? (
            <svg
               width="11"
               height="10"
               viewBox="0 0 11 10"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
            >
               <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.64645 9.35355C9.84171 9.54882 10.1583 9.54882 10.3536 9.35355C10.5488 9.15829 10.5488 8.84171 10.3536 8.64645L6.70711 5L10.3536 1.35355C10.5488 1.15829 10.5488 0.841709 10.3536 0.646446C10.1583 0.451184 9.84171 0.451184 9.64645 0.646446L5.64645 4.64645L5.29289 5L5.64645 5.35355L9.64645 9.35355ZM4.64645 9.35355C4.84171 9.54882 5.15829 9.54882 5.35355 9.35355C5.54882 9.15829 5.54882 8.84171 5.35355 8.64645L1.70711 5L5.35355 1.35355C5.54882 1.15829 5.54882 0.841709 5.35355 0.646446C5.15829 0.451184 4.84171 0.451184 4.64645 0.646446L0.646446 4.64645L0.292893 5L0.646446 5.35355L4.64645 9.35355Z"
                  fill="#919699"
               />
            </svg>
         ) : (
            <svg
               width="11"
               height="10"
               viewBox="0 0 11 10"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
            >
               <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.35355 0.646447C1.15829 0.451184 0.841709 0.451184 0.646447 0.646447C0.451184 0.841709 0.451184 1.15829 0.646447 1.35355L4.29289 5L0.646447 8.64645C0.451184 8.84171 0.451184 9.15829 0.646447 9.35355C0.841709 9.54882 1.15829 9.54882 1.35355 9.35355L5.35355 5.35355L5.70711 5L5.35355 4.64645L1.35355 0.646447ZM6.35355 0.646447C6.15829 0.451184 5.84171 0.451184 5.64645 0.646447C5.45118 0.841709 5.45118 1.15829 5.64645 1.35355L9.29289 5L5.64645 8.64645C5.45118 8.84171 5.45118 9.15829 5.64645 9.35355C5.84171 9.54882 6.15829 9.54882 6.35355 9.35355L10.3536 5.35355L10.7071 5L10.3536 4.64645L6.35355 0.646447Z"
                  fill="#919699"
               />
            </svg>
         )}
      </>
   )
}

export default DoubleArrow
