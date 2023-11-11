const { stdin } = require('process');
const Game = require('./game');
const readline = require('readline');
const game = new Game();
game.print_game_board();

readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
	process.stdin.setRawMode(true);
}

process.stdin.on('keypress', (chunk, key) => {
	if (key && key.name == 'w') {
		game.move_player(0,1);
	}
	else if (key && key.name == 's') {
		game.move_player(0,-1);
	}
	else if (key && key.name == 'a') {
		game.move_player(1,0);
	}
	else if (key && key.name == 'd') {
		game.move_player(-1,0);
	}
	game.print_game_board();
});