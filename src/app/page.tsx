'use client'
import './style.css'
import Logo from '../assets/LOGO.svg'
import Image from 'next/image'
import InputForm from '@/components/Form/Input'
import Form from '@/components/Form/Form'
import ButtonForm from '@/components/Form/Button'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import Loading from '@/components/Loading/Loading'
import InputError from '@/components/Form/InputError'
import { useForm } from 'react-hook-form'
const signInPropsSchema = z.object({
  email: z.coerce.string().min(1, 'Campo obrigatório!'),
  password: z.coerce.string().min(1, 'Campo obrigatório!'),
})

type SignInProps = z.infer<typeof signInPropsSchema>

export default function Login() {
  const { signIn, loading } = useContext(AuthContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInProps>({
    resolver: zodResolver(signInPropsSchema),
  })
console.log(loading)
  return (
    <>
      {loading ? <Loading /> : null}
      <section className="w-full h-screen bg-white">
        <div className="loginForm h-full grid grid-cols-[1.4fr,1fr] max-lg:grid-cols-none">
          <div className="imageArea relative flex flex-col items-center overflow-hidden max-lg:items-start max-lg:justify-end bg-cover bg-center bg-no-repeat h-full">
            <div className="absolute top-0 left-0 w-full h-full bg-[#05131b9d]"></div>
            <Image
              src={Logo}
              alt=""
              className="relative w-[250px] mt-[25%] max-lg:w-[150px] max-lg:mb-4 max-lg:ml-4"
            />
          </div>
          <div className="form  flex flex-col mt-14 items-center max-lg:absolute max-lg:w-full max-lg:h-screen max-lg:items-center max-lg:mt-0 max-lg:pt-16">
            <h1 className="text-blue-dark-700 font-bold text-[40px] max-lg:text-white">
              Login
            </h1>

            <div className="flex items-center mt-8">
              <div className="w-28 border-[.2px] border-dark-blue-500"></div>
              <span className="mx-4 text-blue-dark-500 max-lg:text-white">
                Acesse usando seu e-mail ou CPF
              </span>
              <div className="w-28 border-[.2px] border-dark-blue-500"></div>
            </div>

            <div className=" w-[400px] mt-12">
              <Form action="" onSubmit={handleSubmit(signIn)}>
                <InputForm
                  register={register}
                  type="text"
                  id="email"
                  title="password"
                  name="email"
                  label="Email"
                  autoFocus
                  placeholder="E-mail"
                  classStringLabel="max-lg:text-white"
                  classString="h-12"
                ></InputForm>
                {errors && errors.email && errors.email.message ? (
                  <InputError message={errors.email.message} />
                ) : null}
                <InputForm
                  register={register}
                  name="password"
                  title="password"
                  label="Senha"
                  id="password"
                  isPassword={true}
                  placeholder="Senha"
                  classStringLabel="mt-9 max-lg:text-white"
                  classString="w-full relative h-12"
                ></InputForm>
                {errors && errors.password && errors.password.message ? (
                  <InputError message={errors.password.message} />
                ) : null}
                <span className="text-blue-dark-700 font-semibold mt-1 flex hover:cursor-pointer max-lg:text-white">
                  Esqueci a senha
                </span>

                <ButtonForm
                  text="Entrar"
                  classString="bg-blue-700 mt-10 transition-all hover:bg-blue-dark-700"
                />
              </Form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
