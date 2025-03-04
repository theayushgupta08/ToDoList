import React from 'react'

const Navbar = () => {
    return (
        <nav className='flex justify-around font-serif text-black py-2'>
            <div className="logo">
                <span className='font-bold text-xl mx-8'>ZenList</span>
            </div>
            <ul className="flex gap-8 mx-9">
                <li className='cursor-pointer font-serif hover:font-bold transition-all'>Home</li>
                <li className='cursor-pointer font-serif hover:font-bold transition-all'>Your Tasks</li>
            </ul>
        </nav>
    )
}

export default Navbar