function addScore(amount){
	player.score += amount;
	scoreText.text = "Score " + player.score.toString();
};



function gameOver(){
	music.pause();

	swal({
		title: "Good job",
		text: "Thanks for trying, I guess. Your score is " + player.score,
		type: "warning",
		showCancelButton: false,
		confirmButtonText: "i do my best",
		closeOnConfirm: true,
	});
}