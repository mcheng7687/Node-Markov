const {MarkovMachine} = require("./markov");

describe("test class Markov Machine", function(){
    
    test("return chains", function () {
        const mm = new MarkovMachine("the cat in the hat is in the hat");

        expect(mm.makeChains()).toEqual({
            "the" : ["cat", "hat", "hat"],
            "cat" : ["in"],
            "in" : ["the", "the"],
            "hat" : ["is", null],
            "is" : ["in"]
        })
    })
})