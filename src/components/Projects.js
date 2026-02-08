import React from 'react'
import blogs from '../assets/blogs.png'
import edues from '../assets/edues.png'
import ytvidclipper from '../assets/yt-vidclipper.png'
import texutilitie from '../assets/texutilitie.png'
import jamnotes from '../assets/jam_notes.png'
import shoppingo from '../assets/shoppingo.png'
import ProjectCard from './ProjectCard'
import '../css/project.css'

const Projects = () => {
    let shoppingoSummary = "A BackEnd only E-commerce web app made with python's django restframework. Explore the APIs by getting categories and their products, api to search products , create orders, get all products of user and many more."
    let blogsSummary = 'Django blog application with CRUD opertions using class based viwes. sign in or signup ,view profile , create post ,view post and many more.. '
    let utilSummary = 'Perform diffrent action on your text such as character count, newline remover, extra-space remover etc. written in python-django.'
    let eduesSummary = 'A static responsive web-site using html,css and javascript. '
    let jamNotesSummary = 'A FullStack website to create notes , with React as Frontend and Django as Backend . login to your account or signup for one. Create,Read,Update,Delete notes. '
    let ytvidclipperSummary = 'Create short clips of youtube video, just give the youtube url and timestamp of the clip. A full stack web app built using django and react.'

    return (
    <div name='projects' className='w-full  bg-[#00040f] text-gray-300'>
        <div className='max-w-[1000px] w-full h-full mx-auto flex flex-col justify-center p-4'>
            <div className=''>
                <p className='text-4xl font-bold inline border-b-4 text-gray-300 border-pink-600'>
                Projects
                </p>
                <p className='py-3'>
                    check out my recent work
                </p>
            </div>
            {/* container */}
            <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-4'>

                {/* project cards */}

                <ProjectCard name='Yt VidClipper' code='https://github.com/divyanshusoni21/Yt-Vidclipper' demo='https://yt-vidclipper-fe.vercel.app/' image={ytvidclipper}  summary={ytvidclipperSummary}/>
                <ProjectCard name='Shoppingo' code='https://github.com/coderaman21/Shoppingo_BE' demo='https://documenter.getpostman.com/view/18000926/2s9YJW5RP9' image={shoppingo} summary={shoppingoSummary}/>
                <ProjectCard name='Jam Notes' code='https://github.com/coderaman21/jam-notes-BE' demo='https://jam-notes.netlify.app/' image={jamnotes} summary={jamNotesSummary}/>
                <ProjectCard name='Techies blogs' code='https://github.com/coderaman21/techies-blogs' demo='https://techies-blogs.vercel.app/' image={blogs}  summary={blogsSummary}/>
                <ProjectCard name='Textutilite.com' code='https://github.com/coderaman21/Textutils' demo='https://textutils-five-wine.vercel.app/' image={texutilitie}  summary={utilSummary}/>
                <ProjectCard name='Edues.in' code='https://github.com/coderaman21/Edues.in' demo='https://coderaman21.github.io/Edues.in/' image={edues}  summary={eduesSummary}/>
                            
            </div>
        </div>
    </div>
  )
}

export default Projects