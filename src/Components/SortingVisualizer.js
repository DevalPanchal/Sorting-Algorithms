import React, { useState, useEffect } from 'react';
import { AlgorithmInfo } from './AlgorithmInfo';
// import { useNavigate } from 'react-router-dom';

const LIMIT = 30;

export function SortingVisualizer() {
     const [RandomArray, setRandomArray] = useState([]);

     const [animationSpeed, setAnimationSpeed] = useState(80);

     const [whichVisualization, setWhichVisualization] = useState({ name: "", timeComplexity: "" });

     // let navigate = useNavigate();

     useEffect(() => {
          randomizeArray();
     // eslint-disable-next-line react-hooks/exhaustive-deps
     }, []);

     function randomizeArray() {
          for (var i = 0; i < RandomArray.length; i++) {
            var bar = document.getElementById(i).style;
            bar.backgroundColor = "#7b68ee";
          }
          var array = [];
          for (var j = 0; j < LIMIT; j++) {
            array.push(randomVals(20, 400));
          }
          setRandomArray(array);
     }
      
     // Generates a random val between min and max
     function randomVals(min, max) {
          var randomVal = Math.floor(Math.random() * (max - min + 1) + min);
          return randomVal;
     }

     const sleep = (milliseconds) => {
          return new Promise((resolve) => setTimeout(resolve, milliseconds));
     };
     
     //ANIMATION FOR WHEN THE SORTING IS FINISHED
     async function finishedAnimation() {
          for (var i = 0; i < RandomArray.length; i++) {
               var bar = document.getElementById(i).style;
               bar.backgroundColor = "green";
               await sleep(animationSpeed);
          }
     }

     const bubbleSort = async () => {
          let sorted = false;
          for (let i = 0; i < RandomArray.length; i++) {
               for (let j = 0; j < (RandomArray.length - i - 1); j++) {
                    if (RandomArray[j] > RandomArray[j + 1]) {
                         let temp = RandomArray[j];
                         RandomArray[j] = RandomArray[j + 1];
                         RandomArray[j + 1] = temp;

                         setRandomArray([...RandomArray, RandomArray]);

                         //Changes the Style while swapping
                         let bar1 = document.getElementById(j).style;
                         let bar2 = document.getElementById(j + 1).style;
                         
                         bar1.backgroundColor = "orange";
                         bar2.backgroundColor = "red";

                         await sleep(animationSpeed);
                         
                         // hacky method to remove last bar
                         let lastbar = document.getElementById(RandomArray.length).style;
                         lastbar.backgroundColor = "white";
                         lastbar.boxShadow = "none";
                         // Changes the Style back to original
                         bar1.backgroundColor = "#7b68ee";
                         bar2.backgroundColor = "#7b68ee";
                         
                         sorted = false;
                    }
               }
               if (sorted) finishedAnimation();
          }
     }

     const insertionSort = async () => {
          let sorted = false;
          let n = RandomArray.length;
          for (let i = 1; i < n; i++) {
               let current = RandomArray[i];
               let j = i - 1;

               while ((j > -1) && (current < RandomArray[j])) {
                    RandomArray[j + 1] = RandomArray[j];
                    j--;
               }
               RandomArray[j + 1] = current;
               setRandomArray([...RandomArray, RandomArray]);

               let bar1 = document.getElementById(j + 1).style;
               let bar2 = document.getElementById(i).style;
               bar1.backgroundColor = "red";
               bar2.backgroundColor = "orange";

               await sleep(animationSpeed);

               // hacky method to remove last bar
               let lastbar = document.getElementById(RandomArray.length).style;
               lastbar.backgroundColor = "white";
               lastbar.boxShadow = "none";
               // Changes the Style back to original
               bar1.backgroundColor = "#7b68ee";
               bar2.backgroundColor = "#7b68ee";
               sorted = true;
          }
          if (sorted) finishedAnimation();
     }

     const quickSort = () => {
          let left = 0;
          let right = RandomArray.length - 1;

          sortQuickSort(RandomArray, left, right);
          setTimeout(finishedAnimation, 1000);
     }

     const sortQuickSort = async (arr, left, right) => {
          if (left < right) {
               let partitionIndex = partition(arr, left, right);

               setRandomArray([...RandomArray, arr]);
               await sleep(animationSpeed + 60);
               sortQuickSort(arr, left, partitionIndex - 1);
               sortQuickSort(arr, partitionIndex + 1, right);
          }
     }

     const partition = (arr, start, end) => {
          let pivot = arr[end];
          let i = start - 1;

          for (let j = start; j < end; j++) {
               if (arr[j] < pivot) {
                    i++;
                    let temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;

                    let bar1 = document.getElementById(i).style;
                    let bar2 = document.getElementById(j).style;
                    
                    bar1.backgroundColor = "red";
                    bar2.backgroundColor = "orange";

                    setTimeout(() => {
                         let lastBar = document.getElementById(arr.length).style;
                         lastBar.backgroundColor = "white";
                         lastBar.boxShadow = "none";
                         bar1.backgroundColor = "#7b68ee";
                         bar2.backgroundColor = "#7b68ee";
                    }, 200);

                    setRandomArray([...RandomArray, arr]);
               }
          }
          let temp = arr[i + 1];
          arr[i + 1] = arr[end];
          arr[end] = temp;

          return i + 1;
     }

     const mergeSort = async (arr, n) => {
          let curr_size;
          let left_start;
          for (curr_size = 1; curr_size <= n - 1; curr_size = 2 * curr_size) {
               await sleep(animationSpeed);
               for (left_start = 0; left_start < n - 1; left_start += 2 * curr_size) {
                    let mid = Math.min(left_start + curr_size - 1, n - 1);
                    let right_end = Math.min(left_start + 2 * curr_size - 1, n - 1);

                    merge(arr, left_start, mid, right_end);
               }
          }
     }

     const merge = (arr, l, m, r) => {
          let i, j, k;
          let n1 = m - l + 1;
          let n2 = r - m;

          let L = Array(n1).fill(0);
          let R = Array(n2).fill(0);

          for (i = 0; i < n1; i++) {
               L[i] = arr[l + i];
          }
          for (j = 0; j < n2; j++) {
               R[j] = arr[m + 1 + j];
          }

          i = 0;
          j = 0;
          k = l;

          while (i < n1 && j < n2) {
               if (L[i] <= R[j]) {
                    arr[k] = L[i];
                    i++;
                    
                    setRandomArray([...RandomArray, arr]);

                    let bar1 = document.getElementById(k).style;
                    let bar2 = document.getElementById(i).style;

                    
                    bar1.backgroundColor = "red";
                    bar2.backgroundColor = "orange";
                    
                    setTimeout(() => {
                         let lastBar = document.getElementById(arr.length).style;

                         lastBar.backgroundColor = "white";
                         lastBar.boxShadow = "none";
                         bar1.backgroundColor = "#7b68ee";
                         bar2.backgroundColor = "#7b68ee";
                    }, 800);
               } else {
                    arr[k] = R[j];
                    j++;

                    setRandomArray([...RandomArray, arr]);

                    let bar1 = document.getElementById(k).style;
                    let bar2 = document.getElementById(i).style;
                    
                    bar1.backgroundColor = "red";
                    bar2.backgroundColor = "orange";
                    
                    setTimeout(() => {
                         let lastBar = document.getElementById(arr.length).style;

                         lastBar.backgroundColor = "white";
                         lastBar.boxShadow = "none";
                         bar1.backgroundColor = "#7b68ee";
                         bar2.backgroundColor = "#7b68ee";
                    }, 200);
               }
               k++;
          }

          while (i < n1) {
               arr[k] = L[i];
               i++;
               k++;
               setRandomArray([...RandomArray, arr]);
          }

          while (j < n2) {
               arr[k] = R[j];
               j++;
               k++;
               setRandomArray([...RandomArray, arr]);
          }
     }


     const checkReset = () => {
          randomizeArray();
          setWhichVisualization({ name: "", timeComplexity: "" });
     }

     return (
          <div className="container">
               {/* <div className="title">
                    <h1>Sorting Algorithm Visualization</h1>
               </div> */}
               <div className="dashboard">
                    <h1>Sorting Algorithm Visualization</h1>
                    <div className="button-container">
                         <button className="reset-btn" onClick={ checkReset }>Reset Array</button>
                         <button onClick={() => {
                              setWhichVisualization({ name: "BUBBLE SORT", timeComplexity: "O(n^2)" });
                              bubbleSort();
                         }}>Bubble Sort</button>
                         <button onClick={() => {
                              setWhichVisualization({ name: "INSERTION SORT", timeComplexity: "O(n^2)"});
                              insertionSort();
                         }}>Insertion Sort</button>
                         <button onClick={() => {
                              setWhichVisualization({ name: "QUICK SORT", timeComplexity: "O(n log n)"});
                              quickSort();
                         }}>Quick Sort</button>
                         <button onClick={() => {
                              setWhichVisualization({ name: "MERGE SORT", timeComplexity: "O(n log n)" });
                              mergeSort(RandomArray, RandomArray.length);
                              setTimeout(finishedAnimation, 1500);
                         }}>Merge Sort</button>
                    </div>
               </div>
               <div className="graph-container">
                    {
                         whichVisualization !== "" && (
                              <div className="which-vis">
                                   <h2>Algorithm: <p>{ whichVisualization.name }</p></h2>
                                   <h2>Time Complexity: <p>{ whichVisualization.timeComplexity }</p></h2>
                              </div>
                         )
                    }
                    <div className="graph">
                         {
                              RandomArray &&
                              RandomArray.map((item, index) => (
                                   <div className="bar" id={ index } key={ index } style={{ height: item }}></div>
                              ))
                         }
                    </div>
               </div>
               {/* <AlgorithmInfo algorithm={ whichVisualization.name } /> */}
          </div>
     );
}
