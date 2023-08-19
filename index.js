const container = document.querySelector(".container");
const startBtn = document.querySelector("#start-btn");
const setBtn = document.querySelector("#set-btn");
const resetBtn = document.querySelector("#reset-btn");
const selectAlgoForm = document.querySelector(".selectAlgoForm");
const secondsRange = document.querySelector("#seconds");
const arraySizeRange = document.querySelector("#arraySize");
const sortingAlgoName = document.querySelector("#sortingAlgoName");

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

	static show(arr, indx1, indx2, swapping, color1, color2) {
		// NO need to make this 'show' method as private bcoz; I want to access it outside the class for reset-btn working.
		// NOTE: There is no use of "swapping" variable.
		// swapping variable is just for knowing that it is "before swapping or after swapping something like that i want to implement previously"
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
	}

	static #startVisualizer = async function (
		tempArrayForSorting,
		swapMovements,
		seconds
	) {
		for (const movement of swapMovements) {
			const [i, j] = movement;
			this.show(
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

			this.show(
				tempArrayForSorting,
				i,
				j,
				"afterSwappingColor",
				"blue",
				"red"
			);

			await this.#wait(seconds);
		}
	};

	static async #doVisualize(tempArrayForSorting, swapMovements, seconds) {
		this.show(tempArrayForSorting);

		await this.#wait(seconds);

		await this.#startVisualizer(
			tempArrayForSorting,
			swapMovements,
			seconds
		);

		// No need to again call wait() bcoz: At last it startVisualizer() wait() is already called when loops comes to the end of the element.

		this.show(tempArrayForSorting);
	}

	static #quickSortHelper(arr, startIndx, endIndx, swapMovements) {
		let leftIndx = startIndx;
		let pivot = startIndx;
		let rightIndx = endIndx;

		while (leftIndx <= rightIndx) {
			while (leftIndx <= rightIndx) {
				if (arr[pivot] > arr[rightIndx]) {
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
		return pivot;
	}

	static #quickSortAlgo(arr, startIndx, endIndx, swapMovements) {
		if (startIndx >= endIndx) {
			// NOTE:- Plzz write the correct base case.👉👉 This is a wrong base case startIndx === endIndx. 💥🤔🤔 Think why ? ===> [10, 9, 8, 7, 6, 5, 4, 3, 2, 1] try with this example.
			return;
		} else {
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
		let i = startIndx;
		let j = mid + 1;

		while (i !== mid + 1 && j !== endIndx + 1) {
			if (arr[i] <= arr[j]) {
				i++;
			} else {
				for (let indx = j; indx >= i + 1; indx--) {
					swapMovements.push([indx, indx - 1]);
					[arr[indx], arr[indx - 1]] = [arr[indx - 1], arr[indx]];
				}
				i++;
				j++;
				mid++;
			}
		}

		if (
			(i === mid + 1 && j !== endIndx + 1) ||
			(i !== mid + 1 && j === endIndx + 1)
		) {
			return;
		}
	}

	static #mergeSortAlgo(arr, startIndx, endIndx, swapMovements) {
		if (startIndx >= endIndx) {
			return;
		} else {
			const mid = Math.floor((startIndx + endIndx) / 2); //imp: ParseInt()
			this.#mergeSortAlgo(arr, startIndx, mid, swapMovements);
			this.#mergeSortAlgo(arr, mid + 1, endIndx, swapMovements);
			this.#mergeSortHelper(arr, startIndx, mid, endIndx, swapMovements);
		}
	}

	static async bubbleSort(arr, seconds) {
		const length = arr.length;
		const tempArrayForSorting = arr.slice();
		let swapMovements = [];

		// For storing Positions of swapping --> Applying Bubble sort algorithm.
		for (let round = 1; round < length; round++) {
			for (let i = 0; i < length - round; i++) {
				if (arr[i] > arr[i + 1]) {
					swapMovements.push([i, i + 1]);
					[arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
				}
			}
		}

		await this.#doVisualize(tempArrayForSorting, swapMovements, seconds);
		return 1; // after completion sorting
	}

	static async selectionSort(arr, seconds) {
		const length = arr.length;
		const tempArrayForSorting = arr.slice();
		let swapMovements = [];

		// For storing positions of swapping ===> Applying selection sort
		for (let i = 0; i < length - 1; i++) {
			for (let j = i + 1; j < length; j++) {
				if (arr[i] > arr[j]) {
					//swap
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

		console.log(`Before MergeSort: ${arr}`);
		this.#mergeSortAlgo(arr, 0, length - 1, swapMovements);
		console.log(`After Merge Sort: ${arr}`);

		// code for visualizations.
		await this.#doVisualize(tempArrayForSorting, swapMovements, seconds);
	}
}

let arr = [];
setBtn.addEventListener("click", (event) => {
	arr = [];
	// do i need to set preventDefault() function ?  When it is needed ? I think it is needed when we click on button and it goes to another link or url changes.
	const arraySize = arraySizeRange.value;
	console.log(`Array Size: ${arraySize}`);

	for (let i = 1; i < arraySize; i++) {
		const randomInteger = Math.trunc(Math.random() * (520 - 50)) + 50; // Between 50 & 580(excluding)
		// const randomInteger = Math.trunc(Math.random() * 400) ; // Between 0 & 400(excluding)
		// Math.random() ===> returns 0 to 1(excluding)
		// console.log(randomInteger);
		arr.push(randomInteger);
	}
	SortingVisualizer.show(arr);
	console.log(arr);
});

resetBtn.addEventListener("click", (event) => {
	window.location.reload(true); // Reference 👉 https://developer.mozilla.org/en-US/docs/Web/API/Location/reload
	// 👉 https://www.javatpoint.com/javascript-reload-method#:~:text=location.reload%20%28%29%20This%20method%20can%20have%20optional%20parameters,%28%29%20method%20reloads%20the%20page%20from%20the%20cache.

	// 👇 These are all for version v-1.0
	// resetBtn.classList.add("hidden");
	// setBtn.classList.remove("hidden");
	// // Enabling the selectAlgoForm section
	// selectAlgoForm.classList.remove("hidden");
	// arr = [];
	// container.innerHTML = "";
});

startBtn.addEventListener("click", (event) => {
	let sortingAlgorithm =
		document.getElementsByName("sortingAlgorithm")[0].value;

	// let array = Array.from(document.getElementsByName("sortingAlgorithm")); // this is an array bcoz: There can be multiple elements in the file whose name is "sortingAlgorithm" same as this element.
	// for (const arr of array) {
	// 	console.log(arr);
	// }

	// see difference 👆👇

	// let array = Array.from(document.getElementsByName("sortingAlgorithm"))[0];
	// for (const arr of array) {
	// 	console.log(arr);
	// }
	event.preventDefault();

	if (arr.length === 0) {
		alert("Set the Array Elements before applying any sorting Algorithm");
	} else {
		// Disabling the start-btn and sortingAlgorithm option element(select element)
		selectAlgoForm.classList.add("hidden"); // 👈 Why this is not working ???

		// Disabling the set and reset array elements btn ===> so that when algorithm is working, this btn shouldn't have to work.
		setBtn.classList.add("hidden");

		const seconds = secondsRange.value;
		// const seconds = -10; // imp: Does negative value of seconds affects ?  Ans: If negative value passed to the setTimeout() function then it will take it as 0 milliseconds. so, minimum(least) value of setTimeout() function is 0 milliseconds.
		console.log(sortingAlgorithm);
		console.log(seconds);
		resetBtn.classList.remove("hidden");

		sortingAlgoName.textContent = sortingAlgorithm;

		switch (sortingAlgorithm) {
			case "bubbleSort":
				console.log("Bubble sort Algorithm started");
				SortingVisualizer.bubbleSort(arr, seconds);
				// .then(() => {
				// 	resetBtn.classList.remove("hidden");
				// });
				break;
			case "selectionSort":
				console.log("Selection sort Algorithm started");
				SortingVisualizer.selectionSort(arr, seconds);
				// .then(() => {
				// 	resetBtn.classList.remove("hidden");
				// });
				break;
			case "insertionSort":
				console.log("Insertion sort Algorithm started");
				SortingVisualizer.insertionSort(arr, seconds);
				// .then(() => {
				// 	resetBtn.classList.remove("hidden");
				// });
				break;
			case "quickSort":
				console.log("Quick sort Algorithm started");
				SortingVisualizer.quickSort(arr, seconds);
				// .then(() => {
				// 	resetBtn.classList.remove("hidden");
				// });
				break;
			case "mergeSort":
				console.log("Merge sort Algorithm started");
				SortingVisualizer.mergeSort(arr, seconds);
				// .then(() => {
				// 	resetBtn.classList.remove("hidden");
				// });
				break;
			default:
			// We don't have to do anything
		}

		// imp: Don't forget that all sorting algorithm is working as asynchronously. That's why ==> This below resetbtn (adding and removing "hidden" class doesn't affect that much.) 👇👇👇 That's why i have used promise concept that resetbtn will be shown as promise will be fullfilled!
		// Enabling set and reset array elements btn
		// resetBtn.classList.remove("hidden");
	}
});
