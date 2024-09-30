import React, { useState } from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaArrowRight } from 'react-icons/fa';
import { TiHome } from 'react-icons/ti';
import { MdAddCard } from 'react-icons/md';
import { BiLogoBlogger } from 'react-icons/bi';
import DummyAvatar from '../../assets/dummy_avatar.jpg';
import service from '../../appwrite/conf_service';

export default function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const [showMenu, setShowMenu] = useState(false);

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true,
      icon: <TiHome className="text-xl" />,
    },
    {
      name: 'Log in',
      slug: '/login',
      active: !authStatus,
    },
    {
      name: 'Sign up',
      slug: '/signup',
      active: !authStatus,
    },
    {
      name: 'My Posts',
      slug: '/all-posts',
      active: authStatus,
      icon: <BiLogoBlogger className="text-xl" />,
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      active: authStatus,
      icon: <MdAddCard className="text-xl" />,
    },
    {
      name: 'Profile',
      slug: '/dashboard',
      active: authStatus,
    },
  ];

  return (
    <header className="sticky top-0 z-[100] bg-white py-4 shadow-lg">
      <Container>
        <nav className="flex items-center justify-between">
          <div>
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <GiHamburgerMenu
            className="text-very-dark-purple select-none text-3xl md:hidden"
            onClick={() => {
              setShowMenu(true);
            }}
          />
          <div
            className={`fixed left-0 top-0 z-[200] h-screen w-screen bg-black/20 transition-all duration-300 ${
              showMenu ? 'visible opacity-100' : 'invisible opacity-0'
            } `}
            onClick={() => setShowMenu(false)}
          ></div>
          <div
            className={`fixed right-0 top-0 z-[300] h-screen w-2/3 px-6 py-8 transition-all delay-100 duration-300 ${
              showMenu
                ? 'translate-x-0 opacity-100'
                : 'translate-x-full opacity-0'
            }`}
            style={{
              background:
                'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.7) 100%)',
            }}
          >
            <FaArrowRight
              className="text-very-dark-purple text-2xl active:scale-95"
              onClick={() => {
                setShowMenu(false);
              }}
            />
            <ul className="mt-8 flex flex-col gap-3">
              {navItems.map((item) => {
                return item.active ? (
                  <li
                    key={`${item.slug}-${item.name}`}
                    className="flex"
                    onClick={() => {
                      setShowMenu(false);
                    }}
                  >
                    {item.name === 'Log in' || item.name === 'Sign up' ? (
                      <NavLink
                        to={item.slug}
                        className="bg-light-purple active:bg-dark-purple w-full rounded-md px-4 py-2 text-center font-Raleway text-lg font-medium text-white transition-colors active:scale-95"
                        style={({ isActive }) => {
                          return {
                            backgroundColor: isActive ? '#614499' : null,
                          };
                        }}
                      >
                        {item.name}
                      </NavLink>
                    ) : item.name === 'Profile' ? (
                      <NavLink
                        to={item.slug}
                        className="flex w-full justify-center"
                      >
                        <div className="h-[50px] w-[50px] rounded-full bg-black">
                          <img
                            src={
                              (userData?.userDetails?.avatar &&
                                service.getFilePreview(
                                  userData.userDetails.avatar
                                )) ||
                              DummyAvatar
                            }
                            alt="avatar"
                            className="h-full w-full rounded-full"
                          />
                        </div>
                      </NavLink>
                    ) : (
                      <NavLink
                        to={item.slug}
                        className="active:text-light-purple flex w-full items-center gap-2 px-4 py-2 font-Raleway text-xl font-medium text-gray-400 transition-colors"
                        style={({ isActive }) => {
                          return {
                            color: isActive ? '#7A59BD' : null,
                          };
                        }}
                      >
                        {item.icon}
                        {item.name}
                      </NavLink>
                    )}
                  </li>
                ) : null;
              })}
              {authStatus && (
                <li
                  onClick={() => {
                    setShowMenu(false);
                  }}
                >
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </div>

          <ul className="hidden gap-3 md:flex md:items-center">
            {navItems.map((item) => {
              return item.active ? (
                <li key={`${item.slug}-${item.name}`}>
                  {item.name === 'Log in' || item.name === 'Sign up' ? (
                    <NavLink
                      to={item.slug}
                      className="bg-light-purple hover:bg-dark-purple rounded-md px-4 py-3 font-Raleway text-lg font-medium text-white transition-colors"
                      style={({ isActive }) => {
                        return {
                          backgroundColor: isActive ? '#614499' : null,
                        };
                      }}
                    >
                      {item.name}
                    </NavLink>
                  ) : item.name === 'Profile' ? (
                    <NavLink to={item.slug}>
                      <div className="h-[50px] w-[50px] rounded-full bg-black">
                        <img
                          src={
                            (userData?.userDetails?.avatar &&
                              service.getFilePreview(
                                userData.userDetails.avatar
                              )) ||
                            DummyAvatar
                          }
                          alt="avatar"
                          className="h-full w-full rounded-full"
                        />
                      </div>
                    </NavLink>
                  ) : (
                    <NavLink
                      to={item.slug}
                      className="hover:text-light-purple flex items-center gap-2 px-4 py-2 font-Raleway text-lg font-medium text-gray-400 transition-colors"
                      style={({ isActive }) => {
                        return {
                          color: isActive ? '#7A59BD' : null,
                        };
                      }}
                    >
                      {item.icon}
                      <p>{item.name}</p>
                    </NavLink>
                  )}
                </li>
              ) : null;
            })}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
