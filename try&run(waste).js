const container = document.querySelector(".container");
const Sortedcontainer = document.querySelector(".Sortedcontainer");
const arr1 = [
	9, 8, 7, 6, 5, 4, 3, 2, 1, 45, 132, 287, 318, 70, 45, 132, 287, 94, 360,
	176, 22, 398, 265, 123, 55, 381, 189, 318, 70,
];
const arr2 = arr1.slice().sort((a, b) => a - b);
console.log(arr1.length);
const arr = arr1.slice();
const swapMovements = [];

//review: It's not happening any sorting here actually, b'coz:- What happening is => we sort array and displaying there movements visually

const show = function (arr1, container, currentIndex, NextIndex, sortColor) {
	container.innerHTML = "";
	arr1.forEach((value, index) => {
		let barHtmlElement;
		// console.log(currentIndex, NextIndex);
		if (
			currentIndex &&
			NextIndex &&
			(currentIndex === index || index === NextIndex)
		) {
			if (sortColor === "beforeSortColor-green")
				barHtmlElement = `<div class="bar" style="height:${
					value * 10
				}px; background-color:green;"></div>`;
			else if (sortColor === "afterSortColor-red")
				barHtmlElement = `<div class="bar" style="height:${
					value * 10
				}px; background-color:red;"></div>`;
			console
				.log
				// `Hiii ${currentIndex}  ${NextIndex}  ${value} ${index} ${sortColor} `
				();
		} else {
			console
				.log
				// `Hiii ${currentIndex}  ${NextIndex}  ${value} ${index} ${sortColor}`
				();
			barHtmlElement = `<div class="bar" style="height:${
				value * 10
			}px; background-color:blue;"></div>`;
		}
		container.insertAdjacentHTML("beforeend", barHtmlElement);
	});
	// console.log(arr1);
};
show(arr1, container);
show(arr2, Sortedcontainer);

for (let round = 1; round < arr.length; round++) {
	for (let i = 0; i < arr.length - round; i++) {
		if (arr[i] > arr[i + 1]) {
			swapMovements.push([i, i + 1]);
			[arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
		}
	}
}
console.log(arr1, swapMovements.length, swapMovements);

// const temp = async function (element, index) {
// 	setTimeout(() => {
// 		// console.log("temp...",index);
// 		let i, j; //as we're doing bubblesort so, this i & j are adjacent elements.
// 		[i, j] = element;
// 		show(arr1, container, i, j, "beforeSortColor-green");
// 		console.log(arr1);
// 		[arr1[i], arr1[j]] = [arr1[j], arr[i]];
// 		console.log(arr1);
// 		show(arr1, container, i, j, "afterSortColor-red");
// 	}, 1000 * index);
// };

const temp = function (element, index) {
	// console.log("temp...",index);
	let i, j; //as we're doing bubblesort so, this i & j are adjacent elements.
	[i, j] = element;
	show(arr1, container, i, j, "beforeSortColor-green");
	console.log(arr1);
	wait(10).then(() => {
		[arr1[i], arr1[j]] = [arr1[j], arr[i]];
		console.log(arr1);
		show(arr1, container, i, j, "afterSortColor-red");
	});
};

const fun1 = function () {
	setTimeout(() => {
		console.log("Hii");
	}, 1000 * 5);
};

const wait = function (seconds) {
	return new Promise(function (resolve) {
		setTimeout(resolve, seconds * 1000);
		// console.log("Jo");
	});
};

const temproary = function (element, index) {
	wait(6).then(() => {
		temp(element, index);
		console.log(index);
	});
};

// swapMovements.forEach(async (element, index) => {
// 	console.log(index);
// 	await temp(element, index);
// 	// console.log("come....",index);
// 	// await fun1(); //Why fun1() function called before calling temp() function even i have used the await ????
// 	// That's why i will prefer you that plzz don't use await instead of that use promise
// });
// console.log("Completed!!!");

swapMovements.forEach((element, index) => {
	temproary(element, index);
});

/* Don't know why it is not working 
const container = document.querySelector('.container');
const arr1 = [45, 132, 287, 94, 360, 176, 22, 398, 265, 123, 55, 381, 189, 318, 70,45, 132, 287, 94, 360, 176, 22, 398, 265, 123, 55, 381, 189, 318, 70,45, 132, 287, 94, 360, 176, 22, 398, 265, 123, 55, 381, 189, 318, 70,45, 132, 287, 94, 360, 176, 22, 398, 265, 123, 55, 381, 189, 318, 70,45, 132, 287, 94, 360, 176, 22, 398, 265, 123, 55, 381, 189, 318, 70,45, 132, 287, 94, 360, 176, 22, 398, 265, 123, 55, 381, 189, 318, 70,45, 132, 287, 94, 360, 176, 22, 398, 265, 123, 55, 381, 189, 318, 70];
console.log(arr1.length);
const arr = arr1.slice();
const swapMovements = [];

const show = function(currentIndex, NextIndex,sortColor){
    setTimeout(() => {
        container.innerHTML = "";
        arr1.forEach((value,index) => {
        let barHtmlElement;
        // console.log(currentIndex, NextIndex);
        if(currentIndex && NextIndex && (currentIndex === index || index === NextIndex)){
            if(sortColor === "beforeSortColor-red") barHtmlElement = `<div class="bar" style="height:${value}px; background-color:red;"></div>`;
            else if(sortColor === "afterSortColor-green") barHtmlElement = `<div class="bar" style="height:${value}px; background-color:green;"></div>`;
        }
        else barHtmlElement = `<div class="bar" style="height:${value}px; background-color:blue;"></div>`;
        container.insertAdjacentHTML('beforeend',barHtmlElement);
        })
    }, 1000)
}
show();

for(let round=1; round<arr.length; round++){
    for(let i=0; i<arr.length-round; i++){
        if(arr[i] > arr[i+1]){
            swapMovements.push([i,i+1]);
            [arr[i], arr[i+1]] = [arr[i+1],arr[i]];
        }
    }
}
console.log(swapMovements.length);

const temp = async function(element,index){
    setTimeout(async () => {
        console.log("temp...",index);
        let i,j; //as we're doing bubblesort so, this i & j are adjacent elements.
        [i,j] = element;
        await show(i,j,"beforeSortColor-red");
        [arr1[i],arr1[j]] = [arr1[j],arr[i]];
        await show(i,j,"afterSortColor-green");
    }, 1000*5)
}
const fun1 = function(){
    setTimeout(()=>{
        console.log("Hii");
    },1000*5);
}

swapMovements.forEach(async (element,index) => {
    await temp(element,index);
    // console.log("come....",index);
    // await fun1(); //Why fun1() function called before calling temp() function even i have used the await ???? 
    // That's why i will prefer you that plzz don't use await instead of that use promise 
})
*/

/*
// selecting elements 
const container = document.querySelector('.container');

// Given array 
const arr = [45, 132, 287, 94, 360, 176, 22, 398, 265, 123, 55, 381, 189, 318, 70];

// Calculate the length of bars {minimum=0px & maximum=contaierHeight(i.e 400px)}
// let's say we accept only that array whose element is in between 0 to 400. so, it will be easy to proceed further in the project.
// Note:- If we have the duplicate elements in the array then how we will select the unique bar & swap and do sorting ??

/*
Array.from(barsElement).forEach(barHTMLelement => {
    // console.log(barHTMLelement);
    // console.log(Number.parseInt(barHTMLelement.style.height)); //Number.parseInt(45px) ==> 45 
    const currentElement = Number.parseInt(barHTMLelement.style.height);
});

// Bubblesort:-
for(round = 1; round < arr.length ; round++){
    let isAnySwap = false;
    for(i=0; i<arr.length-round; i++){
        if(arr[i] > arr[i+1]){
            isAnySwap = true;

            //swapping using array destructuring 
            [arr[i], arr[i+1]] = [arr[i+1], arr[i]]; 

            // Do something like that if we swap the array then bar will also swap automatically. Like classes and objects. ==> sort employee objects based on salary 
        }
    }
    if(!isAnySwap) break; //Already sorted array
}
console.log(arr);
*



// creating bar and adding in container with this given array size
arr.forEach(element => {
    // creating element 
    const barHtml = `<div class="bar" style="height:${element}px"></div>`;
    container.insertAdjacentHTML('beforeend',barHtml);
    // container.insertAdjacentElement('beforeend',barHtml); //wrong syntax... B'coz:- we are given html NOT the elememnt
});


// How to do sorting on the elements which are in the .container div ??? so that we can swap the bar easily 

const barsElement = document.querySelectorAll('.bar'); //Nodelist will be return 
const barsArray = Array.from(barsElement);
// console.log(barsArray);

//Before sorting 
console.log('------------- Before sorting ------------');
barsArray.forEach(element => console.log(element.style.height));

// Bubblesort:-
const fun1 = function() {
    let isAnySwap = false;
    for(i=0; i<barsArray.length-round; i++){
        setTimeout(() => {
            if(Number.parseInt(barsArray[i].style.height) > Number.parseInt(barsArray[i+1].style.height)){
                isAnySwap = true;
    
                setTimeout(() => {
                    barsArray[i].style.backgroundColor = 'red';
                    barsArray[i+1].style.backgroundColor = 'yellow';
    
                    setTimeout(() => {
                        [barsArray[i].style.height , barsArray[i+1].style.height]=[ barsArray[i+1].style.height, barsArray[i].style.height];
                        [barsArray[i].style.backgroundColor, barsArray[i+1].style.backgroundColor] = [barsArray[i+1].style.backgroundColor, barsArray[i].style.backgroundColor]
    
                        setTimeout(() => {
                                    //swapping using array destructuring 
                        // [barsArray[i], barsArray[i+1]] = [barsArray[i+1], barsArray[i]]; 
                        // container.insertBefore(barsArray[i+1] , barsArray[i]);
            
                        barsArray[i].style.removeProperty('background-color');
                        barsArray[i+1].style.removeProperty('background-color');
                        }, 1000)
                    }, 1000)
    
                }, 1000)
                // Do something like that if we swap the array then bar will also swap automatically. Like classes and objects. ==> sort employee objects based on salary 
            }
        }, 1000)
    }
    if(!isAnySwap){
        clearTimeout(fun1); //Already sorted array  
    } 
}

setTimeout(() => {
    for(round = 1; round < barsArray.length ; round++){
        console.log("Hii");
        setTimeout(fun1, 1000)
    }
} , 1000)

// // Bubblesort:-
// setTimeout(() => {
//     for(round = 1; round < barsArray.length ; round++){
//         setTimeout(() => {
//             let isAnySwap = false;
//             for(i=0; i<barsArray.length-round; i++){
//                 setTimeout(() => {
//                     if(Number.parseInt(barsArray[i].style.height) > Number.parseInt(barsArray[i+1].style.height)){
//                         isAnySwap = true;
            
//                         setTimeout(() => {
//                             barsArray[i].style.backgroundColor = 'red';
//                             barsArray[i+1].style.backgroundColor = 'yellow';
            
//                             setTimeout(() => {
//                                 [barsArray[i].style.height , barsArray[i+1].style.height]=[ barsArray[i+1].style.height, barsArray[i].style.height];
//                                 [barsArray[i].style.backgroundColor, barsArray[i+1].style.backgroundColor] = [barsArray[i+1].style.backgroundColor, barsArray[i].style.backgroundColor]
            
//                                 setTimeout(() => {
//                                             //swapping using array destructuring 
//                                 // [barsArray[i], barsArray[i+1]] = [barsArray[i+1], barsArray[i]]; 
//                                 // container.insertBefore(barsArray[i+1] , barsArray[i]);
                    
//                                 barsArray[i].style.removeProperty('background-color');
//                                 barsArray[i+1].style.removeProperty('background-color');
//                                 }, 1000)
//                             }, 1000)
            
//                         }, 1000)
//                         // Do something like that if we swap the array then bar will also swap automatically. Like classes and objects. ==> sort employee objects based on salary 
//                     }
//                 }, 1000)
//             }
//             if(!isAnySwap) break; //Already sorted array
//         }, 1000)
//     }
// } , 1000)


// for(round = 1; round < barsArray.length ; round++){
//     let isAnySwap = false;
//     for(i=0; i<barsArray.length-round; i++){
//         if(Number.parseInt(barsArray[i].style.height) > Number.parseInt(barsArray[i+1].style.height)){
//             isAnySwap = true;

//             barsArray[i].style.backgroundColor = 'red';
//             barsArray[i+1].style.backgroundColor = 'yellow';

//             [barsArray[i].style.height , barsArray[i+1].style.height]=[ barsArray[i+1].style.height, barsArray[i].style.height];
//             [barsArray[i].style.backgroundColor, barsArray[i+1].style.backgroundColor] = [barsArray[i+1].style.backgroundColor, barsArray[i].style.backgroundColor]

//             //swapping using array destructuring 
//             // [barsArray[i], barsArray[i+1]] = [barsArray[i+1], barsArray[i]]; 
//             // container.insertBefore(barsArray[i+1] , barsArray[i]);

//             barsArray[i].style.removeProperty('background-color');
//             barsArray[i+1].style.removeProperty('background-color');

//             // Do something like that if we swap the array then bar will also swap automatically. Like classes and objects. ==> sort employee objects based on salary 
//         }
//     }
//     if(!isAnySwap) break; //Already sorted array
// }
//After sorting 
// console.log('------------- After sorting ------------');
// barsArray.forEach(element => console.log(element.style.height));

// inserting new element before referenceElement
// parentElement.insertBefore(newElement, referenceElement);


// document.querySelectorAll('.bar').forEach(element => console.log(Number.parseInt(element.style.height)));


// How do we use break statement if we use setTimeout() ???
*/
