import {MapPin, Calendar, ArrowRight, UserRoundPlus, Settings2, X, AtSign, Plus} from 'lucide-react'
import { FormEvent, useState } from 'react'

import './App.css'

export function App() {

  const [isGuestInputOpen, setIsGuestInputOpen ] = useState(false);
  const [isGuestModalOpen, setIsGuestModalOpen ] = useState(false);
  const [emailsToInvite, setEmailsToInvite] =  useState([
    'paxe@gmail.com'
  ])


  function openGuestInput() {
    setIsGuestInputOpen(true);
  }

  function closeGuestInput() {
    setIsGuestInputOpen(false);
  }

  function openGuestModal() {
    setIsGuestModalOpen(true);
  }

  function closeGuestModal() {
    setIsGuestModalOpen(false);
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get('email')?.toString();

    if(!email) {
      return
    }

    if(emailsToInvite.includes(email)) {
      return
    }

    setEmailsToInvite([
      ...emailsToInvite,
      email
    ])

    event.currentTarget.reset();
  }

  function removeEmailFromInvites(emailToRemove: Strings) {
    const newEmailList = emailsToInvite.filter(email => email !== emailToRemove);
    
    setEmailsToInvite(newEmailList);
  }


  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">

        <div className='flex flex-col items-center gap-3'>
          <img src="/logo.svg" alt="plann.er"/>
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>

        <div className="space-y-4">
          <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <div className="flex items-center gap-2 flex-1">
              <MapPin className="size-5 text-zinc-400"/>
              <input disabled={isGuestInputOpen} className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" type="text" placeholder="Para onde voce vai?"/>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="size-5 text-zinc-400"/>
              <input disabled={isGuestInputOpen} className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none" type="text" placeholder="Quando?"/>
            </div>

            <div className="w-px-6 bg-zinc-800"/>

            {isGuestInputOpen ? (
              <button onClick={closeGuestInput} className="bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-zinc-400">
                Alterar local/data
                <Settings2 className="size-5"/> 
              </button>
            ) : (
              <button onClick={openGuestInput} className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
                Continuar
                <ArrowRight className="size-5"/> 
              </button>
            )}
          </div>

          {isGuestInputOpen && (
            <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
              <button onClick={openGuestModal} className="flex items-center gap-2 flex-1">
                <UserRoundPlus className="size-5 text-zinc-400"/>
                <span className="text-zinc-400">Quem estará na viagem?</span>
              </button>

              <div className="w-px-6 bg-zinc-800"/>

              <button className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
                Confirmar Viagem
                <ArrowRight className="size-5"/> 
              </button>
            </div>
          )}
        </div>
        
        <p className="text-zinc-300  text-sm">
          Ao planejar sua viagem pela plann.er você automaticamente concorda
          com nossos <a className="text-zinc-300 underline" href="#">termos de uso</a> e <a className="text-zinc-300 underline" href="#">políticas de privacidade</a>.
        </p>
      </div>

      {isGuestModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-zinc-900 w-[640px] rounded-xl py-5 px-6 shadow-shape space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-large font-semibold">Selecionar convidados</h2>
                <button onClick={closeGuestModal}>
                  <X className="size-5 text-zinc-400"/>
                </button>
              </div>

              <p className="text-sm text-zinc-400">
                Os convidados irão receber e-mails para confimar a participação na viagem.
              </p>   
            </div>

            <div className="flex flex-wrap gap-2">
              {emailsToInvite.map(email => {
                return (
                  <div key={ email } className="py-1.5 px-2.5 bg-zinc-800 flex items-center gap-2 rounded-xl">
                    <span className="text-zinc-300">{ email }</span>
                    <button type="button" onClick={() => removeEmailFromInvites(email)}>
                      <X className="size-4 text-zinc-400"/>
                    </button>
                  </div> 
                )
              })}   
            </div>

            <div className="w-full h-px bg-zinc-800"/>

            <form onSubmit={addNewEmailToInvite} className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <div className="px-2 flex items-center flex-1 gap-2">
                <AtSign className="text-zinc-400 size-5"/>
                <input className="bg-transparent text-lg placeholder-zinc-400 outline-none" type="email" name="email" placeholder="Digite o email do convidado."/>
              </div>

              <button type="submit" className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
                Convidar
              <Plus className="size-5"/> 
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
