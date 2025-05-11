import Navbar from '@/components/Created/Navbar'
import Footer from '@/components/Footer'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Navbar />
            {
                children
            }
            <Footer />
        </div>
    )
}

export default layout
