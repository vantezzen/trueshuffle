<p align="center">
  <img src="https://github.com/vantezzen/trueshuffle/raw/main/public/favicon.png" width="300">
  <br />
  <br />
<a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvantezzen%2Ftrueshuffle&env=SPOTIFY_CLIENT_ID,SPOTIFY_CLIENT_SECRET,NEXTAUTH_SECRET&envDescription=Secrets%20for%20the%20Spotify%20API%20App&envLink=https%3A%2F%2Fdeveloper.spotify.com%2Fdashboard&project-name=trueshuffle&repository-name=trueshuffle&demo-title=TrueShuffle%20for%20Spotify&demo-description=Finally%20a%20Spotify%20shuffle%20that%20works!&demo-url=https%3A%2F%2Ftrueshuffle.vantezzen.io%2F&demo-image=https%3A%2F%2Ftrueshuffle.vantezzen.io%2Ffavicon.png"><img src="https://vercel.com/button" alt="Deploy with Vercel"/></a>
  </p>

# TrueShuffle - Finally a Spotify shuffle that works!

TrueShuffle is a web app that allows you to truly shuffle your Spotify playlists. It is built using NextJS and TailwindCSS.

TrueShuffle can be accessed at <https://trueshuffle.vantezzen.io>.

## Development

1. Clone the repository
2. Run `npm install` to install all dependencies
3. Copy `.env.example` to `.env.local` and fill in the required values
4. Start the development server using `npm run dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

TrueShuffle is deployed to Vercel but you can deploy it to any NextJS-compatible service.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvantezzen%2Ftrueshuffle&env=SPOTIFY_CLIENT_ID,SPOTIFY_CLIENT_SECRET,NEXTAUTH_SECRET&envDescription=Secrets%20for%20the%20Spotify%20API%20App&envLink=https%3A%2F%2Fdeveloper.spotify.com%2Fdashboard&project-name=trueshuffle&repository-name=trueshuffle&demo-title=TrueShuffle%20for%20Spotify&demo-description=Finally%20a%20Spotify%20shuffle%20that%20works!&demo-url=https%3A%2F%2Ftrueshuffle.vantezzen.io%2F&demo-image=https%3A%2F%2Ftrueshuffle.vantezzen.io%2Ffavicon.png)

For the deployment you will need a Spotify client ID and secret for a Spotify app from https://developer.spotify.com/dashboard.
Additionally, you will need to define a `NEXTAUTH_SECRET` which you can generate at <https://generate-secret.vercel.app/32>.

## License

MIT
