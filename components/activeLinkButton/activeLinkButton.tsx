import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import '../../src/app/(authenticated)/home.scss';

type ActiveLinkProps = {
  title: string
} & LinkProps;

const ActiveLinkButton = ({ href, title, ...rest }: ActiveLinkProps) => {
  const pathName = usePathname();

  const isCurrentPath = 
    pathName === href ||
    pathName === rest.as ||
    pathName?.startsWith(String(rest.as));

  return (
    <>
      <Link { ...rest } href={ href } className="link" 
        style={{
          backgroundColor: `${
            isCurrentPath ? 'var(--bg-color-white-opacity-60)': ''
          }`
        }}> { title }
      </Link>
    </>
  )
}

export default ActiveLinkButton;