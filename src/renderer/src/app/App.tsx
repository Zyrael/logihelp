import { useEffect, useState } from 'react'
import { useServer } from '@renderer/hooks'
import { LoginPage, MainPage } from '@renderer/pages'
import { ServerContext } from '@renderer/ServerContext'

export function App(): React.ReactNode {
  const [loggedIn, setLoggedIn] = useState(false)
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

  const login = (): void => {
    setLoggedIn(true)
  }

  return (
    <ServerContext.Provider value={serverMethods}>
      <div className="h-full font-roboto">
        {loggedIn ? <MainPage /> : <LoginPage url={url} updateDB={updateDB} login={login} />}
      </div>
    </ServerContext.Provider>
  )
}
