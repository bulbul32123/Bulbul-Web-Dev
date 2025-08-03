'use client'
import Image from 'next/image'
import React from 'react'

export const Logo = () => {
    return (
        <Image src={'/images/Logo.webp'} height={100} width={100} alt='Logo' />

    )
}
