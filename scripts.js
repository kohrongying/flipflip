// Vue.config.devtools = true;

// const app = new Vue({
// 	el: "#app",
// 	data: {
// 	}
// })
$(document).ready(function(){
	const LEVEL = {
		easy: {
			count: 6,
			name: 'easy'
		},
		medium: {
			count: 12,
			name: 'medium',
		},
		hard: {
			count: 26,
			name: 'hard'
		}
	}
	
	const allPairings = () => {
		const colors = ['red', 'black'];
		const numbers = ['1', '2', '3', '4', '5', '6', '7', '8','9', '10', 'J', 'Q', 'K'];
		arr=[]
		for (let i=0;i<numbers.length;i++){
			for (let j=0; j<colors.length; j++){
				arr.push([numbers[i], colors[j]]);
			}
		}
		return arr;
	
	}

	const initialisePositions = (numOfPairs) => {
		let arr = Array.apply(null, Array(numOfPairs*2));
		return arr.map(function(x,i){ return String(i) });
	}
	
	// GLOBAL VARIABLES
	let playingCards = [];
	let score = 0;
	let numClicks = 0;

	const setUp = (numOfPairs) => {
		numClicks = 0;
		score = 0;
		playingCards = [];

		let cards = [];
		let pos = initialisePositions(numOfPairs);
		let pairs = allPairings();

		for (let i=0; i<numOfPairs; i++) {
			pairs_index = Math.floor(Math.random()*pairs.length);
			for (let j=0; j<2; j++) {
				pos_index = Math.floor(Math.random()*pos.length);
				let card = {
					color: pairs[pairs_index][1],
					number: pairs[pairs_index][0],
					position: pos[pos_index]
				}
				cards.push(card);
				pos.splice(pos_index, 1);
			}
			pairs.splice(pairs_index,1);
		}
		let sortedByPos = cards.slice(0);
		sortedByPos.sort(function(a,b) {
			return a.position - b.position;
		});
		return sortedByPos;
	}

	const setUpDOM = (level) => {
		playingCards = setUp(level.count);
		const body = document.getElementById('cards-area');
		body.setAttribute('data-level', level.name)
		for (let i=0; i<playingCards.length; i++) {
			let e = document.createElement('div');
			e.id = playingCards[i].position;
			e.className = "card";
			body.append(e);		
		}
	}

	const clearDOM = () => {
		$('.card').remove();
	}

	const checkPair = () => {
		let cards = $('.open');
		const first = playingCards[cards[0].id];
		const second = playingCards[cards[1].id];
		if (first.color == second.color && first.number == second.number) {
			return true;
		} 
		return false;
	}

	const openCard = (thisCard) => {
		let card = playingCards[thisCard.id];
		$(thisCard).addClass('open');
		thisCard.setAttribute('data-color', card.color);
		$(thisCard).text(card.number);
	}

	const closeCards = () => {
		$('.open').each(function(){
			$(this).removeClass('open');
			this.removeAttribute('data-color');
			$(this).text(" ");
		})
	}

	const removePair = () => {
		$('.open').each(function(){
			$(this).removeClass('open');
			$(this).css('visibility', 'hidden');
		})
	}

	$('#app').on('click', '.card', function(e){
		e.preventDefault();
		numClicks++;
		
		if (numClicks==1) {
			openCard(this);
			
		} else if (numClicks==2) {
			openCard(this);

			if (checkPair()) {
				score++;

				if (score == levelChoice.count){
					alert("you solved it!");
					window.location.href = "index.html";
				}
			}

		} else {			
			numClicks = 1;
			checkPair() ? removePair() : closeCards()
			openCard(this);
		}
	})

	$('#app').on('click', '#level-easy-btn', function(e){
		e.preventDefault();
		clearDOM();
		levelChoice = LEVEL.easy;
		setUpDOM(levelChoice);
	})

	$('#app').on('click', '#level-medium-btn', function(e){
		e.preventDefault();
		clearDOM();
		levelChoice = LEVEL.medium;
		setUpDOM(levelChoice);
	})

	$('#app').on('click', '#level-hard-btn', function(e){
		e.preventDefault();
		clearDOM();
		levelChoice = LEVEL.hard;
		setUpDOM(levelChoice);
	})

	let levelChoice = LEVEL.easy;
	setUpDOM(levelChoice);

})