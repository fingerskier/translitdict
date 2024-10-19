import { useState, useCallback } from 'react'


export function useFileHandler() {
  const [fileHandle, setFileHandle] = useState(null)
  
  const saveToFile = useCallback(async (data) => {
    const json = JSON.stringify(data, null, 2)
    
    try {
      let handle = fileHandle

      if (!handle) {
        handle = await window.showSaveFilePicker({
          types: [{ description: 'Text Files', accept: { 'text/plain': ['.txt'] } }] // <-- Added missing closing bracket
        })
        setFileHandle(handle)
      }

      const writable = await handle.createWritable()
      await writable.write(json)
      await writable.close()
    } catch (error) {
      console.error('Save error:', error)
    }
  }, [fileHandle])

  const saveAs = useCallback(async (data) => {
    const json = JSON.stringify(data, null, 2)

    try {
      const handle = await window.showSaveFilePicker({
        types: [{ description: 'Text Files', accept: { 'text/plain': ['.txt'] } }] // <-- Added missing closing bracket
      })
      const writable = await handle.createWritable()
      await writable.write(json)
      await writable.close()

      setFileHandle(handle)
    } catch (error) {
      console.error('Save As error:', error)
    }
  }, [])

  const loadFromFile = useCallback(async () => {
    try {
      const [handle] = await window.showOpenFilePicker({
        types: [{ description: 'Text Files', accept: { 'text/plain': ['.txt'] } }] // <-- Added missing closing bracket
      })
      const file = await handle.getFile()
      const text = await file.text()
      
      setFileHandle(handle)

      return JSON.parse(text)
    } catch (error) {
      console.error('Load error:', error)
      return null
    }
  }, [])

  return { saveToFile, saveAs, loadFromFile }
}