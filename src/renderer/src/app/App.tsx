import { useEffect, useState } from 'react'
import { useServer } from '@renderer/hooks'
import { LoginPage, MainPage } from '@renderer/pages'
import { ServerContext } from '@renderer/ServerContext'
import { useDispatch } from 'react-redux'
import { setSuppliers } from './appSlice'

export function App(): React.ReactNode {
  const dispatch = useDispatch()

  const [loggedIn, setLoggedIn] = useState(false)
  const [url, setUrl] = useState('')
  const [loadingSuppliers, setLoadingSuppliers] = useState(false)

  const serverMethods: UseServer = useServer()

  const { getDBUrl, setDBUrl, getSuppliers } = serverMethods

  useEffect(() => {
    getDBUrl().then((url) => {
      setUrl(url)
    })
  }, [])

  const updateDB = async (): Promise<void> => {
    const newUrl = await setDBUrl()
    setUrl(newUrl)
  }

  const login = async (): Promise<void> => {
    setLoadingSuppliers(true)
    const data = await getSuppliers()
    dispatch(setSuppliers(data))
    setLoadingSuppliers(false)
    setLoggedIn(true)
  }

  return (
    <ServerContext.Provider value={serverMethods}>
      <div className="flex justify-center h-full font-roboto bg-gradient-to-b from-neutral-blue/10 to-slate-400">
        {loggedIn ? (
          <MainPage />
        ) : (
          <LoginPage
            url={url}
            updateDB={updateDB}
            login={login}
            loadingSuppliers={loadingSuppliers}
          />
        )}
      </div>
    </ServerContext.Provider>
  )
}
