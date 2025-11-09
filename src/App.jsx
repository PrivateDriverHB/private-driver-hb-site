import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import BookingForm from './components/BookingForm'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
export default function App(){return(<div className='min-h-screen flex flex-col bg-pdhb-dark text-white'><Header/><main className='flex-grow'><Hero/><section id='services' className='container py-16'><Services/></section><section id='booking' className='py-16 bg-black/30'><div className='container'><h2 className='text-3xl font-bold mb-6'>Réserver & payer en ligne</h2><BookingForm/></div></section><section className='container py-16'><Testimonials/></section></main><Footer/></div>) }