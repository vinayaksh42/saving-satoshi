'use client'

import Icon from 'shared/Icon'
import Avatar from 'components/Avatar'
import { useHasMounted } from 'hooks'
import { useAuthContext } from 'providers/AuthProvider'
import { Modal, useModalContext } from 'providers/ModalProvider'

export default function UserButton() {
  const hasMounted = useHasMounted()
  const modals = useModalContext()

  const { account, isLoading } = useAuthContext()

  const handleClick = (name: Modal) => {
    modals.open(name)
  }

  return (
    <div className="flex items-center">
      <div className="ml-4 h-10 w-10">
        {!hasMounted || (isLoading && <div />)}
        {hasMounted && !isLoading && (
          <>
            {account && (
              <button
                onClick={() => handleClick(Modal.Account)}
                aria-label="profile"
                className="text-grey-300 flex h-10 cursor-pointer items-center"
              >
                <Avatar avatar={account.avatar} size={30} />
              </button>
            )}
            {!account && (
              <button
                onClick={() => handleClick(Modal.SignIn)}
                aria-label="profile"
                className="text-grey-300 h-10 cursor-pointer"
              >
                <Icon icon="avatar" />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )
}
