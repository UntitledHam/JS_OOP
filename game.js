class Game {


	constructor() {
		this.show_coords = true;
		this.empty_space_char = ".";
		this.wall_char = "#";
		this.player_char = "P";
		this.block_char = "B"; 
		this.game_board = this.generate_game_board(10, 10);
		this.player_pos = {"x": 0, "y": 0};
		this.game_board[2][2] = this.block_char
	}


	draw_player() {
		this.game_board[this.player_pos["x"]][this.player_pos["y"]] = this.player_char; 
	}


	can_move_here(x_amount, y_amount) { 
		let new_x = this.player_pos["x"] - x_amount;
		let new_y = this.player_pos["y"] - y_amount;
		if (new_x < 0 || new_x >= this.game_board[0].length) {
			return false;
		}
		else if (new_y < 0 || new_y >= this.game_board.length) {
			return false;
		}

		let area_to_move_to = this.game_board[new_y][new_x];

		if (area_to_move_to === this.wall_char) { 
			return false;
		}
		else if (area_to_move_to === this.block_char) { 
			this.game_board[new_x - x_amount][new_y - y_amount] = this.block_char;
			return true; 
		}
		else if (area_to_move_to !== this.empty_space_char) {
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
		
		if (!(this.can_move_here(x_amount, y_amount))) {
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