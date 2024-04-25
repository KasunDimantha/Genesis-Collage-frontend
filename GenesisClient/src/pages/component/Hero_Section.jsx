import React from 'react'
import heroimg from './img/photo01.avif'

function Hero_Section() {
  return (
    <>
            <section className="h-h100">
                <img src={heroimg} alt="heroimg" className="h-h100 w-w100%"/>

                <div className="flex justify-end relative font-sans right-9 -top-96">
                    <h2 className="text-white text-4xl font-bold">Where your carrier <br />future begin !!!</h2>
                    <button className="absolute top-20 right-28 text-base bg-[#333333] pt-2 pb-2 pl-5 pr-5 rounded-xl border-none text-white font-bold cursor-pointer top-24 ">Explor More !</button>
                </div>

            </section>
        </>
  )
}

export default Hero_Section
