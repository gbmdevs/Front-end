
import '../styles/global.css';

import { ChallengeContext } from '../contexts/ChallengeContext';

function MyApp({ Component, pageProps }) {
  return (
     < ChallengeContext.Provider value={'teste'}>
         <Component {...pageProps} />
     </ChallengeContext.Provider> )
}

export default MyApp
