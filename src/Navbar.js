import React, { useContext, useEffect } from 'react';
import { MyContext } from './Contexts/Main';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Tooltip from '@mui/material/Tooltip';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Modal } from '@mui/material';

const Navbar = () => {
    const context = useContext(MyContext);
    const navigate = useNavigate();

    const expand = () => {
        document.getElementById('searchArea').style.width = '50%';
        document.getElementById('searchArea').style.cursor = 'none';
        document.getElementById('searchBox').style.display = 'block';
        document.getElementById('searchIcon').style.color = 'steelblue';
        document.getElementById('searchBox').focus();
    }
    const collapse = () => {
        document.getElementById('searchArea').style.width = '8%';
        document.getElementById('searchArea').style.cursor = 'default';
        document.getElementById('searchBox').style.display = 'none';
        document.getElementById('searchIcon').style.color = 'grey';
    }

    const toggleTheme = () => {
        if(context.currentMode[0] === 'day')
        {
          context.currentMode[1]('night');  
        }
        else
        {
            context.currentMode[1]('day');
        }
    }

    const search = () => {
        if(context.signedUser[0] === "")
        {
            navigate("/login");
            return;
        }
        else
        {
            var input = document.getElementById('searchBox').value;
            if(input.length === 0)
            {
                context.searchResults[1]([]);
                return;
            }
            var temp = context.notes[0].filter(item => item.title.toLowerCase().includes(input.toLowerCase()))            
            context.searchResults[1](temp);
        }
    }

    const addNote = () => {
        if(context.signedUser[0] === "")
        {
            navigate("/login");
            return;
        }
        else
        {
            context.modalState[1](true);
        }
    }

    const addNewNote = () =>{
        var title = document.getElementById('newTitle').value;
        var content = document.getElementById('newContent').value;
        var temp = [...context.notes[0]];
        temp.unshift({id: context.idCounter[0].toString(), name: context.signedUser[0], title: title, content: content})
        context.idCounter[1](context.idCounter[0]+1);
        context.notes[1](temp);
        context.modalState[1](false);
    }

    useEffect(()=>{
        if(context.currentMode[0] === 'night')
        {
            document.getElementById('Navbar').classList.add('Night');
        }
        else{
            document.getElementById('Navbar').classList.remove('Night');

        }
    },[context.currentMode[0]])

  return (
    <div className="Navbar" id="Navbar">
        <div className='logoArea'>
            <h3>Notes</h3>
            <h2>4</h2>
            <h3>You</h3>
        </div>
        <div className='contentsArea'>
            {useMediaQuery('(max-width:760px)') ?
             <>
             {context.currentMode[0] === 'day' ? <Tooltip title="Day Mode" arrow><LightModeIcon onClick={toggleTheme} className="animate__animated animate__rotateIn" sx={{color: 'white', fontSize: '3vh', cursor: 'pointer'}}/></Tooltip> : <Tooltip title="Night Mode" arrow><DarkModeIcon className="animate__animated animate__rotateIn" onClick={toggleTheme} sx={{color: 'white', fontSize: '3vh', cursor: 'pointer'}}/></Tooltip>}
            {context.signedUser[0] === "" ? <><Link className="link" to="/login"><i className="fa-solid fa-user"></i> Login</Link></> : <h3>Hi, Kushal</h3>}</> 
             : 
             <>
             {context.currentMode[0] === 'day' ? <Tooltip title="Day Mode" arrow><LightModeIcon onClick={toggleTheme} className="animate__animated animate__rotateIn" sx={{color: 'white', fontSize: '3vw', cursor: 'pointer'}}/></Tooltip> : <Tooltip title="Night Mode" arrow><DarkModeIcon className="animate__animated animate__rotateIn" onClick={toggleTheme} sx={{color: 'white', fontSize: '3vw', cursor: 'pointer'}}/></Tooltip>}
            {context.signedUser[0] === "" ? <><Link className="link" to="/login"><i className="fa-solid fa-user"></i> Login</Link></> : <h3>Hi, Kushal</h3>}</>
            }
            
            
            <div className='searchArea' id="searchArea" onMouseOver={expand} onMouseLeave={collapse}>
            <i id="searchIcon" className="fa-solid fa-magnifying-glass"></i>
            <input id="searchBox" type="search" placeholder="Find in notes..." onChange={search}/>
            </div>
        </div>
        <button className='composeNote' onClick={addNote}>+</button>
        <Modal
        open={context.modalState[0]}
        onClose={()=>{context.modalState[1](false)}}>
            <div className="box">
                <input type="text" id="newTitle" placeholder="Note Title" />
                <textarea id="newContent" placeholder='Note Content'/>
                <button onClick={addNewNote}>Add Note</button>
            </div>
        </Modal>
    </div>
  )
}

export default Navbar