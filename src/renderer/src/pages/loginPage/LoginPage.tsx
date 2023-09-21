interface Props {
  url: string
  loadingSuppliers: boolean
  updateDB: () => void
  login: () => void
}

export function LoginPage({ url, loadingSuppliers, updateDB, login }: Props): JSX.Element {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="bg-primary text-white py-16 px-14 rounded-3xl flex flex-col items-center min-w-[550px]">
        <div className="text-2xl font-bold">Войти в справочник</div>
        <div className="w-full mt-4 flex min-h-[40px]">
          <div className="text-xl select-none flex items-end">База:</div>
          {url ? (
            <div className="text-xl ml-2 flex items-end rounded-md select-none font-light">
              {url}
            </div>
          ) : (
            <button
              type="button"
              onClick={(): void => updateDB()}
              tabIndex={-1}
              className="ml-2 bg-neutral-light px-4 py-1 rounded-md text-primary shadow-bottom active:translate-y-1 active:shadow-bottom-pressed select-none"
            >
              ДОБАВИТЬ
            </button>
          )}
        </div>

        <div className="flex justify-center mt-12">
          <button
            type="button"
            disabled={!url}
            tabIndex={-1}
            onClick={login}
            className="text-2xl px-14 py-3 rounded-md bg-neutral-light text-primary font-bold shadow-bottom active:translate-y-1 active:shadow-bottom-pressed disabled:pointer-events-none select-none"
          >
            {loadingSuppliers ? 'ЗАГРУЗКА' : 'ВХОД'}
          </button>
        </div>
      </div>
    </div>
  )
}
