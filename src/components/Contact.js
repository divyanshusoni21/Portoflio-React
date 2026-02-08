import React from 'react'
import gmail from '../Icons/icons8-gmail.png'
import linkedin from '../Icons/icons8-linkedin.png'
import github from '../Icons/icons8-github.png'
import twitter from '../Icons/icons8-twitter.png'
import contact from '../Icons/contact.png'
import instagram from '../Icons/icons8-instagram.png'
import '../css/contact.css'
import { useState } from 'react'
import IconCard from './social_icons'

const Contact = () => {
    const [content,setContent] = useState('click to copy');

    const CTC =()=>{
        navigator.clipboard.writeText('divyanshusoni061@gmail.com');
        setContent('copied !')
    }

    return <>
        <div name='contact' className='w-full h-screen  bg-[#00040f] flex justify-center items-center'>
            <div className='flex flex-col max-w-[1000px] w-full p-4 '>
                <div className='pb-5'>
                    <p className='text-4xl font-bold inline border-b-4 border-pink-600 text-gray-300 text-center'>Contact Me</p>
                    <p className='text-gray-300 py-3'>let's have a chat🐱‍🏍connect with me through these </p>
                </div>
            
                <div className='flex'>
                    <div className=''>
                        <IconCard img={linkedin} link={'https://www.linkedin.com/in/divyanshusoni/'} title={'Linkedin'}/>
                        <IconCard img={github} link={'https://github.com/divyanshusoni21'} title={'Github'}/>
                        <div className='flex'>
                            <img className='pb-6 pr-2 height' src={gmail} alt="" />
                            <span className='text-gray-300 pt-4 txt-hvr'  data-tooltip-target="tooltip-top" data-tooltip-placement="top" onClick={CTC} onMouseEnter={()=>{setContent('click to copy')}} >Gmail</span>
                            <div id="tooltip-top" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                {content}
                                <div class="tooltip-arrow" data-popper-arrow></div>
                            </div>
                        </div>
                        <IconCard img={instagram} link={'https://www.instagram.com/aman_soni21/'} title={'Instagram'}/>
                        <IconCard img={twitter} link={'https://x.com/Divyanshus061'} title={'Twitter'}/>
                    </div>
                    <div className='m-auto mb-auto mt-20'>
                        <img src={contact} className='h-36 floating'  alt="" />
                    </div>
                </div>  
            </div>

            <div name='footer'>
                <hr className='bg-white' />
            </div>
        
        </div>

        </>
    }

export default Contact