import { Dialog, DialogActions, DialogContent, DialogTitle, Drawer, Tooltip } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { MyContext } from './Contexts/Main';
import './Home.css';
import Navbar from './Navbar';


const Home = () => {
  const context = useContext(MyContext);


  const deleteItem = () => {
    var id = context.currentId[0];
    var temp = [...context.notes[0]];
    var temp2 = [...context.searchResults[0]];
    var pos = -1;
    var pos2 = -1;
    temp.map((item, index) => item.id === id ? pos = index : null)
    temp2.map((item, index) => item.id === id ? pos2 = index : null)
    temp.splice(pos, 1);
    temp2.splice(pos2,1);
    context.notes[1](temp);
    context.searchResults[1](temp2);
    context.dialogState[1](false);
  }

  const edit = () => {
    var id = context.currentId[0];
    var pos = -1;
    context.notes[0].map((item, index) => item.id === id ? pos = index : null)
    context.currentPos[1](pos);
  }

  const update = (e) => {
    var pos = -1;
    var temp = [...context.notes[0]];
    temp.map((item, index) => item.id === e.target.id ? pos=index : null)
    temp[pos].title = document.getElementById('editTitle').value;
    temp[pos].content = document.getElementById('editContent').value;
    context.notes[1](temp);
    context.editDrawer[1](false);
  }

  useEffect(()=>{
    if(context.currentMode[0] === 'night')
    {
      document.getElementById('homeNotesArea').classList.add('NightContent');
      var temp = document.querySelectorAll(".Card");
      for(var i in temp)
      {
        if(temp[i].classList !== undefined)
        temp[i].classList.add('nightCard');
      }
    }
    else{
      document.getElementById('homeNotesArea').classList.remove('NightContent');
      temp = document.querySelectorAll(".Card");
      for(i in temp)
      {
        if(temp[i].classList !== undefined)
        temp[i].classList.remove('nightCard');
      }
    }
},[context.currentMode[0]])

useEffect(()=>{
  if(context.currentPos[0] === -1)
  {
    return;
  }
  else
  {
    context.editDrawer[1](true);
  }
}, [context.currentPos[0]])

  return (
    <div className="Home">
      <Navbar />
      <div className="homeNotesArea" id="homeNotesArea">
      {
      context.signedUser[0] === "" ? 
      <>
        <h1 className='animate__animated animate__fadeInDown animate__slow'>Hello there,</h1>
        <h2 className='animate__animated animate__fadeIn animate__slower animate__delay-1s'>Having something in mind that you want to pen-down? </h2>
        <h3 className='animate__animated animate__fadeInUp animate__slower animate__delay-2s'>Create your Notes now !!</h3>

      </>
      : 
      context.searchResults[0].length === 0 ? 
      <>
      {context.notes[0].map((item, index)=> <div key={index} className="Card animate__animated animate__zoomIn animate__slower">
      <div className="cardTopArea">
        <h2>{item.name}</h2>
        {item.name === context.signedUser[0] ? <div className="buttonGroup"><Tooltip title="Edit" arrow placement="left-start"><i onClick={()=>{context.currentId[1](item.id); setTimeout(edit, 100)}} className="fa-solid fa-pen-to-square" ></i></Tooltip><Tooltip title="Delete" arrow placement="right-start"><i className="fa-solid fa-trash" onClick={()=>{context.message[1]("You are about to delete this note."); context.currentId[1](item.id); setTimeout(context.dialogState[1](true), 500)}}></i></Tooltip></div> : null}
      </div>
      <h1>{item.title}</h1>
      <p>{item.content}</p>
      </div>)}
      </> : 
      context.searchResults[0].map((item, index)=> <div key={index} className="Card animate__animated animate__zoomIn">
        <div className="cardTopArea">
        <h2>{item.name}</h2>
        {item.name === context.signedUser[0] ? <div className="buttonGroup"><Tooltip title="Edit" arrow placement="left-start"><i onClick={()=>{context.currentId[1](item.id); setTimeout(edit, 500)}} className="fa-solid fa-pen-to-square" ></i></Tooltip><Tooltip title="Delete" arrow placement="right-start"><i className="fa-solid fa-trash" onClick={()=>{context.message[1]("You are about to delete this note."); context.currentId[1](item.id); setTimeout(context.dialogState[1](true), 800)}}></i></Tooltip></div> : null}
        </div>
        <h1>{item.title}</h1>
        <p>{item.content}</p>
      </div>)
      }
      </div>
      {/* Dialog for deletion confirmation */}
      <Dialog open={context.dialogState[0]} onClose={()=>{context.dialogState[1](false)}}>
      <DialogTitle sx={{color: 'red', fontSize: '2.5vw', fontWeight: 'bolder'}}>Warning!!</DialogTitle>
      <DialogContent>{context.message[0]}</DialogContent>
      <DialogActions>
        <button style={{backgroundColor: 'red', color: 'white'}} className='button' onClick={deleteItem}>Delete Now</button>
        <button className='button' onClick={()=>{context.dialogState[1](false)}}>Cancel</button>
      </DialogActions>
      </Dialog>
      <>
      <Drawer 
      anchor="top"
      open={context.editDrawer[0]}
      onClose={()=>{context.editDrawer[1](false);}}
      transitionDuration={{ enter: 1200, exit: 500 }}
      >
        <button id="closeDrawer" onClick={()=>{context.editDrawer[1](false);}}>X</button>
        {context.currentPos[0]=== -1 ? null : 
        <div className="drawerArea">
          <input type="text" id="editTitle" defaultValue={context.notes[0][context.currentPos[0]].title === undefined ? "" : context.notes[0][context.currentPos[0]].title}/>

          <textarea id="editContent" defaultValue={context.notes[0][context.currentPos[0]].content === undefined ? "" : context.notes[0][context.currentPos[0]].content} />

          <button id={context.currentId[0]} onClick={update}>Update Note</button>
        </div>
      }
      </Drawer>
      </>
    </div>
  )
}

export default Home