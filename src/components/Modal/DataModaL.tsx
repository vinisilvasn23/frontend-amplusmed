import { ReactNode } from 'react'

interface DataModalProps {
  modalType?: string
  isUser?: boolean
  open: boolean
  classDiv?: string
  title: string
  subtitle?: string
  titleButton: string
  colorButton?: string
  checked?: boolean
  onClose: () => void
  onButtonClick: () => void
  onClickCheckbox?: (isCheked: boolean) => void
  children: ReactNode
}

export default function DataModal({
  modalType,
  title,
  isUser,
  classDiv,
  titleButton,
  colorButton,
  open,
  checked,
  onClose,
  onButtonClick,
  onClickCheckbox,
  children,
}: DataModalProps) {
  const handleClose = () => {
    onClose()
  }

  return (
    <>
      <div
        data-dialog-backdrop="dialog"
        data-dialog-backdrop-close="true"
        className={`pointer-events-none fixed inset-0 z-[45] grid h-screen w-screen place-items-center bg-black bg-opacity-60 transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div
          data-dialog="dialog"
          className={`${modalType === 'delete' ? 'max-w-[600px]' : modalType === 'create' ? 'min-w-[800px]' : modalType === '1200' ? 'min-w-[1050px] max-w-[1850px]' : 'max-w-[800px]'} relative m-4 w-2/5  max-lg:max-w-[100%] max-lg:w-[95vw] max-lg:min-w-0 max-h-[95vh] rounded-lg bg-white dark:bg-bg-dark-theme font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased shadow-2xl ${open ? 'block' : 'hidden'} ${classDiv === 'delete' ? 'max-lg:h-[35vh] max-lg:max-h-[100vh] max-lg:w-[95vw]' : classDiv === 'create' ? 'max-lg:h-[95vh] max-lg:max-h-[100vh]' : ''}`}
        >
          <div className="flex justify-between items-center p-4 font-sans text-2xl antialiased font-semibold leading-snug shrink-0 text-blue-gray-900 dark:text-white">
            {title}
            <div className="flex flex-wrap self-center gap-4 justify-end p-4 shrink-0 text-blue-gray-500 ">
              <button
                data-ripple-light="true"
                data-dialog-close="true"
                className="middle none center rounded-lg font-semibold py-2 px-7 font-sans bg-additional-gray-700 dark:bg-[#878787] text-base"
                type="button"
                onClick={handleClose}
              >
                Cancelar
              </button>
              <button
                data-ripple-light="true"
                data-dialog-close="true"
                className={`middle none center rounded-lg font-semibold py-2 px-11 font-sans ${colorButton === 'red' ? 'bg-red-700' : 'bg-blue-700'}  text-white shadow-md shadow-blue-dark-500-500/20 transition-all hover:shadow-lg hover:shadow-blue-dark-700-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none text-base`}
                onClick={onButtonClick}
              >
                {titleButton}
              </button>
            </div>
          </div>
          {/* <span className="text-blue-dark-700 font-medium ml-14 text-20">
            {subtitle}
          </span> */}

          <div
            className="relative p-4 font-sans text-base antialiased font-light leading-relaxed border-t border-b border-t-blue-gray-100 border-b-blue-gray-100 text-blue-gray-500 overflow-y-auto"
            style={{ maxHeight: 'calc(90vh - 10rem)' }}
          >
            {children}
          </div>
          {isUser && (
            <div className="w-full flex justify-between items-center">
              {isUser ? (
                <div className="flex gap-2 items-center px-6">
                  <input
                    type="checkbox"
                    name="privilegedUser"
                    id="privilegedUser"
                    className="w-4 h-4"
                    checked={checked}
                    onClick={(e) => {
                      if (onClickCheckbox) {
                        const target = e.target as HTMLInputElement
                        onClickCheckbox(target.checked)
                      }
                    }}
                  />
                  <label htmlFor="privilegedUser">Usuário privilegiado</label>
                </div>
              ) : null}
              <div className="flex flex-wrap self-center gap-4 justify-end p-4 shrink-0 text-blue-gray-500 ">
                <button
                  data-ripple-light="true"
                  data-dialog-close="true"
                  className="middle none center rounded-lg font-semibold py-2 px-7 font-sans bg-aditional-gray-700 dark:bg-[#878787] text-white shadow-md shadow-blue-dark-600-500/20 transition-all hover:shadow-lg hover:shadow-blue-dark-700-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  onClick={handleClose}
                >
                  Cancelar
                </button>
                <button
                  data-ripple-light="true"
                  data-dialog-close="true"
                  className={`middle none center rounded-lg font-semibold py-2 px-11 font-sans ${colorButton === 'red' ? 'bg-red-700' : 'bg-blue-700'}  text-white shadow-md shadow-blue-dark-500-500/20 transition-all hover:shadow-lg hover:shadow-blue-dark-700-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
                  onClick={onButtonClick}
                >
                  {titleButton}
                </button>
              </div>
            </div>
          )}

          {/* {!isUser && (
            <div className="flex flex-wrap self-center gap-4 justify-end p-4 shrink-0 text-blue-gray-500 ">
              <button
                data-ripple-light="true"
                data-dialog-close="true"
                className="middle none center rounded-lg font-semibold py-2 px-7 font-sans bg-aditional-gray-700 dark:bg-[#878787] text-white shadow-md shadow-blue-dark-600-500/20 transition-all hover:shadow-lg hover:shadow-blue-dark-700-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                onClick={handleClose}
              >
                Cancelar
              </button>
              <button
                data-ripple-light="true"
                data-dialog-close="true"
                className={`middle none center rounded-lg font-semibold py-2 px-11 font-sans ${colorButton === 'red' ? 'bg-red-700' : 'bg-blue-700'}  text-white shadow-md shadow-blue-dark-500-500/20 transition-all hover:shadow-lg hover:shadow-blue-dark-700-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
                onClick={onButtonClick}
              >
                {titleButton}
              </button>
            </div>
          )} */}
        </div>
      </div>
    </>
  )
}
