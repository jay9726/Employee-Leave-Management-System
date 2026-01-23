import React, { useState } from 'react'
import Icon from '../icon'
import { EyeIcon, EyeOff } from 'lucide-react'

interface inputComponentProps {
    type?: string,
    placeholder?: string,
    wrapperclassName?: string,
    error?: string,
    leftIcon?: React.ReactNode,
    rightIcon?: React.ReactNode,
    togglePassword?: boolean,
    value: string,
    onChange: (value: string) => void
    disable? : boolean
}

const InputComponent = React.forwardRef<HTMLInputElement, inputComponentProps>(
    ({
        type = 'text',
        placeholder,
        wrapperclassName,
        leftIcon,
        rightIcon,
        error,
        togglePassword = false,
        value,
        onChange,
        disable = false,
        ...props
    }, ref
    ) => {

        const [showPassword, setShowPassword] = useState(true)

        const isPasswordType = type === 'password' && togglePassword

        return (
            <div className='flex flex-col gap-1'>

                <div className='w-full flex gap-1 border border-gray-500 p-1 rounded-xl px-2'>
                    {
                        leftIcon && (<span className='flex justify-center items-center'>{leftIcon}</span>)
                    }
                    <input
                        ref={ref}
                        type={showPassword && isPasswordType ? 'password' : 'text'}
                        placeholder={placeholder}
                        className={`w-full flex items-center text-sm border-none bg-transparent focus:outline-none px-1 py-1 ${wrapperclassName}`}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        {...props}
                        disabled={disable}
                    />
                    {
                        isPasswordType ? (
                            <button
                                type='button'
                                onClick={() => setShowPassword((pre) => !pre)}
                            >
                                {showPassword ? <EyeIcon className='h-4 w-4' stroke='blue' /> : <EyeOff className='h-4 w-4' stroke='blue' />}
                            </button>
                        ) : (
                            rightIcon && (<span className='flex justify-center items-center'>{rightIcon}</span>)
                        )
                    }
                </div>
                <div className='h-3 flex gap-1 items-center pl-2'>
                    {error && (<Icon name='X' width={12} height={12} stroke='red' />)}
                    <small className={`text-red-500 ${error ? 'opacity-100' : 'opacity-0'}`}>{error}</small>
                </div>
            </div>
        )
    }
)

export default InputComponent