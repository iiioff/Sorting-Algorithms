const container = document.getElementById('container');
const newArrayBtn = document.getElementById('newArrayBtn');
const bubbleSortBtn = document.getElementById('bubbleSortBtn');
const insertionSortBtn = document.getElementById('insertionSortBtn');
const mergeSortBtn = document.getElementById('mergeSortBtn');
const quickSortBtn = document.getElementById('quickSortBtn');
const heapSortBtn = document.getElementById('heapSortBtn');
const radixSortBtn = document.getElementById('radixSortBtn');

let array = [];
const numBars = 100; // Number of bars to display
const maxHeight = 100; // Max height for a bar (percentage based on screen height)

function generateRandomArray() {
    array = [];
    for (let i = 0; i < numBars; i++) {
        array.push(Math.floor(Math.random() * maxHeight) + 1); // Random value between 1 and maxHeight
    }
    renderArray();
}

function renderArray() {
    container.innerHTML = '';
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value}%`;
        container.appendChild(bar);
    });
}

async function visualizeSorting(algorithm) {
    let copy = [...array];
    const bars = document.querySelectorAll('.bar');
    const swap = (i, j) => {
        const temp = copy[i];
        copy[i] = copy[j];
        copy[j] = temp;
        bars[i].style.height = `${copy[i]}%`;
        bars[j].style.height = `${copy[j]}%`;
    };

    if (algorithm === 'bubbleSort') {
        await bubbleSort(copy, swap);
    } else if (algorithm === 'insertionSort') {
        await insertionSort(copy, swap);
    } else if (algorithm === 'mergeSort') {
        await mergeSort(copy, 0, copy.length - 1, swap);
    } else if (algorithm === 'quickSort') {
        await quickSort(copy, 0, copy.length - 1, swap);
    } else if (algorithm === 'heapSort') {
        await heapSort(copy, swap);
    } else if (algorithm === 'radixSort') {
        await radixSort(copy, swap);
    }
}

async function bubbleSort(arr, swap) {
    const n = arr.length;
    let swapped;
    for (let i = 0; i < n; i++) {
        swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            const bars = document.querySelectorAll('.bar');
            bars[j].style.backgroundColor = 'red';
            bars[j + 1].style.backgroundColor = 'red';

            if (arr[j] > arr[j + 1]) {
                swap(j, j + 1);
                swapped = true;
            }

            bars[j].style.backgroundColor = '#4CAF50';
            bars[j + 1].style.backgroundColor = '#4CAF50';

            await new Promise(resolve => setTimeout(resolve, 50));
        }
        if (!swapped) break;
    }
}

async function insertionSort(arr, swap) {
    const n = arr.length;
    for (let i = 1; i < n; i++) {
        let j = i;
        while (j > 0 && arr[j - 1] > arr[j]) {
            swap(j, j - 1);
            j--;
            await new Promise(resolve => setTimeout(resolve, 50));
        }
    }
}

async function mergeSort(arr, left, right, swap) {
    if (left >= right) return;
    const middle = Math.floor((left + right) / 2);
    await mergeSort(arr, left, middle, swap);
    await mergeSort(arr, middle + 1, right, swap);
    await merge(arr, left, middle, right, swap);
}

async function merge(arr, left, middle, right, swap) {
    let leftArr = arr.slice(left, middle + 1);
    let rightArr = arr.slice(middle + 1, right + 1);
    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
        if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i++];
        } else {
            arr[k] = rightArr[j++];
        }
        swap(k, k);
        k++;
        await new Promise(resolve => setTimeout(resolve, 50));
    }

    while (i < leftArr.length) {
        arr[k++] = leftArr[i++];
        swap(k - 1, k - 1);
        await new Promise(resolve => setTimeout(resolve, 50));
    }
    while (j < rightArr.length) {
        arr[k++] = rightArr[j++];
        swap(k - 1, k - 1);
        await new Promise(resolve => setTimeout(resolve, 50));
    }
}

async function quickSort(arr, left, right, swap) {
    if (left >= right) return;
    const pivotIndex = await partition(arr, left, right, swap);
    await quickSort(arr, left, pivotIndex - 1, swap);
    await quickSort(arr, pivotIndex + 1, right, swap);
}

async function partition(arr, left, right, swap) {
    const pivot = arr[right];
    let i = left - 1;

    for (let j = left; j < right; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(i, j);
        }
        await new Promise(resolve => setTimeout(resolve, 50));
    }
    swap(i + 1, right);
    return i + 1;
}

async function heapSort(arr, swap) {
    const n = arr.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(arr, n, i, swap);
    }
    for (let i = n - 1; i > 0; i--) {
        swap(0, i);
        await heapify(arr, i, 0, swap);
    }
}

async function heapify(arr, n, i, swap) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;

    if (largest !== i) {
        swap(i, largest);
        await heapify(arr, n,
