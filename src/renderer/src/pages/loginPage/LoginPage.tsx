interface Props {
  url: string
  updateDB: () => void
}

export function LoginPage({ url, updateDB }: Props): JSX.Element {
  return (
    <div className="flex flex-col justify-center items-center h-full bg-neutral-light  font-roboto">
      <div className="bg-primary text-white py-16 px-14 rounded-3xl flex flex-col items-center min-w-[550px]">
        <div className="text-2xl font-bold">Войти в справочник</div>
        <div className="w-full mt-8">
          <div className="text-2xl select-none">База:</div>
          {url ? (
            <div className="text-2xl mt-2 rounded-md select-none font-light">{url}</div>
          ) : (
            <button
              type="button"
              onClick={(): void => updateDB()}
              className="mt-4 bg-white text-2xl px-14 py-3 rounded-md text-primary font-bold"
            >
              ДОБАВИТЬ
            </button>
          )}
        </div>

        <div className="flex justify-center mt-12">
          <button
            type="button"
            disabled={!url}
            className="text-2xl px-14 py-3 rounded-md bg-white text-primary font-bold"
          >
            ВХОД
          </button>
        </div>
      </div>
    </div>
  )
}
