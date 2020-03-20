import React from 'react'
import { Rect, Layer, Stage } from 'react-konva'
import './Canvas.css'

const delay = require('delay')

export default class Canvas extends React.Component {

    constructor() {
        super();
        this.state = {
            list: null,
            listLoaded: false
        };
    }

    componentDidMount() {
        this.generateRandomList();
    }


    getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    }

    generateRandomList = () => {
        let nums = [];
        for (let i = 0; i < 50; i++) {
            nums.push(this.getRandomInt(400) + 100);
        }
        this.setState({ list: nums }, () => {
            this.setState({ listLoaded: true });
        });
    }

    insertionSort = async (nums, delayInMs) => {
        for (let i = 0; i < nums.length; i++) {
            let key = nums[i];
            let j = i - 1;

            while (j >= 0 && nums[j] > key) {
                nums[j + 1] = nums[j];
                j--;
            }
            nums[j + 1] = key;
            await delay(delayInMs)
            this.forceUpdate();
        }
    }

    bubbleSort = async (nums, delayInMs) => {
        let n = nums.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (nums[j] > nums[j + 1]) {
                    // swap arr[j+1] and arr[i] 
                    let temp = nums[j];
                    nums[j] = nums[j + 1];
                    nums[j + 1] = temp;
                }
            }
            await delay(delayInMs)
            this.forceUpdate();
        }
    }


    renderList = () => {
        const numList = this.state.list.map((num, index) =>
            <Rect
                x={index * 10}
                y={20}
                width={10}
                height={num}
                fill={'black'}
            />
        )
        return numList;
    }

    sort = () => {
        const algorithm = document.getElementById('algorithmSelector').value
        switch (algorithm) {
            case 'Insertion Sort':
                this.insertionSort(this.state.list, 100);
                break;
            case 'Bubble Sort':
                this.bubbleSort(this.state.list, 100);
                break;
            default:
                break;
        }
    }

    render() {
        const { listLoaded } = this.state;

        return (
            <div>
                <button type="button" className="btn btn-primary" onClick={this.sort} style={{margin: 20}}>Sort</button>
                <button type="button" className="btn btn-primary" onClick={this.generateRandomList} style={{margin: 20}}>Refresh</button>
                <select className="form-control" id="algorithmSelector" style={{margin: 10, width: '50%'}}>
                    <option>Insertion Sort</option>
                    <option>Bubble Sort</option>
                </select>
                <Stage width={window.innerWidth} height={window.innerHeight} style={{margin: 20}}>
                    <Layer>
                        {
                            listLoaded ?
                                this.renderList()
                                : null
                        }
                    </Layer>
                </Stage>
            </div>
        )
    }
}
