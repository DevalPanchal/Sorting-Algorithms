import React from 'react';

export function AlgorithmInfo(props) {
  return (
     <div className="information-container">
          <h1>{ props.algorithm }</h1>
          <div className="algorithms">
               {
                    props.algorithm === "BUBBLE SORT" ? (
                         <pre>
                         {`BubbleSort(array) {
  for i -> 0 to arrayLength 
     for j -> 0 to (arrayLength - i - 1)
      if arr[j] > arr[j + 1]
        swap(arr[j], arr[j + 1])
}
`}
                         </pre>
                    ) : (<></>)
               }
          </div>
     </div>
  );
}
