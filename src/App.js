import React, { useState } from 'react'
import NestedListEditor from './com/NestedListEditor'
import { useFileHandler } from './hook/useFileHandler'
import Legend from './com/Legend'

import './App.css'


export default function App() {
  const { saveToFile, saveAs, loadFromFile } = useFileHandler()
  
  const [list, setList] = useState([{ name: 'Item 1', children: [] }])
  const [language, setLanguage] = useState('hebrew')
  
  
  const addItem = (parentIndex = null, path = []) => {
    const newItem = { name: 'New Item', children: [] }
    let newList = [...list]
    
    if (parentIndex !== null) {
      let parent = path.reduce((acc, index) => acc[index].children, newList)
      parent[parentIndex].children.push(newItem)
    } else {
      newList.push(newItem)
    }
    
    setList(newList)
  }
  
  
  const removeItem = (index, path = []) => {
    let newList = [...list]
    
    if (path.length > 0) {
      let parent = path.reduce((acc, idx) => acc[idx].children, newList)
      parent.splice(index, 1)
    } else {
      newList.splice(index, 1)
    }
    
    setList(newList)
  }
  
  
  const updateItem = (e, index, path = []) => {
    let newList = [...list]
    
    if (path.length > 0) {
      let parent = path.reduce((acc, idx) => acc[idx].children, newList)
      parent[index].name = e.target.value
    } else {
      newList[index].name = e.target.value
    }
    
    setList(newList)
  }
  
  
  const handleLoad = async () => {
    const loadedList = await loadFromFile()
    if (loadedList) setList(loadedList)
  }
  
  
  return (
    <div>
      <h1>
        translitdict
        
        <select value={language} onChange={E=>setLanguage(E.target.value)}>
          <option value="">Hide</option>
          <option value="hebrew">Hebrew</option>
          <option value="english">Greek</option>
        </select>
      </h1>
      
      <Legend language={language} />
      
      <NestedListEditor
        list={list}
        onAddItem={(index, path) => addItem(index, path)}
        onRemoveItem={(index, path) => removeItem(index, path)}
        onUpdateItem={(e, index, path) => updateItem(e, index, path)}
      />
      <button onClick={() => addItem()}>Add Top-Level Item</button>
      <hr />
      <button onClick={() => saveToFile(list)}>Save</button>
      <button onClick={() => saveAs(list)}>Save As</button>
      <br />
      <button onClick={handleLoad}>Load from File</button>
    </div>
  )
}