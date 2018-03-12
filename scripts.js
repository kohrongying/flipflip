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
	let playingCards = [];
	let score = 0;
	const colors = ['red', 'black'];
	let numbers = ['1', '2', '3', '4', '5', '6', '7', '8','9', '10', 'J', 'Q', 'K'];
	const initialisePositions = (numOfPairs) => {
		let arr = Array.apply(null, Array(numOfPairs*2));
		return arr.map(function(x,i){ return String(i) });
	}
	let numClicks = 0;

	const setUp = (numOfPairs) => {
		let cards = [];
		let pos = initialisePositions(numOfPairs);

		for (let i=0; i<numOfPairs; i++) {
			colors_index = Math.floor(Math.random()*colors.length);
			numbers_index = Math.floor(Math.random()*numbers.length);

			for (let j=0; j<2; j++) {
				pos_index = Math.floor(Math.random()*pos.length);
				let card = {
					color: colors[colors_index],
					number: numbers[numbers_index],
					position: pos[pos_index]
				}
				cards.push(card);
				pos.splice(pos_index, 1);
			}
			numbers.splice(numbers_index, 1);
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
			// e.setAttribute('data-color','foo');
			e.className = "card";
			body.append(e);		
		}
	}

	const checkPair = (cards) => {
		const first = playingCards[cards[0].id];
		const second = playingCards[cards[1].id];
		if (first.color == second.color && first.number == second.number) {
			return true;
		} else {
			return false;
		}
	}

	$('#app').on('click', '.card', function(e){
		e.preventDefault();
		numClicks++;
		console.log(numClicks);
		if (numClicks<2) {
			// numClicks++;
			
		} else if (numClicks==2) {
			let card = playingCards[this.id];
			$(this).addClass('open');
			this.setAttribute('data-color', card.color);
			$(this).text(card.number);

			let cards = $('.open');
			if (checkPair(cards)) {
				score++;
			}
			if (score == levelChoice.count){
				alert("you solved it!");
			}
			return
		} else {
			numClicks = 1;
			let cards = $('.open');
			if (checkPair(cards)) {
				$('.open').each(function(){
					$(this).removeClass('open');
					$(this).css('visibility', 'hidden');
				})
			} else {
				$('.open').each(function(){
					$(this).removeClass('open');
					this.setAttribute('data-color', "foo");
					$(this).text(" ");
				})
			}
			
		}

		let card = playingCards[this.id];
		$(this).addClass('open');
		this.setAttribute('data-color', card.color);
		$(this).text(card.number);
	})

	const levelChoice = LEVEL.easy;
	setUpDOM(levelChoice);

})