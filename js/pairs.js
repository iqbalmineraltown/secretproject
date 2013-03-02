var score;
var cardsmatched;

var ui = $("#gameUI");
var uiIntro = $("#gameIntro");
var uiStats = $("#gameStats");
var uiComplete = $("#gameComplete");
var uiCards= $("#cards");
var uiReset = $(".gameReset");
var uiScore = $(".gameScore");
var uiPlay = $("#gamePlay");
var uiTimer = $("#timer");

var matchingGame = {};
matchingGame.deck = ['ja','ja1','ma','ma1','ai','ai1','gf','gf1','aa', 'aa1','rf','rf1','nr','nr1','ie','ie1','sa','sa1',];

$(function(){
	  init();
});

function init() {
					uiComplete.hide();
					uiCards.hide();
					playGame = false;
					uiPlay.click(function(e) {
						e.preventDefault();
						uiIntro.hide();
						startGame();
					});
				
					uiReset.click(function(e) {
						e.preventDefault();
						uiComplete.hide();					
						reStartGame();
					});
			}


function startGame(){
				uiTimer.show();
				uiScore.html("0 detik");
				uiStats.show();
				uiCards.show();
				score = 0;
				cardsmatched = 0;
			   	if (playGame == false) {
			   			playGame = true;
						matchingGame.deck.sort(shuffle);
						for(var i=0;i<17;i++){
								$(".card:first-child").clone().appendTo("#cards");
							}
							uiCards.children().each(function(index) {
								
								$(this).css({
									"left" : ($(this).width() + 20) * (index % 6),
									"top" : ($(this).height() + 20) * Math.floor(index / 6)
								});
								
								var pattern = matchingGame.deck.pop();
								
								$(this).find(".back").addClass(pattern);
								
								$(this).attr("data-pattern",pattern);
								
								$(this).click(selectCard);
							});											 
				   	timer();
				};			   
			  }


function timer() {
				
				if (playGame) {
					scoreTimeout = setTimeout(function() {
						uiScore.html(++score + " detik");		
						timer();
					}, 1000);
				};
		};

function shuffle() {
	return 0.5 - Math.random();
}

function selectCard() {
	if ($(".card-flipped").size() > 1) {
	return;
	}
	$(this).addClass("card-flipped");
	if ($(".card-flipped").size() == 2) {
	setTimeout(checkPattern,700);
	}
}

function checkPattern() {
	if (isMatchPattern()) {
		$(".card-flipped").removeClass("card-flipped").addClass("card-removed");
			if(document.webkitTransitionEnd){
				$(".card-removed").bind("webkitTransitionEnd",	removeTookCards);
			}else{
				removeTookCards();
			}
		} else {
		$(".card-flipped").removeClass("card-flipped");
	}
}

function isMatchPattern() {
	var cards = $(".card-flipped");
	var pattern = $(cards[0]).data("pattern");
	var anotherPattern = $(cards[1]).data("pattern");
	return (pattern.substr(0,2) == anotherPattern.substr(0,2));
}

function removeTookCards() {
	if (cardsmatched < 8){
		cardsmatched++;
		$(".card-removed").remove();
	}else{
		$(".card-removed").remove();
		uiCards.hide();
		uiComplete.show();
		clearTimeout(scoreTimeout);
	}	
}

function reStartGame(){
				playGame = false;
				uiCards.html("<div class='card'><div class='face front'></div><div class='face back'></div></div>");
				clearTimeout(scoreTimeout);
				matchingGame.deck = ['ja','ja1','ma','ma1','ai','ai1','gf','gf1','aa', 'aa1','rf','rf1','nr','nr1','ie','ie1','sa','sa1',];			
				startGame();
			}
				