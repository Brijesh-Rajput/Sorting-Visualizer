const container = document.querySelector(".container");
// const sortedContainer = document.querySelector(".sortedContainer");

// const sortingAlgorithmName = document.querySelector("#sortingAlgorithmNameSection");

// getting sorting Algo name which is selected in select option
// const sortingAlgorithm = document.querySelector("#selectSortingAlgo");
// getting array elements from user
// const arr  = document.querySelector('#array');

class SortingVisualizer {
	static #setBarElement = function (height, color) {
		return `<div class="bar" style="height:${
			height
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

	static quickSort(arr) {}

	static mergeSort(arr) {}
}

// const arr = [
// 	// 10, 9, 8, 7, 6, 5, 4, 3, 2, 1,
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
const sortingAlgorithm = "insertionSort"; // Hardcoded data
// const sortingAlgorithm = "selectionSort"; // Hardcoded data

// Before continue check whether it contains only integer values or not ? are they in given defined range or not ?

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
		SortingVisualizer.quickSort(arr);
		break;
	case "mergeSort":
		SortingVisualizer.mergeSort(arr);
		break;
	default:
	// We don't have to do anything
}

// -------------- Next Project -----------------
// DOn't know why it becomes slow in between execution. Does it is due to asynchronous code running ?
// We can change the colour of swap elements after each swapping of bar-elements.
// Now, instead of storing moves do directly swapping.
// set sorting algorithm name dynamically on the display as user selects the sorting Algorithm.
// Implement also for decreasing order also
// Implement slowly all sorting algorithm
// How polymorphism is implemeneted in Javascript ?

// Linear Search and Binary Search Visualizer and Ternary Search
// N Queen
// Sudoku

// ===============
// Think why we are not able to use async/await in forEach()
// movements.forEach((element) => {
// 	this.#show(arr, "before-swapping");
// 	// swapping elements
// 	this.#show(arr, "after-swapping");
// });

// Hii
