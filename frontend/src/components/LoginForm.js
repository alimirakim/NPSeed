
export default function LoginForm() {
  <article id="login-form">
    <h2>Sign up</h2>

    <form>
      {/* <input type="hidden" name="_csrf" value={csrfToken} /> */}
      <label>Username
    <input type="text" placeholder="username" required />
      </label>
      <label>e-mail
    <input type="email" placeholder="e-mail" required />
      </label>
      <label>Password
    <input type="password" placeholder="password" required />
      </label>
      <label>Confirm Password
    <input type="password" placeholder="password" required />
      </label>

      <button>Sign-up</button>
    </form>
  </article>
}