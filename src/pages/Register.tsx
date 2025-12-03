import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import type { TRegisterReq } from "../types"
import { useRegisterMutation } from "../store/appApi";

function Register() {
    const initialValues = {
        name: "",
        email: "",
        password: "",
    }
    const navigate = useNavigate();
    const [values, setValues] = useState<TRegisterReq>(initialValues);

    const [register, {isLoading, isSuccess, error }] = useRegisterMutation()
    useEffect(() => {
        if (!isLoading && isSuccess) {
            setValues(initialValues)
            navigate("/login", { replace: true })
        }
        if (!isLoading && error) {
            alert((error as any).data.message)
            console.log(error)
        }
    }, [isLoading, isSuccess, error])

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (!values.name.trim() || !values.email.trim() || !values.password.trim()) {
            alert("Please enter all fields");
            return
        }

        await register(values)
    }

  return (
    <div className="bg-white min-w-lg p-4 rounded-lg shadow-lg">
        <h1 className="text-center text-xl font-bold tracking-widest">Register</h1>
        <form className="space-y-2">
            <div className="flex flex-col gap-2">
                <label htmlFor="name">Name</label>

                <input 
                    type="text" 
                    value={values.name}
                    onChange={e => setValues({...values, name: e.target.value})}
                    className="p-2 border rounded-lg"
                    placeholder="Enter your name"
                    required
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="email">Email</label>

                <input 
                    type="email" 
                    value={values.email}
                    onChange={e => setValues({...values, email: e.target.value})}
                    className="p-2 border rounded-lg"
                    placeholder="Enter your email"
                    required
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="password">Password</label>

                <input 
                    type="password" 
                    value={values.password}
                    onChange={e => setValues({...values, password: e.target.value})}
                    className="p-2 border rounded-lg"
                    placeholder="Enter your password"
                    required
                />
            </div>

            <div className="flex items-center justify-between">
                <p>Already have an account?</p>
                <Link 
                    to={"/login"} 
                    className="text-blue-500 underline underline-offset-4"
                >
                    Login
                </Link>
            </div>

            <button 
            onClick={e => handleSubmit(e)}
            className="w-full bg-blue-500 py-2 text-white rounded-lg font-semibold cursor-pointer hover:bg-blue-500/80 my-2">
                Submit
            </button>
        </form>
    </div>
  )
}

export default Register