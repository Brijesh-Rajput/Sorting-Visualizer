const container = document.querySelector(".container");
// const sortedContainer = document.querySelector(".sortedContainer");
const startBtn = document.querySelector(".start-btn");

// getting sorting Algo name which is selected in select option
// const sortingAlgorithmName = document.querySelector(
// 	"#sortingAlgorithmNameSection"
// );
// console.log(sortingAlgorithmName);

// getting array elements from user
// const arr  = document.querySelector('#array');

class SortingVisualizer {
	static #setBarElement = function (height, color) {
		return `<div class="bar" style="height:${
			height
			// * 30
			// * 10
		}px; background-color:${color};"></div>`;
	};

	static #wait = function (seconds) {
		return new Promise(function (resolve) {
			setTimeout(resolve, seconds * 1000);
		});
	};

	static #show(arr, indx1, indx2, swapping, color1, color2) {
		// we don't need of swapping variable here
		// console.log(` show started ${swapping}`);
		container.innerHTML = "";
		let barHtmlElement;

		for (const [indx, element] of arr.entries()) {
			if (indx === indx1) {
				barHtmlElement = this.#setBarElement(element, color1);
			} else if (indx === indx2) {
				barHtmlElement = this.#setBarElement(element, color2);
			} else {
				barHtmlElement = this.#setBarElement(element, "violet");
			}
			container.insertAdjacentHTML("beforeend", barHtmlElement);
		}
		// console.log(`completed ${arr}`);
	}

	static #startVisualizer = async function (
		tempArrayForSorting,
		swapMovements,
		seconds
	) {
		for (const movement of swapMovements) {
			// const movement = [0, 1];
			const [i, j] = movement;
			this.#show(
				// No need of await keyword here bcoz: show() function doesn't return us "Promise".
				tempArrayForSorting,
				i,
				j,
				"beforeSwappingColor",
				"red",
				"blue"
			);

			await this.#wait(seconds);

			// Does it mutates the original array ? Ans:- Yes
			[tempArrayForSorting[i], tempArrayForSorting[j]] = [
				tempArrayForSorting[j],
				tempArrayForSorting[i],
			];

			this.#show(
				tempArrayForSorting,
				i,
				j,
				"afterSwappingColor",
				"blue",
				"red"
			);

			await this.#wait(seconds);

			// console.log(`----------------`);
		}
	};

	static async #doVisualize(tempArrayForSorting, swapMovements, seconds) {
		this.#show(tempArrayForSorting);

		await this.#wait(seconds);

		await this.#startVisualizer(
			tempArrayForSorting,
			swapMovements,
			seconds
		);

		// No need to again call wait() bcoz: At last it startVisualizer() wait() is already called when loops comes to the end of the element.

		this.#show(tempArrayForSorting);
	}

	static #quickSortHelper(arr, startIndx, endIndx, swapMovements) {
		let leftIndx = startIndx;
		let pivot = startIndx;
		let rightIndx = endIndx;

		// console.log(`${leftIndx} ${pivot} ${rightIndx}`);

		while (leftIndx <= rightIndx) {
			while (leftIndx <= rightIndx) {
				if (arr[pivot] > arr[rightIndx]) {
					// console.log(`${arr[pivot]} ${arr[rightIndx]}`);
					swapMovements.push([pivot, rightIndx]);
					// swap elements
					[arr[pivot], arr[rightIndx]] = [arr[rightIndx], arr[pivot]];
					pivot = rightIndx;
					break;
				} else {
					rightIndx--;
				}
			}

			while (leftIndx <= rightIndx) {
				if (arr[pivot] < arr[leftIndx]) {
					// console.log(`${arr[pivot]} ${arr[leftIndx]}`);
					swapMovements.push([pivot, leftIndx]);
					// swap elements
					[arr[pivot], arr[leftIndx]] = [arr[leftIndx], arr[pivot]];
					pivot = leftIndx;
					break;
				} else {
					leftIndx++;
				}
			}
		}
		return pivot; // This is the index at which pivot element is present(at its correct position). I can also say that it is a Partition index ==> Which helps to calculate quickSort of two sub arrays.
	}

	static #quickSortAlgo(arr, startIndx, endIndx, swapMovements) {
		// As array is also an object in Js, so whatever we will do will mutates in the original array swapMovements.
		if (startIndx >= endIndx) {
			// NOTE:- //imp: Plzz write the correct base case.👉👉 This is a wrong base case startIndx === endIndx. 💥🤔🤔 Think why ? ===> [10, 9, 8, 7, 6, 5, 4, 3, 2, 1] try with this example.
			return;
		} else {
			// console.log("Hii");
			const pivotIndx = this.#quickSortHelper(
				arr,
				startIndx,
				endIndx,
				swapMovements
			);
			this.#quickSortAlgo(arr, startIndx, pivotIndx - 1, swapMovements);
			this.#quickSortAlgo(arr, pivotIndx + 1, endIndx, swapMovements);
		}
	}

	static #mergeSortHelper(arr, startIndx, mid, endIndx, swapMovements) {
		// Now, here I've to merge two sorted array ===> i.e. [startIndx, mid](inclusive both indexex) & [mid+1, endIndx]
		const subMovements = [];
		// subMovements will store all the swapMovements required for a particular elments to be in correct positions in an array.

		// Required for comparing the elements of both the sorted arrays.
		let i = startIndx;
		let j = mid + 1;

		// Think 🤔🤔🤔 When i have to store movements in the SubMovements.
		while (i !== mid + 1 && j !== endIndx + 1) {
			if (arr[i] <= arr[j]) {
				i++; // we don't have to store anything in the subMovements. Note that!
			} else {
				// i.e. ===> arr[i] > arr[j]
				// Now, here we have to store all the subMovements which will happen to store the movemnets. so that element which is at index "j" will come at the front and all the elememts from "i" to "j-1" will move one step forward(shift one steps towards right.) ANd after that both "i" and "j" will increment by one step towards right.

				// const temp = arr[j];
				// let indx;
				// for (indx = j; indx >= i + 1; indx--) {
				// 	arr[indx] = arr[indx - 1];
				// }
				// arr[indx] = temp; // arr[i] = arr[j];
				// i++;
				// j++;
				// mid++;

				for (let indx = j; indx >= i + 1; indx--) {
					swapMovements.push([indx, indx - 1]);
					[arr[indx], arr[indx - 1]] = [arr[indx - 1], arr[indx]];
				}
				i++;
				j++;
				mid++;

				// Think 👆 How this(shifting towards right one step) will effect in this 👇 situation where elements are left out in one of the sorted array. Here, we also want to do changes in the "mid" value also after shifting the elements one step towards right.
			}
		}

		if (i === mid + 1 && j !== endIndx + 1) {
			// all elements which are left in the second sorted array.
			// e.g.: In this loop, we don't have to do anything. ==> Bcoz: loop is in already sorted!
			// so, even if we don't write this loop then also it doesn't effect.

			return; // already elememts are sorted.
		}

		if (i !== mid + 1 && j === endIndx + 1) {
			// all elements which are leftout in the first sorted array.
			// e.g.:

			// Here, also we don't need do anything bcoz: Array is already sorted!
			// Try with dry run and you will notice that
			return;
		}
		// after this all the subMovements will be stored in this subMovements.
	}

	static #mergeSortAlgo(arr, startIndx, endIndx, swapMovements) {
		if (startIndx >= endIndx) {
			// console.log(`${startIndx} ${endIndx} -- Hello`);
			return;
		} else {
			// console.log(`${startIndx} ${endIndx} -- Hii`);
			const mid = Math.floor((startIndx + endIndx) / 2); //imp: ParseInt()
			this.#mergeSortAlgo(arr, startIndx, mid, swapMovements);
			this.#mergeSortAlgo(arr, mid + 1, endIndx, swapMovements);
			this.#mergeSortHelper(arr, startIndx, mid, endIndx, swapMovements);
		}
	}

	static async bubbleSort(arr, seconds) {
		const length = arr.length;
		const tempArrayForSorting = arr.slice();
		let swapMovements = []; // Stores an array of all movements.

		// For storing Positions of swapping --> Applying Bubble sort algorithm.
		for (let round = 1; round < length; round++) {
			for (let i = 0; i < length - round; i++) {
				if (arr[i] > arr[i + 1]) {
					swapMovements.push([i, i + 1]);
					[arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
				}
			}
		}
		// console.log(swapMovements, swapMovements.length);

		// // ============ Main Logic ==========
		// // array display before starting its visualization
		// this.#show(tempArrayForSorting); // original array will be passed.

		// await this.#wait(seconds);
		// // visualization is started --> This code should run synchronous but we have to pause at swapping time and Not that on that time no other code will execute.
		// await this.#startVisualizer(
		// 	tempArrayForSorting,
		// 	swapMovements,
		// 	seconds
		// );

		// // // array display after swapping its visualization
		// this.#show(tempArrayForSorting); // final array will be passed. BUT how ?

		await this.#doVisualize(tempArrayForSorting, swapMovements, seconds);
	}

	static async selectionSort(arr, seconds) {
		const length = arr.length;
		const tempArrayForSorting = arr.slice();
		let swapMovements = [];

		// For storing positions of swapping ===> Applying selection sort
		for (let i = 0; i < length - 1; i++) {
			for (let j = i + 1; j < length; j++) {
				if (arr[i] > arr[j]) {
					//swapp
					swapMovements.push([i, j]);
					[arr[i], arr[j]] = [arr[j], arr[i]];
				}
			}
		}

		await this.#doVisualize(tempArrayForSorting, swapMovements, seconds);
	}

	static async insertionSort(arr, seconds) {
		const length = arr.length;
		const tempArrayForSorting = arr.slice();
		let swapMovements = [];

		// For storing Positions of swapping ===> Implementing insertion sorting
		for (let i = 1; i < length; i++) {
			// i started from index bcoz: 1st element of a array is alreday sorted
			for (let j = i - 1; j >= 0; j--) {
				if (arr[i] < arr[j]) {
					// swapp elements
					[arr[i], arr[j]] = [arr[j], arr[i]];
					swapMovements.push([i, j]);
					i = j;
				}
			}
		}

		await this.#doVisualize(tempArrayForSorting, swapMovements, seconds);
	}

	static async quickSort(arr, seconds) {
		const length = arr.length;
		const tempArrayForSorting = arr.slice();
		let swapMovements = [];

		// For storing all the swap movements ==> Implementing Quick Sort recursively
		console.log(`Before Quick Sort: ${arr}`);
		this.#quickSortAlgo(arr, 0, length - 1, swapMovements);
		console.log(`After Quick Sort: ${arr}`);

		await this.#doVisualize(tempArrayForSorting, swapMovements, seconds);
	}

	static async mergeSort(arr, seconds) {
		const length = arr.length;
		const tempArrayForSorting = arr.slice();
		let swapMovements = [];

		// NOTE:- Implementation of merge sort and hopw it will be viaualize and what will be its swapMovements and after which swapMovements we will visualize is tottaly different from all other above sosrting algorithm.
		// For sorting all the swap movements qfter which we have to show array(visualizing it) ===> Implementing Merge Sort
		console.log(`Before MergeSort: ${arr}`);
		this.#mergeSortAlgo(arr, 0, length - 1, swapMovements);
		console.log(`After Merge Sort: ${arr}`);

		// code for visualizations.
		await this.#doVisualize(tempArrayForSorting, swapMovements, seconds);
	}
}

// const arr = [
// 5, 7, 10, 4, 3, 2, 1, 8, 9, 6,
// 	45, 132, 287, 318, 70, 45, 132, 287, 94, 360, 176, 22, 398, 265, 123, 55,
// 	381, 189,
// ]; // Hardcoded Data

const arr = [];
// Randomly integer value is assigned to an array in between 0 to 400
for (let i = 1; i < 40; i++) {
	const randomInteger = Math.trunc(Math.random() * 350) + 50; // Between 50 & 400(excluding)
	// const randomInteger = Math.trunc(Math.random() * 400) ; // Between 0 & 400(excluding)
	// Math.random() ===> returns 0 to 1(excluding)
	// console.log(randomInteger);
	arr.push(randomInteger);
}
console.log(arr);

const seconds = 0; // Hardcoded data
// const sortingAlgorithm = "bubbleSort"; // Hardcoded data
// const sortingAlgorithm = "insertionSort"; // Hardcoded data
// const sortingAlgorithm = "quickSort"; // Hardcoded data
const sortingAlgorithm = "mergeSort"; // Hardcoded data
// const sortingAlgorithm = "selectionSort"; // Hardcoded data

// Before continue check whether it contains only integer values or not ? are they in given defined range or not ?

// TODO: display the content before soting and after the sorting applied, display the content through a "restart btn".
// startBtn.addEventListener("click", (event) => {
// 	// event.preventDefault();
// });

switch (sortingAlgorithm) {
	case "bubbleSort":
		console.log("Bubble sort Algorithm started");

		// setting sorting name to the display as per the user selection
		// sortingAlgorithmName.innerText = sortingAlgorithm;

		SortingVisualizer.bubbleSort(arr, seconds);
		// (async function(){ await SortingVisualizer.bubbleSort(arr, seconds); });
		break;

	case "selectionSort":
		console.log("Selection sort Algorithm started");
		SortingVisualizer.selectionSort(arr, seconds);
		break;
	case "insertionSort":
		console.log("Insertion sort Algorithm started");
		SortingVisualizer.insertionSort(arr, seconds);
		break;
	case "quickSort":
		console.log("Quick sort Algorithm started");
		SortingVisualizer.quickSort(arr, seconds);
		break;
	case "mergeSort":
		console.log("Merge sort Algorithm started");
		SortingVisualizer.mergeSort(arr, seconds);
		break;
	default:
	// We don't have to do anything
}
