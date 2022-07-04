import React from 'react'
import { useUserAuth } from '../contexts/userAuthContext'

export const Home = () => {

  const {user} = useUserAuth();
  console.log(user)
  return (
    <div>
      
    </div>
  )
}
