import React from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

type FieldValues = {
  username: string
  email: string
  channel: string
  socialLinks: {
    twitter: string
    facebook: string
  }
  contactNo: string[]
  // type for dynamic fields
  references: { referenceName: string }[]
}

export const YoutubeForm: React.FC = () => {
  console.log('i am rendered')
  // Storing data coming from useForm in a variable named Form
  // by creating a type all the properties present in FieldValues type will only be allowed in register method | Obviously this is just for type safety and better development experience

  // Inside of useForm Hook we can pass an object with a property name defaultValues which is an object in which we can assign some default values as we define using defaultValue prop but keep in mind while working with react-hook-form we will not handle all input fields using react-form-hook

  // We can also store data of input fields in form of objects or array examples are shown below
  const Form = useForm<FieldValues>({
    defaultValues: {
      channel: '',
      email: '',
      username: 'Alex',
      contactNo: [],
      socialLinks: {
        facebook: '',
        twitter: '',
      },
      // For dynamic fields
      references: [],
    },
  }) // this Form is a object returned from useForm()
  // NOTE: This useForm() will not re-redner our components [which will be the case when we use react controlled component like using useState hook to keep track of value changes of input fields] because of this behaviour of the react-hook-form makes it high performant | and keep this in mind while using react-hook-form

  // extracting register | control | handleSubmit | formState function from Form returned by useForm() hook
  const { register, control, handleSubmit, formState, setValue } = Form // this control will be passed in hookform/devtools so that we can see data in GUI on browser instead of writing extra code

  // now to display error messages useForm hook gives us formstate object which will contain errors object containing info related to all input fields
  const { errors } = formState // now this errors object will contains all the properties if those properties contains some error like username if no field will contain any error then this object will be empty
  // NOTE when there will be any changes in this error object (for ex: any error ocurred while validation or when user types again in input after error occured) then this component will get re-rendered

  // register function is use to give react-hook-form access to input fields
  // EX:
  // For userName input field we write
  // now to implement validation using react-hook-form we can pass a second argument (which is an object) in register mehod in this object we can write basic validation like field is required by writing "required: errror message" and we can write all native browser validation like email etc and we can also write some custom validation by using validate property or we can validate acc. to pattern example given in input:email field written below
  const {
    name: username,
    onBlur: usernameBlurFn,
    onChange: usernameChangeFn,
    ref: usernameRef,
  } = register('username', { required: 'Username is required' }) // we can do this for every field but we have a nicer aproach | we can spread the result of register function as shown below

  // while working with react-hook-form we will use handleSubmit function returned by useForm hook and pass a custom function to this handleSubmit and hook this handleSubmit to onSubmit prop

  // now upon passing this to handlesubmit this function will have access to an object containing input field data. | type of this data will be an object containing input field values
  const formSubmitHandler = (data: FieldValues) => {
    console.log('form submited', data)

    // now there is also function which useForm() hook return for example setValue | getValue working is same as the name says and these two function also not render the entire component
    // we can use the setValue function to set certain field to some value USE CASE - we want to reset the form input field upon submition
    // restting input fields on successfull form submittion
    // setvalue only set one field value at a time
    setValue('channel', '')
    setValue('contactNo', [''])
    setValue('email', '')
    setValue('socialLinks', { facebook: '', twitter: '' })
    setValue('username', '')
  }

  // In order to vallidate our input field using react-hook-form we have to add noValidate attribute to our form tag to avoid browser default validation.

  // NOW We can work with dynamic input fields for ex: instead of having a static form with a fixed no of input fields we will now add a option by which we will allow user to add multiple data on demand and user can also remove that if not required for ex: list of refrences name
  // for this kind of action we will import another hook named "useFieldArray" from react-hook-form and also add another field both in useForm() hook defaultValues and FieldValues type
  // now we will extract some data from this useFieldArray
  // this fields property will contains the count of fields we have to display on our page
  // append will allow us to add new input field in fields array on user demand
  // remove will allow user to remove unncessary fields which user don't want or added by mistake
  // to see this in action explore code written after phonenumbers input field
  const { fields, append, remove } = useFieldArray({
    name: 'references',
    control,
  })

  return (
    <>
      {/* below is how we will hook handleSubmit to onSubmit prop and pass a custom function to it */}
      <form
        onSubmit={handleSubmit(formSubmitHandler)}
        className='w-50 m-auto mt-5 d-flex flex-column gap-2'
        noValidate>
        <label htmlFor='username' className='d-flex flex-column gap-1'>
          <span>Enter Username</span>
          <input
            className={`form-control ${errors.username ? 'border-danger' : ''}`}
            type='text'
            id='username'
            name={username}
            onBlur={usernameBlurFn}
            onChange={usernameChangeFn}
            ref={usernameRef}
          />
          {errors.username && (
            <span className='text-danger fw-semibold'>
              {errors.username.message}
            </span>
          )}
        </label>

        {/* Using nested object to store / acces data */}

        <label htmlFor='email' className='d-flex flex-column gap-1'>
          <span>Enter E-Mail</span>
          <input
            className={`form-control ${errors.email ? 'border-danger' : ''}`}
            type='text'
            id='email'
            {...register(
              'email',
              // PATTERN VALIDATION
              {
                // for pattern validation we will pass an object to pattern field with value key and message key
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                  message:
                    'Entered email is not valid | Ex: something@example.com',
                },
                required: {
                  value: true,
                  message: 'Email is required',
                },
                // Now we can add a custom validaition by using a validate property
                // in this we can pass multiple function as key value pair in which value will be a function which either return true if validation success or return a error string, and this function will recieve field value as parameter
                validate: {
                  notAdmin(f) {
                    return (
                      f !== 'admin@nuubi3e.com' ||
                      'this email is already registered'
                    )
                  },
                },
              }
            )}
          />
          {errors.email && (
            <span className='text-danger fw-semibold'>
              {errors.email.message}
            </span>
          )}
        </label>
        <label htmlFor='channel' className='d-flex flex-column gap-1'>
          <span>Enter Channel</span>
          <input
            className={`form-control ${errors.channel ? 'border-danger' : ''}`}
            type='text'
            id='channel'
            {...register('channel', { required: 'Channel name is required' })}
          />
          {errors.channel && (
            <span className='text-danger fw-semibold'>
              {errors.channel.message}
            </span>
          )}
        </label>
        <label htmlFor='twitter' className='d-flex flex-column gap-1'>
          <span>Enter twitter</span>
          <input
            className={`form-control ${
              errors.socialLinks?.twitter ? 'border-danger' : ''
            }`}
            type='text'
            id='twitter'
            {...register('socialLinks.twitter', {
              required: 'Social name is required',
            })}
          />
          {errors.socialLinks?.twitter && (
            <span className='text-danger fw-semibold'>
              {errors.socialLinks.twitter.message}
            </span>
          )}
        </label>
        <label htmlFor='facebook' className='d-flex flex-column gap-1'>
          <span>Enter facebook</span>
          <input
            className={`form-control ${
              errors.socialLinks?.facebook ? 'border-danger' : ''
            }`}
            type='text'
            id='facebook'
            {...register('socialLinks.facebook', {
              // to disable a form field while using react-hook-form we will use disabled property in this object and set it to true or false or we can setit dynamically to. and note when a input fied is disabled then no validation rule will get applied
              disabled: true,
              required: 'Social name is required',
            })}
          />
          {errors.socialLinks?.facebook && (
            <span className='text-danger fw-semibold'>
              {errors.socialLinks.facebook.message}
            </span>
          )}
        </label>

        {/* STORING Input field data in array */}
        <label htmlFor='phon-no-1' className='d-flex flex-column gap-1'>
          <span>Enter Phone 1</span>
          <input
            className={`form-control ${
              errors.contactNo?.[0] ? 'border-danger' : ''
            }`}
            type='text'
            id='phon-no-1'
            {...register('contactNo.0', {
              setValueAs: Number, // this will convert input data into
              validate: {
                notNumber(val) {
                  return !isNaN(+val) || 'Entered data is not a number  '
                },
                checkLength(val) {
                  return (
                    val.toString().length === 10 ||
                    'Please enter a valid phone number'
                  )
                },
              },
            })}
          />
          {errors.contactNo?.[0] && (
            <span className='text-danger fw-semibold'>
              {errors.contactNo[0].message}
            </span>
          )}
        </label>
        <span>click on add button below to enter refrences</span>
        {/* Dynamic InputFields */}
        {fields.map((field, index) => {
          return (
            <label
              key={field.id}
              htmlFor={field.id}
              className='d-flex flex-column gap-1'>
              <span> reference {index + 1}</span>
              <input
                className={`form-control ${
                  errors.username ? 'border-danger' : ''
                }`}
                type='text'
                id={field.id}
                {...register(`references.${index}.referenceName` as const, {
                  required: 'field is required',
                })}
              />

              {errors.references && (
                <span className='text-danger fw-semibold'>
                  {errors.references[index]?.referenceName.message}
                </span>
              )}

              {/* Below button is used to remove added field if user not want to enter that info */}
              <button
                className='btn mt-3 align-self-start btn-primary px-4 text-uppercase fw-semibold '
                type='button'
                onClick={() => remove(index)}>
                remove
              </button>
            </label>
          )
        })}
        {/* button to add input fields on demand */}
        <button
          className='btn mt-3 align-self-start btn-info px-4 text-uppercase fw-semibold'
          type='button'
          // value given in refrenceName field is the default value for upcoming field
          onClick={() => append({ referenceName: '' })}>
          add
        </button>
        {/* DYNAMIC FIELD CODE ENDED HERE */}
        <button
          className='btn mt-3 align-self-start btn-primary px-4 text-uppercase fw-semibold'
          type='submit'>
          Save
        </button>
      </form>
      {/* Using Devtool */}
      <DevTool control={control} />
      {/* After hook devtools you will see a pink icon on top right corner on click you will see GUI of data for this form*/}
    </>
  )
}
