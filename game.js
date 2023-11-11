class Game {


	constructor() {
		this.show_coords = true;
		this.empty_space_char = ".";
		this.wall_char = "#";
		this.player_char = "P";
		this.game_board = this.generate_game_board(10, 10);
		this.player_pos = {"x": 0, "y": 0};
	}


	draw_player() {
		this.game_board[this.player_pos["x"]][this.player_pos["y"]] = this.player_char; 
	}


	can_move_here(x_pos, y_pos) { 
		if (x_pos < 0 || x_pos >= this.game_board[0].length) {
			return false;
		}
		else if (y_pos < 0 || y_pos >= this.game_board.length) {
			return false;
		}
		if (this.game_board[y_pos][x_pos] === this.wall_char) { 
			return false;
		}
		return true;
	}


	move_player(x_amount, y_amount) {
		if (x_amount === 0 && y_amount === 0) {
			throw new Error(`"x_amount" and "y_amount" cannot both be 0.`)
		}
		else if (x_amount === NaN || y_amount === NaN) {
			throw new Error(`Missing "x_amount" or "y_amount".`);
		}
		if (!(this.can_move_here(this.player_pos["x"] - x_amount, this.player_pos["y"] - y_amount))) {
			return;
		}
		this.game_board[this.player_pos["x"]][this.player_pos["y"]] = this.empty_space_char;
		this.player_pos["x"] -= x_amount;
		this.player_pos["y"] -= y_amount;
		this.draw_player();
	}


	generate_game_board(width, height) {
		let new_game_board = [];
		for (let y = 0; y < height; y++) {
			new_game_board.push([]);
			for (let x = 0; x < width; x++){
				new_game_board[y].push(this.empty_space_char);
			}
		}

		return new_game_board;
	}


	print_game_board() {
		let output = "";
		if (this.show_coords) {
			output += `X: ${this.player_pos["x"]}, Y: ${this.player_pos["y"]}.\n`
		}
		for (let y = 0; y < this.game_board.length; y++) {
			for (let x = 0; x < this.game_board[y].length; x++) {
				output += this.game_board[x][y];
			}
			output += "\n";
		}
		console.clear();
		console.log(output);
	}
}

module.exports = Game;