import { auth, firestore, googleAuthProvider } from '../lib/firebase';
import { doc, writeBatch, getDoc, getFirestore } from 'firebase/firestore';
import { signInWithPopup, signInAnonymously, signOut } from 'firebase/auth';
import { useContext, useState, useCallback, useEffect } from 'react';
import { UserContext } from '../lib/context';
import debounce from 'lodash.debounce';

export default function EnterPage({ }) {
  const { user, username } = useContext(UserContext)

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
  const [formValue, setFormValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { user, username } = useContext(UserContext);


  useEffect(() => {
    checkUsername(formValue)
  }, [formValue])

  const onSubmit = async(e) => {
    try {
      e.preventDefault()

    //create refs for both documents
    const userDoc = doc(getFirestore(), 'users', user.uid);
    const usernameDoc = doc(getFirestore(), 'usernames', formValue)

    //commit both docs together as a bitch write
    const batch = writeBatch(getFirestore());
    batch.set(userDoc, { username: formValue, photoURL: user.photoURL, displayName: user.displayName });
    batch.set(usernameDoc, { uid: user.uid });

    await batch.commit();
  } catch (error) {
      console.log(error)
    }
  }


  const onChange = (e) => {
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    if (val.length < 3) {
      setFormValue(val);
      setIsValid(false);
      setLoading(false);
    }

    if(re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  }

  // checks the database for duplicate user names
  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const ref = doc(getFirestore(), 'usernames', username);
        const snap = await getDoc(ref);
        console.log('Firestore read executed', snap.exists());
        setIsValid(!snap.exists());
        setLoading(false);
      }
    }, 500),
    []
  );

  return (
    !username && (
      <section>
        <h3>Choose Username</h3>
        <form onSubmit={onSubmit}>
          <input name="username" placeholder='username' value={formValue} onChange={onChange} />
          <button type='submit' className='btn-green' disabled={!isValid}>
            Yup
          </button>
          <h3>Debug State</h3>
          <div>
            Username: {formValue}
            <br />
            Loading: {loading.toString()}
            <br />
            Username Valid: {isValid.toString()}
          </div>
        </form>
      </section>
    )
  )
}