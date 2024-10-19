import React, { useState } from 'react'

export default function NestedListEditor({ list, onAddItem, onRemoveItem, onUpdateItem, path = [] }) {
  const [collapsed, setCollapsed] = useState(Array(list.length).fill(false))

  const toggleCollapse = (index) => {
    const newCollapsed = [...collapsed]
    newCollapsed[index] = !newCollapsed[index]
    setCollapsed(newCollapsed)
  }

  return <ul className='nestlist'>
    {list.map((item, index) => (
      <li key={index}>
        <div>
          <button onClick={() => toggleCollapse(index)}>
            {collapsed[index] ? '🔽': '🔼' }
          </button>
          <input 
            type="text" 
            value={item.name} 
            onChange={(e) => onUpdateItem(e, index, path)} 
          />
          <button onClick={() => onAddItem(index, path)}>➕</button>
          <button onClick={() => onRemoveItem(index, path)}>❌</button>
        </div>
        {!collapsed[index] && item.children.length > 0 && (
          <NestedListEditor
            list={item.children}
            onAddItem={onAddItem}
            onRemoveItem={onRemoveItem}
            onUpdateItem={onUpdateItem}
            path={[...path, index]}
          />
        )}
      </li>
    ))}
  </ul>
}
