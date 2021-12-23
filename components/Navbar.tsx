/* eslint-disable @next/next/link-passhref */
import Link from 'next/link';
import Image from 'next/image'
//top nav

export default function Navbar() {
  // const { user, username } = {};
  const user = true;
  const username = true;
  return (
    <nav className='navbar'>
      <ul>
        <li>
          <Link href="/">
            <button>FEED</button>
          </Link>
        </li>
        
        {/* user is signed in and has a username */}
        {username && (
          <>
          <li>
            <Link href="/admin">
              <button>Write Posts</button>
            </Link>
          </li>
          <li>
            <Link href={`/${username}`}>
              <img src={user?.photoURL} />
            </Link>
          </li>
          </>
        )}

        {/* user is not signed or has not created a username */}
        {!username && (
          <li>
            <Link href="/enter">
              <button>Log in</button>
            </Link>
          </li>

        )}
      </ul>
    </nav>
  )
}