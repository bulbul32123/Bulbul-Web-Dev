import React from 'react'

export default function ClientPic({ text, bg }) {
    return (
        <div className={`py-3 px-5 rounded-full`} style={{ backgroundColor: bg }}>
            {text}
        </div>
    )
}
