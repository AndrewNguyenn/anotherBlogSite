import { auth, firestore, googleAuthProvider } from '../lib/firebase';
import { doc, writeBatch, getDoc, getFirestore } from 'firebase/firestore';
import { signInWithPopup, signInAnonymously, signOut } from 'firebase/auth';

export default function EnterPage({ }) {
  const user = null;
  const username = null;


  return (
    <main>
      {user?
        !username ? <UsernameForm /> : <SignOutButton />
      :
      <SignInButton />
      }
    </main>
  )
}

// sign in with google
function  SignInButton() {
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleAuthProvider)
  } 
  try{
    return(
    <button className='btn-google' onClick={signInWithGoogle}>
      <img src="/google.png" alt="an image of google"/> Sign in with Google
    </button>
    )
  }
  catch(error){
    console.log(error)
  }

}
// sign out
function SignOutButton() {
  try {
    return (
      <button onClick={() => signOut}>Sign Out</button>
    )
  } catch (error) {
    console.log(error)
  }
}

function UsernameForm() {
  
}