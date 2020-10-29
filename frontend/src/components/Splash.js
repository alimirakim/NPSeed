import { Button } from '@material-ui/core'

export default function Splash() {
  return (
  <article id="splash">

    <ol>
      <li>
        <figure>
          <img src="/assets/splash-1.png" alt="" />
          <figcaption>1. Choose which kind of 'random'. 2. Customize options to suit your personal needs. 3. 'Randomize' and save your final character sheet!</figcaption>
        </figure>
      </li>
      <li></li>
      <li></li>
    </ol>
    <Button href="/signup" variant="contained">Make an Account</Button>
    <Button href="/login" variant="outlined">Login</Button>
    <Button href="/generator/start" variant="contained" color="secondary" size="large">Start</Button>
    <small>No account needed to use this generator, but you can save your characters if you sign up!</small>
  </article>
  )
}

function SplashStep() {
  return (
    <li>
      <figure>
        <img src="" alt="" />
        <figcaption>
          1. Choose a type of random
    </figcaption>
      </figure>
    </li>
  )
}