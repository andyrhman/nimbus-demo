import React from 'react'
import Layout from '@/components/Layout.js'
import Navbar from '@/components/Navbar.js'
import Auth from '@/components/Login.js'

const Login = () => {
    return (
        <Layout>
            <Navbar />
            <Auth />
        </Layout>
    )
}

export default Login