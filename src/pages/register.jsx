import React from 'react'
import Layout from '@/components/Layout.js'
import Navbar from '@/components/Navbar.js'
import AuthRegister from '@/components/Register.js'

const Register = () => {
    return (
        <Layout>
            <Navbar />
            <AuthRegister />
        </Layout>
    )
}

export default Register