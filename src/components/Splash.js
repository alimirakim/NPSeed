import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

// MATERIAL-UI
import { Button, Typography } from '@material-ui/core'

// MY COMPONENTS

// ACTIONS

export default function Splash() {
  // TODO Is there any preference if both options are equally readable/convenient
  // for prop threading or for selecting for these scenarios?
  const hasToken = useSelector(state => state.authUser.token ? true : false)
  const steps = [
    "Choose a randomizer setting.",
    "Customize any options you'd like, or just leave every NPC trait up to chance.",
    "Click the button and see your new NPC!"
  ]

  return (
    <article>

      <article
        style={{ display: "flex", "flexDirection": "column", "alignItems": "center" }}
      >
        <Typography variant="h2" style={{ margin: "4rem 1rem 2rem" }}>Welcome to NPSeed 🌱 </Typography>
        <ol style={{ display: "flex" }}>
          {steps.map(step => {
            return (
              <li key={steps.indexOf(step)} style={{ width: "30%" }}>
                <SplashStep step={step} />
              </li>
            )
          })})
        </ol>

        <div style={{ display: "flex", "flexDirection": "column", width: "300px" }}>
          <Button hidden={hasToken} component={Link} to="/signup" variant="contained">Make an Account</Button>
          <br />
          <Button hidden={hasToken} component={Link} to="/login" variant="outlined">Login</Button>
          <br />
          <br />
          <Button component={Link} to="/generator/start"
            variant="contained" color="secondary" size="large"
          >
            Generate Your NPC
        </Button>
        </div>
        <br />
        <small>No account needed to use this generator, but you can save your characters if you sign up!</small>
      </article>

      {/* <article hidden={!hasToken}>
        <Button component={RouterLink} to="/generator/start"
          variant="contained" color="secondary" size="large"
        >
          Go to NPC Generator
        </Button>
      </article> */}
    </article>
  )
}

function SplashStep({ step }) {
  return (
    <figure>
      <img src="" alt="" style={{ width: "200px", height: "200px" }} />
      <figcaption>
        {step}
      </figcaption>
    </figure>
  )
}