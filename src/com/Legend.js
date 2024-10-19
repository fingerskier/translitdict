import React from 'react'
import K from '../translit.js' // Import the K object


export default function Legend({ language }) {
  const data = K[language] || []  // Access the data based on the selected language
  

  return <div className='legend'>
    <h3>Transliteration Table for {language.charAt(0).toUpperCase() + language.slice(1)}</h3>
    <table>
      <thead>
        <tr>
          <th>Character</th>
          <th>ASCII Transliteration</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {data.map((entry, index) => (
          <tr key={index}>
            <td>{entry.char}</td>
            <td>{entry.trans}</td>
            <td>{entry.description}</td> {/* Added description */}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
}