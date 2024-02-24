// import { upload } from '@testing-library/user-event/dist/upload';
import React from 'react'
import { useState } from 'react';

const Prac = () => {

    const[ title, setTitle ] = useState("");
    const[ cover, setCover ] = useState();

    const newBook = ()=>{
        const uploadData = new FormData();
        uploadData.append('title', title);
        uploadData.append('cover', cover, cover.name); 
        console.log(title);
        fetch('http://127.0.0.1:8000/books/',
            { method: 'POST',
              body:uploadData 
            }).then( res => console.log(res) ).catch(error => console.log(error))
    }

  return (
    <div>
        <h3>UPLOAD images with React</h3>
        <label htmlFor="">
            Title
            <input type="text" value={title} onChange={(evt) => setTitle(evt.target.value)}/> 
        </label>
        <br />
        <label htmlFor="">
            Cover
            <input type="file" onChange={(evt) => setCover(evt.target.files[0])} />
        </label>
        <button onClick={() => newBook()}>New Book</button>
    </div>
  )
}

export default Prac