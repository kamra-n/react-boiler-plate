import React from 'react'
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export const Protected = ({ Cmp }) => {
    const navigate = useNavigate();
    let login = localStorage.getItem('login');
    useEffect(() => {
        if (!login) {
            navigate('/login')
        }

    })

    return (
        <div>
            <Cmp />
        </div>
    )
}
