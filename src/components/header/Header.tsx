import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as HS from './header.styled';
import { useAuth } from '../../context/auth';
import { deleteCookie } from '../../utils/helpers/cookies';

const pages = [
  { name: 'Brands', url: '/manage-brands', img: '/icons/horn.svg' },
  {
    name: 'Content Manager',
    url: '/content-manager',
    img: '/icons/content-manager-icon.svg',
  },
];

export const Header: React.FC = () => {
  const { user, updateUser } = useAuth();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogOut = (): void => {
    user?.signOut(() => {
      updateUser(null);
      setAnchorEl(null);
      deleteCookie('token');
      router.push('/cs-admin-login');
    });
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const generateUrl = (url: string): string => {
    let updatedUrl = url;

    if (url === '/content-manager' && router?.query?.id) {
      updatedUrl += `/${router.query.id}`;
    }

    if (url === '/content-manager' && router?.query?.campaignId) {
      updatedUrl += `/${router.query.campaignId}`;
    }

    return updatedUrl;
  };

  return (
    <HS.AppBarCustom position="fixed">
      <HS.HeaderWrapper>
        <HS.HeaderLeftPart>
          <HS.LogoWrapper>
            <Image
              alt="convosight logo"
              src="/icons/convosight_logo_white.svg"
              width={96}
              height={20}
            />
            <p className="super-text">ADMIN</p>
          </HS.LogoWrapper>
          <HS.MainMenu>
            {pages.map(({ name, url, img }) => (
              <HS.MainMenuItem
                key={url}
                className={url === router.pathname ? 'active' : ''}
              >
                <Link href={generateUrl(url)}>
                  <a>
                    {img && (
                      <HS.MainMenuItemIcon>
                        <Image
                          src={img}
                          alt={`${name}-icon`}
                          width={20}
                          height={20}
                        />
                      </HS.MainMenuItemIcon>
                    )}

                    <span>{name}</span>
                  </a>
                </Link>
              </HS.MainMenuItem>
            ))}
          </HS.MainMenu>
        </HS.HeaderLeftPart>
        <HS.HeaderRightPart>
          <HS.MenuButton onClick={handleMenu}>Account</HS.MenuButton>
          <HS.HeaderMenu
            id="menu-appbar"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <HS.HeaderMenuListItem onClick={handleLogOut}>
              Logout
            </HS.HeaderMenuListItem>
          </HS.HeaderMenu>
        </HS.HeaderRightPart>
      </HS.HeaderWrapper>
    </HS.AppBarCustom>
  );
};
