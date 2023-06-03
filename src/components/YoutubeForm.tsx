import React from 'react'
import { useForm } from 'react-hook-form'

export const YoutubeForm: React.FC = () => {
  // Storing data coming from useForm in a variable named Form

  const Form = useForm()

  return (
    <>
      <form>
        <label htmlFor='username'>
          <span>Enter Username</span>
          <input type='text' id='username' name='username' />
        </label>

        <label htmlFor='email'>
          <span>Enter E-Mail</span>
          <input type='text' id='email' name='email' />
        </label>

        <label htmlFor='channel'>
          <span>Enter Channel</span>
          <input type='text' id='channel' name='channel' />
        </label>
      </form>
    </>
  )
}
