/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    const chain = {};
    for (let i = 0; i < this.words.length; i++) {
      if (!chain[this.words[i]])
        chain[this.words[i]] = [];

      if (this.words[i + 1])
        chain[this.words[i]].push(this.words[i + 1]);
      else
        chain[this.words[i]].push(null);
    }
    // console.log(chain);
    return chain;
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    const chain = this.makeChains();
    let phrase = this.words[Math.round(Math.random() * (this.words.length - 1))];
    let prevWord = phrase, randomNext;

    for (let i = 0; i < numWords; i++) {
      randomNext = chain[prevWord][Math.round(Math.random() * (chain[prevWord].length - 1))];

      if (randomNext) {
        phrase = phrase.concat(" ", randomNext);
        prevWord = randomNext;
      }
      else
        break;
    }

    return phrase;
  }
}

module.exports = { MarkovMachine };

// let text = "the cat in the hat is in the hat";
// const mm = new MarkovMachine(text);

// console.log(mm.makeText(10));