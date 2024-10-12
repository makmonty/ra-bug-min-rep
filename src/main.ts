import { buildAuthorization, getGame } from "@retroachievements/api";

const draw = (content: string) => {
	document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
	  <div>
      ${content}
	  </div>
	`
}

const query = new URLSearchParams(window.location.search)
const username = query.get('username') as string;
const webApiKey = query.get('webApiKey') as string;

if (!username || !webApiKey) {
  draw('Please write your RA username and webApiKey as url query params');
} else {
  const authorization = buildAuthorization({ username, webApiKey });

  draw('Loading')

  getGame(authorization, { gameId: 228 }).then(game => {
    draw('Game: ' + game.gameTitle);
  }).catch(e => {
    draw('Error: ' + e.message)
  });
}
