import React, { createContext, useState } from "react";

const MyContext = createContext();

const Main = (props) => {

    const [signedUser, setSignedUser] = useState("");
    const [currentMode, setCurrentMode] = useState("day");
    const [idCounter, setIdCounter] = useState(5);
    const [notes, setNotes] = useState([
        
        {
            id:'4', name: 'Kushal', title: 'Top Pilots’ Tips', content: 'Before you attach yourself to the plane and take off, give your flight some thought and planning. Just like the “Airplane Mode” button on your smartphone, you just switch your brain to planes. Do not think of anything other than your flight.'
        },
        {
            id:'3', name: 'Kushal', title: 'Box model in CSS', content: 'A rectangle box is wrapped around every HTML element. The box model is used to determine the height and width of the rectangular box. The CSS Box consists of Width and height (or in the absence of that, default values and the content inside), padding, borders, margin.'
        },
        {
            id:'2', name: 'Kushal', title: 'Destructuring in React', content: 'Destructuring Assignment is a JavaScript expression that allows to unpack values from arrays, or properties from objects, into distinct variables data can be extracted from arrays, objects, nested objects and assigning to variables.'
        },
        {
            id:'1', name: 'Kushal', title: 'Simple Cooking Tips', content: 'Peel tomatoes with ease! Cut an X in the top, and then simmer in a pot of hot water for 15 to 30 seconds. Cool down and the skin will fall right off. Set up your workspace by gathering clean tools, bowls and utensils. And make sure to keep a trashcan within arm’s reach.'
        }
    ]);

    const [message, setMessage] = useState("");
    const [dialogState, setDialogState] = useState(false);
    const [currentId, setCurrentId] = useState('-1');
    const [currentPos, setCurrentPos] = useState(-1);
    const [editDrawer, setEditDrawer] = useState(false);
    const [previousPos, setPreviousPos] = useState(-1);
    const [searchResults, setSearchResults] = useState([]);
    const [modalState, setModalState] = useState(false);

    return (
    <MyContext.Provider value={{signedUser: [signedUser, setSignedUser], currentMode: [currentMode, setCurrentMode], notes: [notes, setNotes], idCounter: [idCounter, setIdCounter], currentId: [currentId, setCurrentId],currentPos: [currentPos, setCurrentPos], message: [message, setMessage], dialogState:[dialogState, setDialogState], editDrawer: [editDrawer, setEditDrawer], previousPos: [previousPos, setPreviousPos], searchResults: [searchResults, setSearchResults], modalState: [modalState, setModalState]}}> 
        {props.children}
    </MyContext.Provider>
    )
}

export  { Main, MyContext };