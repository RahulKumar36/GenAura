import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full bg-[#030712] text-gray-300 pt-20">
    <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-700 pb-6"> 
        <div className="md:max-w-96">
            <img className="h-9" src={assets.logo} alt="logo"/>
            <p className="mt-6 text-sm"> 
                Experience the power of AI with GenAura. <br/> Transform your content creation with our suite of AI tools. Write articles,generate images and enhance your workflow.
            </p>
        </div>
        <div className="flex-1 flex items-start md:justify-end gap-20">
            <div>
                <h2 className="font-semibold mb-5 text-white">Company</h2>
                <ul className="text-sm space-y-2"> 
                    <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">About us</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Contact us</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Privacy policy</a></li>
                </ul>
            </div>
            <div>
                <h2 className="font-semibold text-white mb-5">Subscribe to our newsletter</h2>
                <div className="text-sm space-y-2"> 
                    <p>The latest news, articles, and resources, sent to your inbox weekly.</p>
                    <div className="flex items-center gap-2 pt-4">
                        <input className="border border-gray-600 placeholder-gray-500 bg-gray-800 text-white focus:ring-2 ring-primary outline-none w-full max-w-64 h-9 rounded px-2" type="email" placeholder="Enter your email"/>
                        <button className="bg-primary w-24 h-9 text-white rounded cursor-pointer">Subscribe</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <p className="pt-4 text-center text-xs md:text-sm text-gray-400 pb-5">
        Copyright 2025 © GenAura. All Right Reserved.
    </p>
</footer>
  )
}

export default Footer