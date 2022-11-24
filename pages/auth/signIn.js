import { getProviders, signIn } from "next-auth/react"
import Header from "../../components/Header";

// type Props = {
//     providers: Awaited<ReturnType<typeof getProviders>>
  
//   }


function signin({providers}) {
  return (
    <>
    <Header />

    <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-50 px-40 mx-auto">
      <img 
      className="w-80"
      src="https://links.papareact.com/ocw" alt="" />
      <p className="font-xs italic">
        This is is for test purposes only. Please
      </p>



    <div className="mt-48">
    {Object.values(providers).map((provider) => (
  
  <div 
  key={provider.name}>
    <button 
    className="p-3 bg-blue-500 rounded-lg text-white"
    onClick={() => signIn(provider.id, {
      callbackUrl: '/'
    })}>
      Sign in with {provider.name}
    </button>
  </div>
))}


    </div>
    </div>

 
    </>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}

export default signin