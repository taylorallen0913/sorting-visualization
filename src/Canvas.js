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

    insertionSort = async(nums, delayInMs) => {
        for (let i = 0; i < nums.length; i++) {
            let key = nums[i];
            let j = i - 1;
    
            while (j >= 0 && nums[j] > key) {
                console.log(nums[j])
                nums[j + 1] = nums[j];
                j--;
            }
            nums[j + 1] = key;
            await delay(delayInMs)
            this.forceUpdate();
        }
    }

    sort = () => {
        console.log('pressed')
        this.insertionSort(this.state.list, 100);
    }

    render() {
        const { list, listLoaded } = this.state;

        return (
            <div>
                <button onClick={this.sort}>Sort
                </button>
                <Stage width={window.innerWidth} height={window.innerHeight}>
                    <Layer>
                        {
                            listLoaded ?
                                list.map((num, index) =>
                                    <Rect
                                        x={index * 10}
                                        y={20}
                                        width={10}
                                        height={num}
                                        fill={'black'}
                                    />
                                )
                                : null
                        }
                    </Layer>
                </Stage>
            </div>
        )
    }
}
