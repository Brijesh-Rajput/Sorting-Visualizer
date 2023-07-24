const container = document.querySelector(".container");
const Sortedcontainer = document.querySelector(".Sortedcontainer");
// getting sorting Algo name which is selected in select option
// const sortingAlgorithm = document.querySelector("#selectSortingAlgo");
// getting array elements from user
// const arr  = document.querySelector('#array');

class SortingVisualizer {
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
				barHtmlElement = `<div class="bar" style="height:${
					element
					// * 10
				}px; background-color:${color1};"></div>`;
			} else if (indx === indx2) {
				barHtmlElement = `<div class="bar" style="height:${
					element
					// * 10
				}px; background-color:${color2};"></div>`;
			} else {
				barHtmlElement = `<div class="bar" style="height:${
					element
					// * 10
				}px; background-color:violet;"></div>`;
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

		// ============ Main Logic ==========
		// array display before starting its visualization
		this.#show(tempArrayForSorting); // original array will be passed.

		await this.#wait(seconds);
		// visualization is started --> This code should run synchronous but we have to pause at swapping time and Not that on that time no other code will execute.
		await this.#startVisualizer(
			tempArrayForSorting,
			swapMovements,
			seconds
		);

		// // array display after swapping its visualization
		this.#show(tempArrayForSorting); // final array will be passed. BUT how ?
	}

	static selectionSort(arr) {}

	static insertionSort(arr) {}

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
const sortingAlgorithm = "bubbleSort"; // Hardcoded data
// Before continue check whether it contains only integer values or not ? are they in given defined range or not ?

switch (sortingAlgorithm) {
	case "bubbleSort":
		console.log("Bubble sort Algorithm started");
		SortingVisualizer.bubbleSort(arr, seconds);
		break;
	case "selectionSort":
		SortingVisualizer.selectionSort(arr);
		break;
	case "insertionSort":
		SortingVisualizer.insertionSort(arr);
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
// DOn't know why it becomes slow in between execution.
// We can change the colour of swap elements after each swapping of bar-elements.
// Now, instead of storing moves do directly swapping.

// Linear Search and Binary Search Visualizer and Ternary Search
// N Queen
// Sudoku

// ===============
// movements.forEach((element) => {
// 	this.#show(arr, "before-swapping");
// 	// swapping elements
// 	this.#show(arr, "after-swapping");
// });
