import { useEffect, useState } from 'react'
import { useServer } from '@renderer/hooks'
import { LoginPage } from '../pages'
import { ServerContext } from '../ServerContext'

export function App(): React.ReactNode {
  // const { loading, token, login, logout } = useAuth();

  // const isAuthenticated = !!token || import.meta.env.MODE === "mock";

  // const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem('loggedIn') ?? false)
  const [url, setUrl] = useState('')

  const serverMethods: UseServer = useServer()

  const { getDBUrl, setDBUrl } = serverMethods

  useEffect(() => {
    getDBUrl().then((url) => {
      setUrl(url)
    })
  })

  const updateDB = async (): Promise<void> => {
    const newUrl = await setDBUrl()
    setUrl(newUrl)
  }

  // const login = (): void => {
  //   setLoggedIn(true)
  //   sessionStorage.setItem('loggedIn', 'true')
  // }

  return (
    <ServerContext.Provider value={serverMethods}>
      <div className="h-[100vh]">
        <LoginPage url={url} updateDB={updateDB} />
      </div>
    </ServerContext.Provider>
  )
}
