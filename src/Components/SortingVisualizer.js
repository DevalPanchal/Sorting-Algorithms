import React, { useState, useEffect } from 'react';
import { generateRandomArray } from '../utility/Random';

const LIMIT = 30;

export function SortingVisualizer() {
     const [RandomArray, setRandomArray] = useState([]);

     const [animationSpeed, setAnimationSpeed] = useState(50);

     useEffect(() => {
          randomizeArray();
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

     async function bubbleSort() {
          // var currentArr = RandomArray;
          
          var sorted = false;

          while (!sorted) {
               sorted = true;
               
               for (var i = 0; i < RandomArray.length - 1; i++) {
                    if (RandomArray[i] > RandomArray[i + 1]) {
                         var swap1 = RandomArray[i];
                         var swap2 = RandomArray[i + 1];
                         RandomArray[i] = swap2;
                         RandomArray[i + 1] = swap1;
                         setRandomArray([...RandomArray, RandomArray]);
                         
                         //Changes the Style while swapping
                         let bar1 = document.getElementById(i).style;
                         let bar2 = document.getElementById(i + 1).style;
                         
                         bar1.backgroundColor = "orange";
                         bar2.backgroundColor = "red";

                         await sleep(animationSpeed);
                         
                         //Changes the Style back to original
                         let lastbar = document.getElementById(RandomArray.length).style;
                         lastbar.backgroundColor = "white";
                         bar1.backgroundColor = "#7b68ee";
                         bar2.backgroundColor = "#7b68ee";
                         
                         sorted = false;
                    }
               }
               if (sorted) finishedAnimation();
          }
     }

     const bubbleSort2 = async () => {
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
                         
                         // TODO: Temporary fix to a bug
                         let lastbar = document.getElementById(RandomArray.length).style;
                         lastbar.backgroundColor = "white";
                         //Changes the Style back to original
                         bar1.backgroundColor = "#7b68ee";
                         bar2.backgroundColor = "#7b68ee";
                         
                         sorted = false;
                    }
               }
               if (sorted) finishedAnimation();
          }
     }

     return (
          <div className="container">
               <div className="title">
                    <h1>Sorting Algorithm Visualization</h1>
               </div>
               <div className="dashboard">
                    <div className="button-container">
                         <button onClick={ bubbleSort2 }>Bubble Sort</button>
                         <button>Insertion Sort</button>
                    </div>
               </div>
               <div className="graph-container">
                    <div className="graph">
                         {
                              RandomArray &&
                              RandomArray.map((item, index) => (
                                   <div className="bar" id={ index } key={ index } style={{ height: item }}></div>
                              ))
                         }
                    </div>
                    
               </div>
          </div>
     );
}
