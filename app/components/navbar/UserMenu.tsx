'use client'

import { safeUser } from '@/app/types';

import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

import { AiOutlineMenu } from 'react-icons/ai';

import Avatar from '../Avatar';
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { signOut } from 'next-auth/react';
import useClickOutside from '@/app/hooks/useClickOutside';
import useRentModal from '@/app/hooks/useRentModal';


interface UserMenuProps {
  currentUser?: safeUser | null; 
}

const UserMenu: React.FC<UserMenuProps> = ({
  currentUser
}) => {

  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, [])

  const handleSignOut = () => {
    signOut();
    setIsOpen(false)
  }

  const menuRef = useClickOutside(() => setIsOpen(false));

  const onRent = useCallback(() => {
    if (!currentUser) {
      loginModal.onOpen();
    } else {
      rentModal.onOpen();
    }
    setIsOpen(false);
  }, [currentUser, loginModal, rentModal])

  
  return (
    <div className="relative">

      <div className="flex flex-row items-center gap-3">

        <div
          onClick={onRent}
          className="
            hidden
            md:block
            text-sm
            font-semibold
            py-3
            px-4
            rounded-full
            hover:bg-neutral-100
            transition
            cursor-pointer
          "
        >
          Airbnb your home
        </div>

        <div
          onClick={toggleOpen}
          className="
            p-4
            md:py-1
            md:px-2
            border-[1px]
            border-neutral-200
            flex
            flex-row
            items-center
            gap-3
            rounded-full
            cursor-pointer
            hover:shadow-md
            transition  
          "
        >
          <AiOutlineMenu />
          <div className='hidden md:block'>

            <Avatar src={ currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          ref={menuRef}
          className='
            absolute
            rounded-xl
            shadow-md
            w-[40vw]
            md:w-3/4
            bg-white
            overflow-hidden
            right-0
            top-12
            text-sm
          '
        >

          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => {
                    router.push('/trips')
                    setIsOpen(false)
                  } }
                  label='My trips'
                />
                <MenuItem
                  onClick={() => {
                    router.push('/favorites')
                    setIsOpen(false)
                  }}
                  label='My favorites'
                />
                <MenuItem
                  onClick={ () => {
                    router.push('/reservations')
                    setIsOpen(false)
                  }}
                  label='My reservation'
                />
                <MenuItem
                  onClick={() => {
                    router.push('/properties')
                    setIsOpen(false)
                  }}
                  label='My properties'
                />
                <MenuItem
                  onClick={rentModal.onOpen}
                  label='Airbnb my home'
                />
                <hr />
                <MenuItem
                  onClick={handleSignOut}
                  label='Logout'
                />
              </>
            ): (
              <>
                <MenuItem
                  onClick={loginModal.onOpen}
                  label='Login'
                />
                <MenuItem
                  onClick={registerModal.onOpen}
                  label='Sign up'
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu

