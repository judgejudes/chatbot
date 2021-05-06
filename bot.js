class CoffeeBot {
	constructor() {
		this.coffeeAmount = 0
		this.maxCoffee = 10
		this.coffeeFlavor = "Folgers Instant"
		this.coffeeDescription = "boring coffee"

		this.grammar = tracery.createGrammar(coffeeGrammar)
		this.grammar.addModifiers(baseEngModifiers)
		console.log("A type of coffee:", this.grammar.flatten("#coffeeType#"))
	}

	respondTo(s) {
		console.log("User said", s)
		// return "<img src='https://media.tenor.com/images/eff22afc2220e9df92a7aa2f53948f9f/tenor.gif'></img>"

		

		if (s.toLowerCase().includes("drink")) {
			if (this.coffeeAmount  == 0)
				return "No coffee, brew more"
			
			this.coffeeAmount -= 1
			return this.grammar.flatten("The flavor is #flavor#")
		}
		if (s.toLowerCase().includes("you")) {
			return "there is no I in tea"
			
		}



		// Brew new coffee
		if (s.toLowerCase().includes("brew")) {

			// Create new values
			this.coffeeFlavor = this.grammar.flatten("#coffeeName#")
			this.coffeeDescription = this.grammar.flatten("#coffeeDesc#")

			this.post(`Brewing ${this.coffeeFlavor}, ${this.coffeeDescription}`)
					
			let interval = setInterval(() => {
				this.coffeeAmount = Math.min(this.coffeeAmount + 1,  this.maxCoffee)
				if (this.coffeeAmount >= this.maxCoffee) {
					this.post(`coffee is done!  *BING*`)
					clearInterval(interval)
				} else {
					// console.log("post to chat")
					this.post("... ")
				}


				
			}, 200)
			

			return ""

		}

		if (s.includes(418))
			return `I'm a coffee pot`

		// return `'${s}' isn't a type of coffee`
		return `OK....if you want. Brewing ${s} coffee`
	}
}