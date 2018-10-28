import React, {Component} from 'react';
import './App.css';
import ControlPanel from "./control-panel/ControlPanel";
import FileZone from "./file-zone/FileZone";
import Synonyms from "./synonyms";
import axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: -1,
            text: [],
            cp: [
                {
                    name: 'b',
                    ownStyle: {fontWeight: 'bold'},
                    active: false
                },
                {
                    name: 'i',
                    ownStyle: {fontStyle: 'italic'},
                    active: false
                },
                {
                    name: 'u',
                    ownStyle: {textDecoration: 'underline'},
                    active: false
                },
            ],
            synonymsList: []
        }
        this.btnHandler = this.btnHandler.bind(this);
        this.inputHandler = this.inputHandler.bind(this);
        this.selectHandler = this.selectHandler.bind(this);
        this.deselectHandler = this.deselectHandler.bind(this);
        this.switchWord = this.switchWord.bind(this);
        this.setColor = this.setColor.bind(this);
    }

    btnHandler(option) {
        const {cp, text, selectedIndex} = this.state;
        const toggledBtnData = cp.filter(({name}) => name === option)[0];

        this.setState({
            cp: cp.map(btnData => {
                return btnData.name !== option
                    ? btnData
                    : {...btnData, active: !btnData.active}
            }),
            text: text.map((textData, i) => {
                return selectedIndex !== i
                    ? textData
                    : {
                    ...textData,
                    styles: toggledBtnData.active
                        ? textData.styles.filter(style => !this.compareObjects(style, toggledBtnData.ownStyle))
                        : [...textData.styles, toggledBtnData.ownStyle]
                }
            })
        });

    }

    compareObjects = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2);

    selectHandler(index) {
        const {text, cp} = this.state;
        this.setState({
            selectedIndex: index,
            cp: cp.map(btnData => ({
                ...btnData,
                active: text[index].styles.some(style => this.compareObjects(style, btnData.ownStyle))
            }))
        })

        this.getSynonyms(text[index].text);

    };

    deselectHandler() {
        this.setState({selectedIndex: -1})
    }

    inputHandler(event) {
        const {name, value} = event.target;
        let newValue = value.split(' ').map(word => ({text: word, styles: []}));
        this.setState({
            selectedIndex: -1,
            [name]: newValue
        });
    }
    switchWord(newWord) {
        const {selectedIndex, text} = this.state;
        this.setState({
            text: text.map((textData, i) => {
                return selectedIndex !== i
                    ? textData
                    : {...textData, text: newWord}
                }
            )
        })
    }

    async getSynonyms(word) {
        try {
            const {data} = await axios.get(`https://api.datamuse.com/words?ml=${word}`);
            this.setState({
                synonymsList: data.map(({word}) => word)
            })
        } catch(err) {
            console.log(err);
        }
    }

    setColor(color) {
        const {text, selectedIndex} = this.state;
        this.setState({
            text: text.map((textData, i) => {
                return selectedIndex !== i
                    ? textData
                    : {...textData, styles: [...textData.styles, {color: color.hex}]}
                }
            )
        })
    }

    render() {
        console.log(this.state.text);
        const {text, selectedIndex, cp, synonymsList} = this.state;
        const isSelected = selectedIndex >= 0;
        return (
            <div className="App">
                <header>
                    <span>Simple Text Editor</span>
                </header>
                <main>
                    {isSelected && <ControlPanel cpdata={cp} callback={this.btnHandler} setColor={this.setColor} />}
                    <FileZone
                        selectHandler={this.selectHandler}
                        inputHandler={this.inputHandler}
                        deselectHandler={this.deselectHandler}
                        text={text}
                        selectedIndex={selectedIndex}
                    />
                    {synonymsList.length > 0 && isSelected && <Synonyms synonymsList = {synonymsList} callback={this.switchWord} />}
                </main>
            </div>
        );
    }
}

export default App;
