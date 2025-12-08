import BubbleCTA from '../../public/icons/BubbleCTA'
import React from 'react'
import { Link } from 'react-scroll'

export default function BubbleCTASection({ showBubble, }) {
    return (
        <div className={`cursor-pointer cta-bubble ${showBubble === true ? 'is-visible' : showBubble === false ? 'is-hidden' : ''}`} id="lets-talk-bubble">
            <Link to={'footer'}
                smooth={true}
                duration={500} title="Open Lets Talk CTA">
                <BubbleCTA />
                <div className="bubble-text text-line1"><span>Let&apos;s</span></div>
                <div className="bubble-text text-line1"><span>Talk</span></div>
            </Link>
        </div>
    )
}
