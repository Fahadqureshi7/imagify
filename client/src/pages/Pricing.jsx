import React from 'react'
import { assets, plans } from '../assets/assets'

const Pricing = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <p className='border border-gray-500 rounded-full text-lg px-8 py-2'>
        Our Plans
      </p>
      <h2 className='text-4xl mt-5 font-medium'>
        Choose the plan
      </h2>
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 m-6">
  {plans.map((plan, index) => (
    <div
      key={plan.id || index}
      className="bg-white rounded-lg shadow p-6 flex flex-col items-center text-center hover:shadow-lg transition-transform duration-400 ease-in-out transform hover:scale-105 "
    >
      <img
        src={assets.logo_icon}
        alt={`Plan ${plan.id} logo`}
        className="w-12 h-12 mb-4"
      />
      <p className="text-lg font-semibold mb-2">Plan {plan.id}</p>
      <p className="text-gray-600 mb-4">{plan.desc}</p>
      <p className="text-gray-600 font-semibold mb-4 text-3xl">
        Rs. {plan.price}  <span className='text-sm font-medium'>
          / {plan.credits} credits
          </span>
      </p>
      <button
        className="bg-gray-800 w-50 text-white px-5 py-2 rounded transition-colors cursor-pointer"
      >
        Purchase
      </button>
    </div>
  ))}
</div>

    </div>
  )
}

export default Pricing