interface Props {
  url: string
  updateDB: () => void
}

export function LoginPage({ url, updateDB }: Props): JSX.Element {
  return (
    <div className="flex flex-col justify-center items-center h-full bg-purple-300">
      <div className="flex">
        <div className="text-3xl flex items-center select-none">База:</div>
        {url ? (
          <div className="text-2xl ml-4 bg-slate-50 px-4 py-2 rounded-md select-none">{url}</div>
        ) : (
          <button
            type="button"
            onClick={(): void => updateDB()}
            className="ml-4 bg-white text-xl px-4 py-2 rounded-md"
          >
            Добавить...
          </button>
        )}
      </div>
      <div className="flex justify-center mt-4">
        <button type="button" disabled={!url} className="bg-white text-xl px-4 py-2 rounded-md">
          Войти
        </button>
      </div>
    </div>
  )
}
