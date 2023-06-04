import { DevTool } from '@hookform/devtools'
import React from 'react'
import { useForm } from 'react-hook-form'

type InputFields = {
  fname: string
  lname: string
  dob: string
  email: string
  password: string
  confirmPass: string
  address: string
}

export const PractisingReactHookForm: React.FC = () => {
  // extracting register to register below input field with react-hook-form | formstate to display errors | control for devtool | handleSubmit to allow react-hook-form to control form submittion
  const { register, formState, control, handleSubmit } = useForm<InputFields>()

  // Extracting error object which will contain all error if there is any
  const { errors } = formState

  const formSubmitHandler = (inpData: InputFields) => {
    console.log(inpData)
  }

  return (
    <>
      <div className='card m-auto w-75 mt-5 p-4'>
        <form
          noValidate
          className='d-flex flex-column px-4 w-100 gap-3'
          onSubmit={handleSubmit(formSubmitHandler)}>
          <h2 className='fw-bold'>React Hook Form Validation</h2>

          <div className='d-flex gap-5'>
            <label
              htmlFor='firstname'
              className='d-flex flex-column gap-2 w-50'>
              <span>Enter First name</span>
              <input
                type='text'
                id='firstname'
                className='form-control fs-5'
                placeholder='Alex'
                {...register('fname')}
              />
              {errors.fname && (
                <span className='text-danger'>{errors.fname.message}</span>
              )}
            </label>

            <label htmlFor='lastname' className='d-flex flex-column gap-2 w-50'>
              <span>Enter last name</span>
              <input
                type='text'
                id='lastname'
                className='form-control fs-5'
                placeholder='Jones'
                {...register('lname')}
              />
              {errors.lname && (
                <span className='text-danger'>{errors.lname.message}</span>
              )}
            </label>
          </div>

          <div className='d-flex gap-5'>
            <label htmlFor='pass' className='d-flex flex-column gap-2 w-50'>
              <span>Enter password</span>
              <input
                type='text'
                id='pass'
                className='form-control fs-5'
                placeholder='Enter password'
                {...register('password')}
              />
              {errors.password && (
                <span className='text-danger'>{errors.password.message}</span>
              )}
            </label>

            <label htmlFor='c-pass' className='d-flex flex-column gap-2 w-50'>
              <span>confirm password</span>
              <input
                type='text'
                id='c-pass'
                className='form-control fs-5'
                placeholder='confirm password'
                {...register('confirmPass')}
              />
              {errors.confirmPass && (
                <span className='text-danger'>
                  {errors.confirmPass.message}
                </span>
              )}
            </label>
          </div>

          <div className='d-flex gap-5'>
            <label htmlFor='email' className='d-flex flex-column gap-2 w-50'>
              <span>Enter E-mail</span>
              <input
                type='text'
                id='email'
                className='form-control fs-5'
                placeholder='example@domain.com'
                {...register('email')}
              />
              {errors.email && (
                <span className='text-danger'>{errors.email.message}</span>
              )}
            </label>

            <label htmlFor='dob' className='d-flex flex-column gap-2 w-50'>
              <span>Enter Date of birth</span>
              <input
                type='date'
                id='dob'
                className='form-control fs-5'
                {...register('dob')}
              />
              {errors.dob && (
                <span className='text-danger'>{errors.dob.message}</span>
              )}
            </label>
          </div>

          <label htmlFor='address' className='d-flex flex-column gap-2 w-100'>
            <span>Enter Address</span>
            <textarea
              id='address'
              className='form-control fs-5'
              placeholder='House no, Street no, Area Pincode, City, State, Country'
              rows={3}
              {...register('address')}
            />
            {errors.address && (
              <span className='text-danger'>{errors.address.message}</span>
            )}
          </label>

          <button className='btn btn-primary fs-6 text-uppercase align-self-start px-4 fw-semibold'>
            Save
          </button>
        </form>
      </div>
      <DevTool control={control} />
    </>
  )
}
